<template>
  <div class="content">
    <panel-data-spain-covid :mapObject="mapObject" />

    <div class="filter">
      <b-collapse id="collapse-1" class="cardPanelEvent container">
        <b-tabs content-class="mt-3" class="tab">
          <b-tab class="pb-3" title="Filtro">
            <filterMarker :mapObject="mapObject" :featureGroup="featureGroup" />
          </b-tab>
          <b-tab class="pb-3" title="Añadir Evento">
            <addEvent :mapObject="mapObject" />
          </b-tab>
        </b-tabs>
      </b-collapse>
      <b-button v-b-toggle.collapse-1 variant="primary" id="buttomPanelEvent">Panel</b-button>
    </div>
    <div>
      <b-modal id="modal-1" title="Personalizar figura">
        <b-form-input v-model="colorShape" id="colorShape" type="color"></b-form-input>
      </b-modal>
    </div>

    <l-map
      ref="map"
      id="map"
      :zoom="zoom"
      :center="center"
      :minZoom="minZoom"
      :options="{
        zoomControl: true,
        doubleClickZoom: false,
        drawControl: false,
        geojson: {},
      }"
    >
      <l-control-layers position="topright"></l-control-layers>

      <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        layer-type="base"
      />
      <l-marker
        v-for="(marker, index) in this.$store.getters.getMarkerFilter"
        :key="index"
        :lat-lng="addMarker(marker.lat, marker.lon)"
        :icon="generateIcon(marker.risk, marker.icon)"
        v-on:click="infoEvent(marker)"
      ></l-marker>
    </l-map>
    <div v-if="isShow">
      <eventMarker
        :eventPanel="eventPanel"
        @updateShowChild="updateShow"
        @updateEventsChild="updateEvents"
      />
    </div>
  </div>
</template>

<script>
import filterMarker from "../components/Filter.vue";
import addEvent from "../components/AddEvent.vue";
import panelDataSpainCovid from "../components/SpainCovid.vue";
import eventMarker from "../components/Marker.vue";

export default {
  components: {
    filterMarker,
    addEvent,
    panelDataSpainCovid,
    eventMarker
  },
  name: "mapa",
  data() {
    return {
      zoom: 10,
      center: L.latLng(28.291565, -16.629129),
      repetition: false,
      minZoom: 3,
      isShow: false,
      intervalo: null,
      tileProviders: [
        {
          name: "OpenStreetMap",
          visible: true,
          attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        },
        {
          name: "OpenTopoMap",
          visible: false,
          url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
          attribution:
            'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }
      ],
      isActive: true,
      error: null,
      eventPanel: {},
      collection: null,
      colorShape: "#000000",
      mapObject: null,
      drawControl: null,
      featureGroup: null
    };
  },
  methods: {
    addMarker(lat, lng) {
      return L.latLng(lat, lng);
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
    draggable() {
      if (document.getElementById("infoEvent") == null) {
      } else {
        window.onload = addListeners();

        function addListeners() {
          document
            .getElementById("infoEvent")
            .addEventListener("mousedown", mouseDown, false);
          window.addEventListener("mouseup", mouseUp, false);
        }

        function mouseUp() {
          window.removeEventListener("mousemove", divMove, true);
        }

        function mouseDown(e) {
          window.addEventListener("mousemove", divMove, true);
        }

        function divMove(e) {
          let div = document.getElementById("infoEvent");
          div.style.position = "absolute";
          div.style.top = e.clientY + "px";
          div.style.left = e.clientX + "px";
        }
      }
    },
    generateIcon(riesgo, icon) {
      let backgroundColor = "";
      switch (riesgo) {
        case "Alto":
          backgroundColor = "markerRed";

          break;
        case "Medio":
          backgroundColor = "markerYellow";

          break;
        case "Bajo":
          backgroundColor = "markerGreen";

          break;
        case "Info":
          backgroundColor = "markerBlue";

          break;
      }
      return L.divIcon({
        className: "customDivIcon",
        html: `<div class="${backgroundColor}"><i class='centerIcon fa fa-${icon} awesome'></div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });
    },
    infoEvent(dataPanel) {
      this.eventPanel = dataPanel;
      this.eventPanel.edit = false;
      this.isShow = true;
      console.log(dataPanel);
    },
    updateShow(dataUpdated) {
      this.isShow = dataUpdated;
    },
    updateEvents() {
      this.showEvents();
    },
    async getShapes(featureGroup) {
      await this.axios
        .get("/showshapes")
        .then(res => {
          let mylayer;
          this.collection = res.data.shapes;
          for (let i = 0; i < this.collection.length; i++) {
            if (this.collection[i].shape.options.radius) {
              mylayer = L.geoJSON(this.collection[i].shape, {
                pointToLayer: (feature, latlng) => {
                  feature.options.idShape = this.collection[i].idShape;
                  return new L.Circle(latlng, feature.options);
                },
                onEachFeature: (feature, layer) => {
                  layer.options.color = feature.options.color;
                  layer.options.radius = feature.options.radius;
                  this.featureGroup.addLayer(layer);
                }
              });
            } else {
              mylayer = L.geoJSON(this.collection[i].shape, {
                onEachFeature: (feature, layer) => {
                  layer.options.color = feature.options.color;
                  this.featureGroup.addLayer(layer);
                },
                idShape: this.collection[i].idShape
              });
            }

            function pointToLayer(feature, latlng) {
              return new L.Circle(latlng, feature.options);
            }
            // Take advantage of the onEachFeature callback to initialize drawnItems
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    async controlToolbarShapes() {
      this.featureGroup = L.featureGroup().addTo(this.mapObject);
      await this.getShapes(this.featureGroup);

      //-------- CREANDO TOOLBAR ---------------//

      this.drawControl = new L.Control.Draw({
        draw: {
          marker: false,
          circlemarker: false,
          circle: true
        },
        edit: {
          featureGroup: this.featureGroup
        }
      }).addTo(this.mapObject);

      this.mapObject.on("draw:drawstart", e => {
        this.$bvModal.show("modal-1");
      });

      //-------- CONFIGURANDO FUNCIONALIDADES DEL TOOLBAR ---------------//

      this.mapObject.on(window.L.Draw.Event.CREATED, e => {
        let json = e.layer.toGeoJSON();

        e.layer.options.color = this.colorShape;
        json.options = e.layer.options;

        this.axios
          .post("/signupshape", json)
          .then(async res => {
            let parent = this;
            parent.featureGroup.eachLayer(function(layer) {
              parent.featureGroup.removeLayer(layer);
            });
            await this.getShapes(this.featureGroup);
          })
          .catch(e => {
            console.log(e);
          });
      });

      this.mapObject.on("draw:edited", e => {
        let layers = e.layers;
        let parent = this;

        this.featureGroup.eachLayer(function(layer) {
          let idShape = layer.options.idShape;

          layer.feature.options.radius = layer._mRadius;
          let shape = layer.toGeoJSON();

          parent.axios
            .post("/editshapes", { idShape: idShape, shape: shape })
            .then(async res => {})
            .catch(e => {
              console.log(e);
            });
        });
      });

      this.mapObject.on("draw:deleted", e => {
        let layers = e.layers;
        let parent = this;

        layers.eachLayer(function(layer) {
          console.log(layer);
          let idShape = layer.options.idShape;
          parent.axios
            .delete("/deleteshapes", {
              data: {
                idShape: idShape
              }
            })
            .then(res => {})
            .catch(err => {
              console.log(err);
            });
        });
      });
    }
  },
  async mounted() {
    this.$store.commit("islogIn");
    this.mapObject = this.$refs.map.mapObject;
    await this.controlToolbarShapes();
    await this.showEvents();

    this.intervalo = setInterval(async () => {
      await this.showEvents();
    }, 180000);
  },
  beforeDestroy() {
    clearInterval(this.intervalo);
  },

  computed: {}
};
</script>

<style>
.content {
  position: absolute;
  width: 100%;
  height: 94%;

  /* margin: 0;
  padding: 0; */
}

.filter {
  position: absolute;
  display: grid;
  width: 100vh;
  bottom: 0;
  left: 0;
}

.tab {
  display: flex;
  flex-direction: column;
}

/* Estilos del botón y card con respecto al filtro y añadir evento */
#buttomPanelEvent {
  position: relative;
  display: grid;
  width: 12%;
  margin: 0 0 4% 4%;
  z-index: 500;
}

.cardPanelEvent {
  position: relative;
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: 1fr;
  background: white;
  bottom: 0;
  z-index: 500;
  width: 50%;
  margin: 0 0 2% 4%;
  border-radius: 5px;
}

.cardPanelEvent > strong,
.cardPanelEvent > div > h3 {
  align-self: end;
}

.markerRed {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: red;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -15px 0 0 -15px;
}
.markerGreen {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: green;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -15px 0 0 -15px;
}
.markerYellow {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: yellow;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -15px 0 0 -15px;
}

.markerBlue {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: blue;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -15px 0 0 -15px;
}

.centerIcon {
  background-color: white;
  padding: 3px;
  border-radius: 50%;
  transform: rotate(45deg);
  position: absolute;
  bottom: -8px;
}

.customDivIcon i {
  position: absolute;
  width: 22px;
  font-size: 22px;
  left: 0;
  right: 0;
  margin: 10px auto;
  text-align: center;
}

.customDivIcon i.awesome {
  margin: 12px auto;
  font-size: 17px;
}
</style>
