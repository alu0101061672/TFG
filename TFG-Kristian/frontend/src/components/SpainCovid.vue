<template>
  <div v-if="dataReadyMounted">
    <div v-if="isShowCovid">
      <b-card title="España (Covid-19)" class="dimensionsCardCovid">
        <hr />
        <b>Actualizado: {{ this.data[0].Hora }} del {{ this.data[0].Fecha }}</b>
        <hr />
        <b-card-text class="d-flex flex-column justify-content-around">
          <span>
            <b>Casos:</b>
            {{ this.data[0].Casos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
          </span>
          <span>
            <b>Fallecidos:</b>
            {{ this.data[0].Defunciones.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
          </span>
          <span>
            <b>Recuperados:</b>
            {{ this.data[0].Recuperados.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
          </span>
        </b-card-text>
        <hr />
        <div class="d-flex justify-content-around">
          <b-button @click="hideInfoDataCovidCCAA()" variant="secondary">
            <span v-if="showInfoCCAA">Esconder CCAA</span>
            <span v-else>Mostrar CCAA</span>
          </b-button>
          <b-button @click="hideInfoEvent()" variant="info">
            <font-awesome-icon icon="eye-slash" />
          </b-button>
        </div>
      </b-card>
    </div>
    <div v-else class="buttonShowCardCodiv">
      <b-button @click="showInfoEvent()" variant="alert">
        <font-awesome-icon icon="eye" />
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "panelSpainDataCovid",
  props: ["mapObject"],
  data() {
    return {
      data: null,
      ccaa: null,
      record: null,
      isShowCovid: true,
      dataReadyMounted: false,
      showInfoCCAA: true,
      layerGroup: L.layerGroup(),
      arrayLayerGroup: null
    };
  },
  methods: {
    async getCoronavirusData() {
      let dataObject;

      // ------------------------------- Ministerio de Sanidad ------------------------------------------

      dataObject = await this.axios("/datacovid");

      this.data = dataObject.data.response.globalTotalData;
      this.ccaa = dataObject.data.response.ccaa;
      this.record = dataObject.data.response.record;

      // ------------------------------- Ministerio de Sanidad ------------------------------------------
    },
    hideInfoEvent() {
      this.isShowCovid = false;
    },
    showInfoEvent() {
      this.isShowCovid = true;
    },
    hideInfoDataCovidCCAA() {
      let parent = this;
      if (this.layerGroup.getLayers().length == 0) {
        this.showInfoCCAA = true;
        this.arrayLayerGroup.forEach(element => {
          parent.layerGroup.addLayer(element);
        });
      } else {
        this.arrayLayerGroup = this.layerGroup.getLayers();
        this.showInfoCCAA = false;
        this.layerGroup.eachLayer(function(layer) {
          parent.layerGroup.removeLayer(layer);
        });
      }
    }
  },
  computed: {},
  async mounted() {
    await this.getCoronavirusData();
    this.dataReadyMounted = true;

    let coordinatesCCAA = [
      { ccaa: "Andalucía", coordinates: [37.5442706, -4.7277528] },
      { ccaa: "Aragón", coordinates: [41.5976275, -0.9056623] },
      { ccaa: "Asturias", coordinates: [43.363129, -5.951843] },
      { ccaa: "Baleares", coordinates: [39.710358, 2.995148] },
      { ccaa: "Canarias", coordinates: [28.291565, -16.629129] },
      { ccaa: "Cantabria", coordinates: [43.462776, -3.805] },
      { ccaa: "Castilla La Mancha", coordinates: [38.988266, -1.861976] },
      { ccaa: "Castilla y León", coordinates: [41.652779, -4.723611] },
      { ccaa: "Cataluña", coordinates: [41.390205, 2.154007] },
      { ccaa: "Ceuta", coordinates: [35.88933, -5.31979] },
      { ccaa: "Valencia", coordinates: [39.46975, -0.37739] },
      { ccaa: "Extremadura", coordinates: [38.919144, -6.340805] },
      { ccaa: "Galicia", coordinates: [43.362343, -8.41154] },
      { ccaa: "Madrid", coordinates: [40.416775, -3.70379] },
      { ccaa: "Melilla", coordinates: [35.292522, -2.936471] },
      { ccaa: "Murcia", coordinates: [37.98704, -1.13004] },
      { ccaa: "Navarra", coordinates: [42.8233, -1.65138] },
      { ccaa: "País Vasco", coordinates: [43.318334, -1.981231] },
      { ccaa: "La Rioja", coordinates: [42.465, -2.445556] }
    ];

    this.record.forEach((element, index) => {
      element.fallecidos = this.record[index].Fallecidos;
      element.casos = this.record[index].CASOS;
      element.recuperados = this.record[index]["Recuperados\r"];
      element.UCI = this.record[index].UCI;

      if (element.casos >= 30000) {
        let circle = L.circle(coordinatesCCAA[index].coordinates, {
          radius: 50000,
          color: "#FF0000",
          fillcolor: "#FF0000"
        }).bindPopup(
          "<b>Comunidad: </b>" +
            coordinatesCCAA[index].ccaa +
            " <br> <b>Casos: </b> " +
            element.casos +
            "<br><b>Fallecidos: </b>" +
            element.fallecidos +
            " <br> <b>Recuperados: </b> " +
            element.recuperados +
            " <br> <b>UCI: </b> " +
            element.UCI
        );
        this.layerGroup.addLayer(circle);
      } else if (element.casos > 10000 && element.casos < 30000) {
        let circle = L.circle(coordinatesCCAA[index].coordinates, {
          radius: 20000,
          color: "#ff8000 ",
          fillcolor: "#ff8000 "
        }).bindPopup(
          "<b>Comunidad: </b>" +
            coordinatesCCAA[index].ccaa +
            " <br> <b>Casos: </b> " +
            element.casos +
            "<br><b>Fallecidos: </b>" +
            element.fallecidos +
            " <br> <b>Recuperados: </b> " +
            element.recuperados +
            " <br> <b>UCI: </b> " +
            element.UCI
        );
        this.layerGroup.addLayer(circle);
      } else if (element.casos < 10000) {
        let circle = L.circle(coordinatesCCAA[index].coordinates, {
          radius: 10000,
          color: "#119535",
          fillcolor: "#119535"
        }).bindPopup(
          "<b>Comunidad: </b>" +
            coordinatesCCAA[index].ccaa +
            " <br> <b>Casos: </b> " +
            element.casos +
            "<br><b>Fallecidos: </b>" +
            element.fallecidos +
            " <br> <b>Recuperados: </b> " +
            element.recuperados +
            " <br> <b>UCI: </b> " +
            element.UCI
        );
        this.layerGroup.addLayer(circle);
      }
    });

    this.layerGroup.addTo(this.mapObject);
  }
};
</script>

<style scoped>
.dimensionsCardCovid {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 500;
  width: 20%;
  margin: 0 1% 2% 4%;
  border-radius: 5px;
}

.buttonShowCardCodiv {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 500;
  margin: 0 1% 2% 4%;
}
</style>
