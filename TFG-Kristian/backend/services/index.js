import jwt from "jwt-simple";
import moment from "moment";
import config from "../config";
import axios from "axios";

function createToken(user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);
      resolve({
        payload: payload.sub,
        message: "Login correcto",
        status: 200,
        auth: true,
      });
    } catch (err) {
      let status = 403; //El status por defecto es 403 (Forbidden) pero cambia a 401 (Unauthorized) si el token ha expirado
      if (err.message == "Token expired") {
        status = 401;
        err.message = "El token ha expirado";
      }
      reject({
        status: status,
        message: err.message,
        auth: false,
      });
    }
  });
  return decoded;
}

function csvToArray(data) {
  const onlyData = data.split("NOTA")[0];
  const arrayDatos = onlyData.split("\n").filter((dato) => dato.length !== 0);
  const keys = arrayDatos.shift().split(",");
  const comunidades = arrayDatos
    .splice(0)
    .map((comunidad) => comunidad.split(","));
  const result = comunidades.map((data) => {
    const object = {};
    keys.forEach((key, index) => (object[key] = data[index]));
    return object;
  });
  return result;
}

async function callApiDataCovid() {
  let objectResponse = {
    globalTotalData: "",
    ccaa: "",
    record: "",
  };

  let dataPromise1 = new Promise((resolve, reject) => {
    setTimeout(
      resolve,
      100,
      axios.get("https://covid19.isciii.es/resources/data.csv"),
      {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      }
    );
  });

  let dataPromise2 = new Promise((resolve, reject) => {
    setTimeout(
      resolve,
      100,
      axios.get(
        "https://covid19.isciii.es/resources/serie_historica_acumulados.csv",
        {
          headers: {
            "Content-Type": "application/octet-stream",
          },
        }
      )
    );
  });

  let dataPromise3 = new Promise((resolve, reject) => {
    setTimeout(
      resolve,
      100,
      axios.get("https://covid19.isciii.es/resources/ccaa.csv", {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      })
    );
  });

  await Promise.all([dataPromise1, dataPromise2, dataPromise3])
    .then((values) => {
      objectResponse.globalTotalData = csvToArray(values[0].data);
      objectResponse.record = csvToArray(values[1].data);
      objectResponse.ccaa = csvToArray(values[2].data);
    })
    .catch((err) => {
      console.log(err);
    });

  const NUM_CCAA = 19;

  objectResponse.record = objectResponse.record.slice(
    Math.max(objectResponse.record.length - NUM_CCAA, 1)
  );

  objectResponse.record = objectResponse.record.slice();

  return objectResponse;
}

module.exports = { createToken, decodeToken, callApiDataCovid };
