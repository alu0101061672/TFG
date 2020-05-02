<template>
  <div id="pestana-add">
    <b-form>
      <div class>
        <label for="labelEvento">
          <strong>Tipo de Evento:</strong>
        </label>
        <b-form-select
          v-model="$v.dataForm.type_event.$model"
          id="selectTipoEvento"
          :options="events"
          :state="validateState('type_event')"
          type="text"
          required
          @change="iconArrayFromVuex"
        ></b-form-select>
        <b-form-invalid-feedback id="selectTipoEventoError">Introduzca el tipo de evento</b-form-invalid-feedback>
        <div class="mt-3" v-show="dataForm.type_event !== null">
          <label for="labelIcono">
            <strong>Icono:</strong>
          </label>
          <div>
            <ul style=" display: flex; flex-direction: row; justify-content: space-around;">
              <li
                v-for="(icon, index) in dataForm.arrayIcons.Icon"
                :key="index"
                style="list-style:none;"
              >
                <div>
                  <input
                    type="radio"
                    id="inputIcono"
                    name="gender"
                    :value="icon"
                    required
                    v-model="$v.dataForm.icon.$model"
                    plain
                  /> &nbsp;
                  <font-awesome-icon :icon="icon" />
                </div>
              </li>
            </ul>
          </div>
          <b-form-invalid-feedback id="inputIconoError">Seleccione un icono</b-form-invalid-feedback>
        </div>
      </div>
      <div class="mt-3">
        <div class="d-flex justify-content-start">
          <label for="labelRiesgo">
            <strong>Riesgo:</strong>
          </label>
          <div :class="colorDotv2"></div>
        </div>
        <b-form-select
          v-model="$v.dataForm.risk.$model"
          id="selectRiesgo"
          :options="risks"
          required
          :state="validateState('risk')"
          placeholder="Breve descripción..."
          type="text"
        ></b-form-select>
        <b-form-invalid-feedback id="selectRiesgoError">Seleccione un riesgo</b-form-invalid-feedback>
      </div>
      <div class="latlong mt-3">
        <div class="text-left">
          <label for="labelLat">
            <strong>Lat:</strong>
          </label>
          <b-form-input
            class="w-75"
            placeholder="Latitud"
            readonly
            v-model="$v.dataForm.lat.$model"
            id="inputLat"
            required
            :state="validateState('lat')"
            type="text"
          ></b-form-input>
          <b-form-invalid-feedback id="inputLatError">Seleccione Lat</b-form-invalid-feedback>
        </div>
        <div class>
          <label for="labelLong">
            <strong>Lon:</strong>
          </label>
          <b-form-input
            placeholder="Longitud"
            class="w-75"
            readonly
            v-model="$v.dataForm.lon.$model"
            required
            id="inputLong"
            :state="validateState('lon')"
            type="text"
          ></b-form-input>
          <b-form-invalid-feedback id="inputLongError">Seleccione Lon</b-form-invalid-feedback>
        </div>
        <div class="d-flex align-items-end">
          <b-button id="coords" @click="searchCoordinates">Buscar</b-button>
        </div>
      </div>
      <div class="mt-3">
        <label for="LabelDescription">
          <strong>Descripción del evento:</strong>
        </label>
        <b-form-textarea
          v-model="$v.dataForm.description.$model"
          id="inputDescription"
          :state="validateState('description')"
          placeholder="Breve descripción..."
          required
          type="text"
        ></b-form-textarea>
        <b-form-invalid-feedback id="inputDescriptionError">
          Introduzca una breve descripción de al menos 20
          carácteres
        </b-form-invalid-feedback>
      </div>
      <div class="mt-3">
        <b-button block variant="success" @click="addEventMongo">Añadir</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "AñadirFiltro",
  mixins: [validationMixin],
  props: ["mapObject"],
  data() {
    return {
      risks: this.$store.getters.getRisks,
      events: this.$store.getters.getEvents,
      dataForm: {
        arrayIcons: {},
        type_event: null,
        icon: null,
        description: null,
        risk: null,
        lat: null,
        lon: null
      }
    };
  },
  validations: {
    dataForm: {
      type_event: {
        required
      },
      risk: {
        required
      },
      icon: {
        required
      },
      description: {
        required,
        minLength: minLength(20)
      },
      lat: {
        required
      },
      lon: {
        required
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.dataForm[name];
      return $dirty ? !$error : null;
    },
    iconArrayFromVuex() {
      this.dataForm.arrayIcons = this.events.find(
        element => element.value === this.dataForm.type_event
      );
    },
    searchCoordinates() {
      document.getElementById("map").style.cursor = "crosshair";
      let total = this;
      let map = this.mapObject;
      map.on("click", function(e) {
        let coordinates = e.latlng;
        total.dataForm.lat = e.latlng.lat;
        total.dataForm.lon = e.latlng.lng;
        map.off("click");
        document.getElementById("map").style.cursor = "default";
      });
    },
    async showEvents() {
      await this.axios
        .get("/showevent")
        .then(res => {
          //this.$refs.map.mapObject
          this.$store.commit("setMarker", res.data.event);
          this.$store.commit("setMarkerFilter", this.$store.getters.getMarker);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async addEventMongo() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        await this.axios
          .post("/signupevent", this.dataForm)
          .then(res => {
            this.showEvents();
            console.log(res.data);
          })
          .catch(e => {
            console.log(e.response);
          });
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    }
  },
  computed: {
    colorDotv2: function() {
      return {
        dotRed: this.dataForm.risk === "Alto",
        dotYellow: this.dataForm.risk === "Medio",
        dotGreen: this.dataForm.risk === "Bajo",
        dotBlue: this.dataForm.risk === "Info"
      };
    }
  }
};
</script>

<style scoped>
.latlong {
  display: flex;
  justify-content: space-between;
}

.dotRed {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  margin-left: 25px;
  background-color: red;
}

.dotYellow {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  margin-left: 25px;
  background-color: yellow;
}

.dotGreen {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  margin-left: 25px;
  background-color: green;
}

.dotBlue {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  margin-left: 25px;
  background-color: blue;
}
</style>
