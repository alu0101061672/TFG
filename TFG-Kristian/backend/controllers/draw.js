import Draw from "../models/draw";

function signUpShape(req, res) {
  const shape = new Draw({
    shape: req.body
  });

  shape.save(err => {
    if (err)
      return res.status(500).send({
        message: `Error al crear la figura: ${err}`
      });
    return res.status(201).send({
      message: `¡Se ha introducido un figura nueva! `
    });
  });
}

function showShapes(req, res) {
  Draw.find({}).then(shapes => {
    if (!shapes)
      return res.status(404).send({
        message: "Esta figura no está en al BBDD"
      });

    res.status(200).send({
      message: "Mostrando figura",
      shapes: shapes
    });
  });
}

function editShapes(req, res) {
  Draw.findOneAndUpdate(
    { idShape: req.body.idShape },
    { shape: req.body.shape }
  ).then((shape, err) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la petición ${err}`
      });

    return res.status(200).send({
      message: "Enviando datos...",
      shape: shape
    });
  });
}

function deleteShapes(req, res) {
  console.log(req.body);
  Draw.findOneAndDelete({ idShape: req.body.idShape }).then((shape, err) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la petición ${err}`
      });

    return res.status(200).send({
      message: `Se ha eliminado el evento con éxito`,
      id: shape
    });
  });
}

module.exports = {
  signUpShape,
  showShapes,
  editShapes,
  deleteShapes
};
