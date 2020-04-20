<template>
  <div class="capas">

    <Cabecera />

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
          
          <div class="mt-5 ml-5">
            <div class="d-inline-flex flex-row float-left"> 
                
                <img src="../assets/mapa.png" alt="mapa" class="img-responsive img-fluid" 
                  height="25" width="25"/>
                <div class="text-dark pl-2"> Mapa </div>

            </div>

            <br /> <br />

            <div class="d-inline-flex flex-row float-left"> 
                
                <img src="../assets/satelite.png" alt="satélite" class="img-responsive img-fluid" 
                  height="25" width="25"/>
                <div class="text-dark pl-1"> Satélite </div>

            </div>

            <br /> <br />

            <div class="d-inline-flex flex-row float-left"> 
                
                <img src="../assets/relieve.jpg" alt="relieve" class="img-responsive img-fluid" 
                  height="25" width="25"/>
                <div class="text-dark pl-1 mt-1"> Relieve </div>

            </div>

            <br /> <br /> <br />

            <div class="d-inline-flex flex-row float-left"> 

              <div><u> Capas existentes </u></div>

            </div>

            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />

            <div class="d-inline-flex flex-row float-left"> 

              <svg class="bi bi-box-arrow-in-down" width="25px" height="25px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4.646 8.146a.5.5 0 01.708 0L8 10.793l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M8 1a.5.5 0 01.5.5v9a.5.5 0 01-1 0v-9A.5.5 0 018 1z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M1.5 13.5A1.5 1.5 0 003 15h10a1.5 1.5 0 001.5-1.5v-8A1.5 1.5 0 0013 4h-1.5a.5.5 0 000 1H13a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5v-8A.5.5 0 013 5h1.5a.5.5 0 000-1H3a1.5 1.5 0 00-1.5 1.5v8z" clip-rule="evenodd"/>
              </svg>
              <div class="text-dark pl-1 mt-1"> Importar capa </div>

            </div>

            <br /> <br />

            <div class="d-inline-flex flex-row float-left"> 

              <svg class="bi bi-box-arrow-up" width="25px" height="25px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4.646 4.354a.5.5 0 00.708 0L8 1.707l2.646 2.647a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 000 .708z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M8 11.5a.5.5 0 00.5-.5V2a.5.5 0 00-1 0v9a.5.5 0 00.5.5z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M2.5 14A1.5 1.5 0 004 15.5h8a1.5 1.5 0 001.5-1.5V7A1.5 1.5 0 0012 5.5h-1.5a.5.5 0 000 1H12a.5.5 0 01.5.5v7a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5V7a.5.5 0 01.5-.5h1.5a.5.5 0 000-1H4A1.5 1.5 0 002.5 7v7z" clip-rule="evenodd"/>
              </svg>
              <div class="text-dark pl-1 mt-1"> Exportar capa </div>

            </div>

            <br /> <br />

            <div class="d-inline-flex flex-row float-left"> 

              <div><u> Visualización histórica de las capas </u></div>

            </div>

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

export default {
  name: 'Capas',
  components: {
    Cabecera,
    Navegacion,
    DatosINR
  }
}
</script>