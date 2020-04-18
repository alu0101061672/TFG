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
        console.log("AFSFA" + newUsuario);
        state.usuario = newUsuario;
    },
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
},
actions: {},
modules: {},

});
