<template>
  <div class="mapa">

    <Cabecera />

    <div class="d-inline-flex">
      <Navegacion /> 
    </div>

    <button v-on:click="goTFGKristian()" type="button" class="d-inline-flex bg-highlight border border-dark" style="width: 1600px; height:627px;"> 
    
      <p style="text-align: center; width: 1600px; height:627px; line-height: 627px; font-size: 25px;">Ir al mapa</p>

    </button>

  </div>
</template>

<script>
// @ is an alias to /src
import Cabecera from '@/components/Cabecera.vue'
import Navegacion from '@/components/Navegacion.vue'
import DatosINR from '@/components/DatosINR.vue'

export default {
  name: 'Mapa',
  components: {
    Cabecera,
    Navegacion,
    DatosINR
  },
  methods: {

    async goTFGKristian() {
      
      window.location.href = "http://localhost:8081/map";

    },
  }
}
</script>