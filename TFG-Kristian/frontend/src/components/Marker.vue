<template>
  <b-card tag="article" class="mb-2 panelEventMarker" id="infoEvent">
    <div v-if="edit">
      <b-form-select
        v-model="eventPanel.type_event"
        :options="events"
        @change="iconArrayFromVuex(eventPanel)"
        type="text"
      />
      <div>
        <ul class="d-flex justify-content-around align-content-center my-4">
          <li v-for="(icon, index) in arrayIcons" :key="index" style="list-style:none;">
            <div>
              <input
                type="radio"
                id="inputIcono"
                name="gender"
                :value="icon"
                v-model="eventPanel.icon"
                plain
              /> &nbsp;
              <font-awesome-icon :icon="icon" />
            </div>
          </li>
        </ul>
      </div>
    </div>

    <h2 v-else>{{ eventPanel.type_event }}</h2>

    <hr />
    <b-card-text>
      <input v-if="edit" v-model="eventPanel.description" type="text" />
      <span v-else>{{ eventPanel.description }}</span>

      <div v-if="edit" class="d-flex justify-content-around m-3">
        <div class="m-1" :class="colorDot"></div>
        <div>
          <b-form-select v-model="eventPanel.risk" :options="risks" type="text"></b-form-select>
        </div>
      </div>

      <div v-else class="d-flex flex-direction-row justify-content-start m-2">
        <div :class="colorDot"></div>
        <div class="py-1">
          <b>{{ eventPanel.risk }}</b>
        </div>
      </div>
      <div v-if="edit" class="d-flex flex-row justify-content-around">
        <b-button variant="success" @click="updateEventMongoose()">
          <font-awesome-icon icon="check" />
        </b-button>
        <b-button variant="danger" @click="editMode()">
          <font-awesome-icon icon="times" />
        </b-button>
      </div>
    </b-card-text>
    <div v-if="!edit" class="d-flex flex-row justify-content-around m-2">
      <b-button @click="hideInfoEvent()" variant="info">
        <font-awesome-icon icon="eye-slash" />
      </b-button>
      <b-button @click="editMode()" variant="dark">
        <font-awesome-icon icon="edit" />
      </b-button>
      <b-button @click="deleteMarker(eventPanel.idEvent); " variant="danger">
        <font-awesome-icon size="lg" icon="trash-alt" />
      </b-button>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "panelSpainDataCovid",
  props: ["eventPanel"],
  data() {
    return {
      render: null,
      edit: false,
      events: this.$store.getters.getEvents,
      risks: this.$store.getters.getRisks,
      arrayIcons: null,
      message: ""
    };
  },
  methods: {
    hideInfoEvent() {
      this.render = false;
      this.$emit("updateShowChild", this.render);
    },

    deleteMarker(marker, append = false, toaster) {
      let result = confirm("¿Seguro que quieres finalizar el evento?");
      if (result) {
        this.axios
          .delete("/deleteinfo", {
            data: {
              idEvent: marker
            }
          })
          .then(res => {
            this.render = false;
            this.$emit("updateShowChild", this.render);
            this.$emit("updateEventsChild");
            this.message = res.data.message;

            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    editMode() {
      if (this.edit == true) this.edit = false;
      else this.edit = true;
    },
    async updateEventMongoose() {
      this.editMode();

      await this.axios
        .post("/editevent", this.eventPanel)
        .then(res => {
          this.$emit("updateEventsChild");
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    iconArrayFromVuex(event) {
      this.events.find(element => {
        if (element.value === event.type_event) this.arrayIcons = element.Icon;
      });
    }
  },
  computed: {
    colorDot: function() {
      return {
        dotRed: this.eventPanel.risk === "Alto",
        dotYellow: this.eventPanel.risk === "Medio",
        dotGreen: this.eventPanel.risk === "Bajo",
        dotBlue: this.eventPanel.risk === "Info"
      };
    }
  },
  mounted() {}
};
</script>

<style scoped>
/* Estilos de b-card con la información de los markers*/
.panelEventMarker {
  position: absolute;
  z-index: 450;
  top: 0;
  right: 0;
  max-width: 20rem;
  padding: 10px;
  margin: 10px;
}

.dotRed {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  right: 10px;
  top: 5px;
  background-color: red;
}

.dotYellow {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  right: 10px;
  top: 5px;
  background-color: yellow;
}

.dotGreen {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  right: 10px;
  top: 5px;
  background-color: green;
}

.dotBlue {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  right: 10px;
  top: 5px;
  background-color: blue;
}
</style>
