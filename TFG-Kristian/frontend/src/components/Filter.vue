<template>
  <div>
    <div>
      <h3 class="mt-2 text-center">Filtro</h3>
      <hr />
    </div>
    <div class="text-left">
      <div class="my-4">
        <strong>Por Riesgo:</strong>
      </div>
      <b-form-select v-model="riskInd" :options="risks"></b-form-select>
    </div>
    <div class="text-left">
      <div class="my-4">
        <strong class>Por evento:</strong>
      </div>
      <b-form-select v-model="eventInd" :options="events"></b-form-select>
    </div>
    <div class="text-left">
      <div class="my-4">
        <strong class>Por Localización:</strong>
      </div>
      <div id="buttonLocalication">
        <b-button class variant="info" @click="drawWithoutLibrary">Establecer radio</b-button>
      </div>
    </div>

    <div id="buttonsFilter" class="my-4">
      <b-button class variant="success" @click="filter">Filtrar</b-button>
      <b-button class variant="danger" @click="resetFilter">
        <font-awesome-icon size="lg" icon="eraser" fixed-width />
      </b-button>
    </div>
    <b-modal id="modal-2" title="Personalizar figura">
      <b-form-input v-model="options.color" id="color" type="color"></b-form-input>
      <b-form-input v-model="options.radius" id="radius" type="range" min="0" max="5000"></b-form-input>
      {{this.options.radius}}
      <b-form-input v-model="options.fillColor" id="fillcolor" type="color"></b-form-input>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "filtro",
  props: ["mapObject", "featureGroup"],
  data() {
    return {
      risks: this.$store.getters.getRisks,
      events: this.$store.getters.getEvents,
      eventInd: null,
      riskInd: null,
      circle: null,
      options: {
        color: "",
        fillColor: "",
        fillOpacity: 0.5,
        radius: 0
      }
    };
  },
  methods: {
    filter() {
      this.$store.commit(
        "setMarkerFilter",
        this.$store.getters.getMarker.filter(marker => {
          if (this.circle == null) {
            //Filtro sin circulo
            if (this.riskInd === null && this.eventInd === null) {
              return marker;
            } else if (this.riskInd === null || this.eventInd === null) {
              return (
                marker.risk === this.riskInd ||
                marker.type_event === this.eventInd
              );
            } else {
              return (
                marker.risk === this.riskInd &&
                marker.type_event === this.eventInd
              );
            }
          } else {
            //Filtro con circulo
            let d = this.mapObject.distance(
              [marker.lat, marker.lon],
              this.circle.getLatLng()
            );
            if (d <= this.circle.getRadius()) {
              if (this.riskInd === null && this.eventInd === null) {
                return marker;
              } else if (this.riskInd === null || this.eventInd === null) {
                return (
                  marker.risk === this.riskInd ||
                  marker.type_event === this.eventInd
                );
              } else {
                return (
                  marker.risk === this.riskInd &&
                  marker.type_event === this.eventInd
                );
              }
            }
          }
        })
      );
    },
    resetFilter() {
      this.$store.commit("setMarkerFilter", this.$store.getters.getMarker);
      this.riskInd = null;
      this.eventInd = null;
      this.mapObject.removeLayer(this.circle);
      this.circle = null;
    },
    drawWithoutLibrary() {
      let parent = this;
      let map = parent.mapObject;
      let featureGroups = parent.featureGroup;

      parent.$bvModal.show("modal-2");

      map.on("click", function(e) {
        if (parent.circle == null) {
          parent.circle = L.circle(
            [e.latlng.lat, e.latlng.lng],
            parent.options
          ).addTo(map);

          parent.$store.commit(
            "setMarkerFilter",
            parent.$store.getters.getMarker.filter(marker => {
              let d = map.distance(
                [marker.lat, marker.lon],
                parent.circle.getLatLng()
              );
              if (
                d < parent.circle.getRadius() &&
                (parent.riskInd === null || parent.eventInd === null)
              ) {
                return marker;
              } else {
                return (
                  marker.risk === parent.riskInd &&
                  marker.type_event === parent.eventInd
                );
              }
            })
          );
        } else {
          parent.mapObject.removeLayer(parent.circle);
          parent.circle = L.circle(
            [e.latlng.lat, e.latlng.lng],
            parent.options
          ).addTo(map);

          parent.$store.commit(
            "setMarkerFilter",
            parent.$store.getters.getMarker.filter(marker => {
              let d = map.distance(
                [marker.lat, marker.lon],
                parent.circle.getLatLng()
              );
              if (
                d < parent.circle.getRadius() &&
                (parent.riskInd === null || parent.eventInd === null)
              ) {
                return marker;
              } else {
                return (
                  marker.risk === parent.riskInd &&
                  marker.type_event === parent.eventInd
                );
              }
            })
          );
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#buttonsFilter {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#buttonLocalication {
  display: flex;
}
</style>
