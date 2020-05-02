import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    session: false,
    token: "",
    email: "",
    marker: [],
    markerFilter: [],
    mapObject: null,
    risks: [
      { value: null, text: "Escoja riesgo" },
      { value: "Alto", text: "Alto" },
      { value: "Medio", text: "Medio" },
      { value: "Bajo", text: "Bajo" },
      { value: "Info", text: "Info" },
    ],
    events: [
      { value: null, text: "Escoja un evento" },
      {
        value: "Peaton",
        text: "Peaton",
        Icon: ["street-view"],
      },
      {
        value: "Vehiculo",
        text: "Vehículo",
        Icon: ["car", "ship"],
      },
      {
        value: "Materiales",
        text: "Materiales",
        Icon: ["radiation"],
      },
      {
        value: "Natural",
        text: "Fenómenos Naturales",
        Icon: ["fire", "tint", "bug"],
      },
    ],
  },
  mutations: {
    islogIn(state) {
      if (localStorage.getItem("Token") == null) state.session = false;
      else state.session = true;
    },
    setToken(state, newToken) {
      state.token = newToken;
      localStorage.setItem("Token", newToken);
    },
    setEmail(state, newEmail) {
      state.email = newEmail;
      localStorage.setItem("Email", newEmail);
    },
    setMarker(state, newMarker) {
      state.marker = newMarker;
    },
    setMarkerFilter(state, newMarkerFilter) {
      state.markerFilter = newMarkerFilter;
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getSession(state) {
      return state.session;
    },
    getEmail(state) {
      return state.email;
    },
    getMarker(state) {
      return state.marker;
    },
    getMarkerFilter(state) {
      return state.markerFilter;
    },
    getEvents(state) {
      return state.events;
    },
    getRisks(state) {
      return state.risks;
    },
  },
  actions: {},
  modules: {},
});
