import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Actividad from '../views/Actividad.vue'
import Busqueda from '../views/Busqueda.vue'
import Sge112 from '../views/SGE112.vue'
import Mapa from '../views/Mapa.vue'
import InicioSesion from '../views/InicioSesion.vue'
import Administrador from '../views/Administrador.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'InicioSesion',
    component: InicioSesion
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/documentos',
    name: 'Documentos',
 
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Documentos.vue')
    }
  },
  {
    path: '/actividad',
    name: 'Actividad',
    component: Actividad
  },
  {
    path: '/busqueda',
    name: 'Busqueda',
    component: Busqueda
  },
  {
    path: '/sge112',
    name: 'Sge112',
    component: Sge112
  },
  {
    path: '/mapa',
    name: 'Mapa',
    component: Mapa
  },
  {
    path: '/administrador',
    name: 'Administrador',
    component: Administrador
  }


]

const router = new VueRouter({
  routes
})

export default router
