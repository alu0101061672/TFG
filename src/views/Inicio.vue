<template>
  <div class="inicio">
      
    <Cabecera/>

    <FiltrosInicio/>

  </div>
</template>

<script>
// @ is an alias to /src
import Cabecera from '@/components/Cabecera.vue'
import FiltrosInicio from '@/components/FiltrosInicio.vue'

export default {
  name: 'Inicio',
  components: {
    Cabecera,
    FiltrosInicio
  }
}
</script>