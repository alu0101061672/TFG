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
        inr: [],
    },
    carpeta: {
        nombre: "",
        file: "",
        inr: [],
    },
    favoritos: [],
    verificado: '',
    
},
mutations: {
    islogIn(state) {
       // state.session_out = false;
        if (localStorage.getItem("Token") == null) state.session_out = true;
        else state.session_out = false;
    },
    isLogOut(state) {
        state.session_out = true;
        state.token = '';
    },
    setToken(state, newToken) {
        state.token = newToken;
        localStorage.setItem("Token", newToken);
       // state.token = newToken;
    },
    setEmail(state, newEmail) {
       // state.email = newEmail;
       state.email = newEmail;
       localStorage.setItem("Email", newEmail);
    },
    setRole(state, newRole) {
        state.role = newRole;
        localStorage.setItem("Rol", newRole);

    },
    setVerificado(state, newVer) {
        state.verificado = newVer;
        localStorage.setItem("Verificado", newVer);

    },
    setUsuario(state, newUsuario) {
        state.usuario = newUsuario;
        localStorage.setItem("Usuario", newUsuario);

    },
    setINR(state, newINR){
        state.inr = newINR;
        localStorage.setItem("INR", JSON.stringify(newINR));
    },
    setAportacion(state,newAportacion){
        state.aportacion = newAportacion;
    },
    setCarpeta(state,newCarpeta){

        state.carpeta = newCarpeta;
    },
    setFavoritos(state,newFav){

        state.favoritos.push(newFav);
    },
    removeFavoritos(state,newFav){

        state.favoritos.pop(newFav);
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
    },
    getCarpeta(state){
        return state.carpeta;
    },
    getFavoritos(state){
        return state.favoritos;
    },
    getVerificado(state){
        return state.verificado;
    }

},
actions: {},
modules: {},

});
