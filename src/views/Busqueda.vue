<template>
  <div class="busqueda">

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
  name: 'Busqueda',
  components: {
    Cabecera,
    Navegacion
  }
}
</script>