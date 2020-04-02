<template>
  <div class="administrador">
      
    <Cabecera/>
    <div class="d-inline-flex">
      <Navegacion /> 
    </div>

    <Admin />

  </div>
</template>

<script>

import Cabecera from '@/components/Cabecera.vue'
import Navegacion from '@/components/Navegacion.vue'
import Admin from '@/components/Admin.vue'

export default {
  name: 'Administrador',
  components: {
    Cabecera,
    Navegacion,
    Admin
  }
}
</script>