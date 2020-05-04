import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Actividad from '../views/Actividad.vue'
import Busqueda from '../views/Busqueda.vue'
import Sge112 from '../views/SGE112.vue'
import Mapa from '../views/Mapa.vue'
import InicioSesion from '../views/InicioSesion.vue'
import Administrador from '../views/Administrador.vue'
import axios from "axios";
import store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'InicioSesion',
    meta: { isAuth: false },
    component: InicioSesion
  },
  {
    path: '/inicio',
    name: 'Inicio',
    meta: { isAuth: true },
    component: Inicio
  },
  {
    path: '/documentos',
    name: 'Documentos',
    meta: { isAuth: true },
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Documentos.vue')
    }
  },
  {
    path: '/actividad',
    name: 'Actividad',
    meta: { isAuth: true },
    component: Actividad
  },
  {
    path: '/busqueda',
    name: 'Busqueda',
    meta: { isAuth: true },
    component: Busqueda
  },
  {
    path: '/sge112',
    name: 'Sge112',
    meta: { isAuth: true },
    component: Sge112
  },
  {
    path: '/mapa',
    name: 'Mapa',
    meta: { isAuth: true },
    component: Mapa
  },
  {
    path: '/administrador',
    name: 'Administrador',
    meta: { isAuth: true },
    component: Administrador
  }


];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.isAuth)) {
    try {
      if (localStorage.getItem("Token") == null) {
        next({
          path: "/inicio",
        });
      } else {
        const res = await axios.get(`http://localhost:4000/user/isAuth`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });

        if (res.data.auth) {
          store.commit("setEmail", localStorage.getItem("Email"));
          next();
        }
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 403) {
        next({
          path: "/inicio",
        });
      }
    }
  } else {
    next();
  }
});

export default router;
