import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSocketIO from "vue-socket.io";
import Vuelidate from "vuelidate";
import AxiosPlugin from "vue-axios-cors";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faShip } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faTint } from "@fortawesome/free-solid-svg-icons";
import { faRadiation } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faStreetView } from "@fortawesome/free-solid-svg-icons";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon } from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import * as LeafletToolbar from "leaflet-toolbar/dist/leaflet.toolbar.js";
import LDraw from "leaflet-draw";
import { LControlLayers } from "vue2-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-toolbar/dist/leaflet.toolbar.css";
import "leaflet-draw/dist/leaflet.draw.css";

library.add(faEnvelope);
library.add(faKey);
library.add(faTimes);
library.add(faCheck);
library.add(faUser);
library.add(faEye);
library.add(faEdit);
library.add(faMapMarked);
library.add(faShip);
library.add(faCar);
library.add(faBug);
library.add(faSignOutAlt);
library.add(faCog);
library.add(faTint);
library.add(faFire);
library.add(faStreetView);
library.add(faRadiation);
library.add(faEyeSlash);
library.add(faTrashAlt);
library.add(faEraser);
library.add(faSearchLocation);
library.add(faPlus);

Vue.use(AxiosPlugin);
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(FontAwesomeIcon);
Vue.use(LeafletToolbar);
Vue.use(Vuelidate);
Vue.use(LDraw);

FontAwesomeIcon.config = {
  autoAddCss: false,
};

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:3000",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.component("l-control-layers", LControlLayers);

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Agregamos la URL base de nuestra API
axios.defaults.baseURL = "http://localhost:3000/api";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
