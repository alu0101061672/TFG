<template>
  <div class="inicio">
      
    <Cabecera/>
    <div class="d-flex justify-content-center mt-3 mb-3 " style="max-width:500px;">
      <div class="d-flex flex-row bd-highlight align-items-center" >
            
          <div class="p-2 bd-highlight font-weight-bold" style="color:black;">
              
              <h3> INR's </h3>
           </div>
       </div>
     
    <!-- <FiltrosInicio class="mt-2" /> -->
    </div>

    <InrInicio />

  </div>
</template>

<script>
// @ is an alias to /src
import Cabecera from '@/components/Cabecera.vue'
import FiltrosInicio from '@/components/FiltrosInicio.vue'
import InrInicio from '@/components/InrInicio.vue'

export default {
  name: 'Inicio',
  components: {
    Cabecera,
    FiltrosInicio,
    InrInicio
  }
}
</script>