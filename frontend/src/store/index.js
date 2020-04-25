import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session_out: true,
    token: '',
    email: '',
    role: '',
    usuario: '',
    inr: {
        nombre: "",
        localizacion: "",
        descripcion: "",
        gravedad: "",
        tipo: "",
        numAfectados: "",
        recursosNecesarios: [],
        tipoTerreno: [], 
        fechaInicio: '',
        fechaFin: '',
    },
    aportacion: {
        titulo: "",
        descripcion: "",
        recursosNecesarios: [],
        date: "",
        createdBy: "",

    },
},
mutations: {
    islogIn(state) {
        state.session_out = false;
    },
    isLogOut(state) {
        state.session_out = true;
        state.token = '';
    },
    setToken(state, newToken) {
        state.token = newToken;
    },
    setEmail(state, newEmail) {
        state.email = newEmail;
    },
    setRole(state, newRole) {
        state.role = newRole;
    },
    setUsuario(state, newUsuario) {
        state.usuario = newUsuario;
    },
    setINR(state, newINR){
        state.inr = newINR;
    },
    setAportacion(state, newAportacion){
        state.aportacion = newAportacion;
    }
},
getters: {
    getToken(state) {
        return state.token;
    },
    getSession(state) {
        return state.session_out;
    },
    getEmail(state) {
        return state.email;
    },
    getRole(state) {
        return state.role;
    },
    getUsuario(state) {
        return state.usuario;
    },
    getINR(state){
        return state.inr;
    },
    getAportacion(state){
        return state.aportacion;
    }
},
actions: {},
modules: {},

});
