import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Actividad from '../views/Actividad.vue'
import Busqueda from '../views/Busqueda.vue'
import Sge112 from '../views/SGE112.vue'
import Capas from '../views/Capas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/documentos',
    name: 'Documentos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
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
    path: '/capas',
    name: 'Capas',
    component: Capas
  }


]

const router = new VueRouter({
  routes
})

export default router
