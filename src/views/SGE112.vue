<template>
  <div class="sge112">

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
  name: 'Sge112',
  components: {
    Cabecera,
    Navegacion
  }
}
</script>