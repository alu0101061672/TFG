<template>
  <div class="inicio">
      
    <Cabecera/>
    <div class="d-inline-flex">
      <Navegacion /> 
      <FiltrosInicio />
    </div>

    <InrInicio />

  </div>
</template>

<script>
// @ is an alias to /src
import Cabecera from '@/components/Cabecera.vue'
import Navegacion from '@/components/Navegacion.vue'
import FiltrosInicio from '@/components/FiltrosInicio.vue'
import InrInicio from '@/components/InrInicio.vue'

export default {
  name: 'Inicio',
  components: {
    Cabecera,
    Navegacion,
    FiltrosInicio,
    InrInicio
  }
}
</script>