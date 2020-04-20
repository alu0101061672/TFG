<template>
  <div class="actividad">

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

          <div class="d-inline-flex flex-row mt-5 w-100 justify-content-between"> 

            <div class="d-inline-flex ml-5">

              <img src="../assets/añadir.svg" alt="añadir aportación" class="img-responsive img-fluid" 
                height="25" width="25"/>
              <div class="text-dark ml-1">Añadir nueva aportación</div>

            </div>

            <div class="d-inline-flex mr-5">

              <img src="../assets/addInfo.svg" alt="añadir información" class="img-responsive img-fluid float-right"
                height="25" width="25"/>
              <div style="color: #ff2301;"> info </div>

            </div>

          </div>

          <br />

          <div class="d-inline-flex flex-row float-left"> 
            <div class="d-inline-flex" style="margin-left: 50px;">

              <img src="../assets/rectificar.svg" alt="rectificar aportación" class="img-responsive img-fluid" 
                height="25" width="25"/>
              <div class="text-dark ml-1 mt-1">Rectificar una aportación</div>

            </div>
          </div>

          <br /> <br /> <br />

          <div class="d-inline-flex flex-row float-left ml-5"> 

            <div><u> Aportaciones realizadas </u></div>

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
  name: 'Actividad',
  components: {
    Cabecera,
    Navegacion,
    DatosINR
  }
}
</script>