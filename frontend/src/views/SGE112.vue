<template>
  <div class="sge112">

    <Cabecera/>

    <div class="d-inline-flex">
      <Navegacion /> 
    </div>

    <div>
      <div class="d-inline-flex bd-highlight ml-5 mr-5"> 

        <div class="p-2 flex-row bd-highlight">

            <div class="d-inline-flex flex-column bd-highlight border border-dark" style="width: 500px; height:340px;">
              <DatosINR />
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
import DatosINR from '@/components/DatosINR.vue'

export default {
  name: 'Sge112',
  components: {
    Cabecera,
    Navegacion,
    DatosINR
  }
}
</script>