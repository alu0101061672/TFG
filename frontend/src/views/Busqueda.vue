<template>
  <div class="busqueda">

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

        <div class="d-flex-row bd-highlight border border-dark mt-2" style="width: 1100px; height:627px;">

          <div class="d-flex flex-row mt-5 justify-content-center">
            <form id="custom-search-form" class="form-search form-horizontal pull-right" >
                <div class="input-append">
                    <input type="text" class="search-query pl-2 border border-dark mt-3" placeholder="Busque cualquier aportación o información del INR..." 
                      style="border-radius: 15px; width: 500px; height: 35px;">
                    <button type="submit" class="btn"><img src="../assets/busqueda.svg" alt="búsqueda" style="margin-left: -63px;"></button>
                </div>
            </form>
          </div>

          <div class="d-flex flex-row mt-4 justify-content-center" style="margin-right:100px;">

            <FiltrosBusqueda />

          </div>

          <div class="d-flex flex-row mt-4 justify-content-center">

           <button type="button" class="bg-light d-inline-flex bd-highlight border border-dark align-items-center" style="width: 70%; height: 50px;">

             <div class="p-2"> Nombre de la aportación </div>

           </button>

          </div>
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
import FiltrosBusqueda from '@/components/FiltrosBusqueda.vue'


export default {
  name: 'Busqueda',
  components: {
    Cabecera,
    Navegacion,
    DatosINR,
    FiltrosBusqueda

  }
}
</script>