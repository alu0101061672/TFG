<template>
  <div class="actividad">

    <Cabecera/>

    <div class="d-inline-flex">
      <Navegacion /> 
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Cabecera from '@/components/Cabecera.vue'
import Navegacion from '@/components/Navegacion.vue'

export default {
  name: 'Actividad',
  components: {
    Cabecera,
    Navegacion
  }
}
</script>