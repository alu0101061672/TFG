<template>
  <div class="actividad">

    <Cabecera/>

    <div class="d-inline-flex">
      <Navegacion /> 
    </div>

    <div>
      <div class="bg-light d-inline-flex bd-highlight ml-5 mr-5"> 

        <div class="p-2 flex-row bd-highlight">

            <div class="d-inline-flex flex-column bd-highlight border border-dark" style="width: 500px; height:310px;">
            </div>

            <div class="flex-column bd-highlight border border-dark" style="width: 500px; height:310px;">
            </div>

        </div>

        <div class="flex-row bd-highlight border border-dark mt-2" style="width: 1100px; height:627px;">
        </div>

      </div>
    
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