<template>
  <div class="documentos">

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

        <div class="d-flex-row bd-highlight border border-dark mt-2" style="width: 1100px; height:627px;">
          
          <div>
            <div class="d-flex mt-5 ml-5">
              <img src="../assets/carpeta.svg" alt="carpeta" class="img-responsive img-fluid" 
                height="40" width="40"/>

            </div>

          </div>

          <!--Para cada carpeta-->
          <div>
            <hr class="float-left border border-dark" style="border-right: 1px solid; height: 27px; width: 0px; margin-left: 67px; margin-top: -28px;">
            <div class="border border-dark mt-4" style="width: 50px; margin-left: 67px;">
            </div>
            <img src="../assets/carpetaCerrada.svg" alt="a" class="img-responsive img-fluid float-left" style="margin-top: -14px; margin-left: 45px;"
              height="25" width="25"/>
            <div class="float-left text-uppercase" style="margin-top: -13px; margin-left: 5px;"> Nombre carpeta</div>
              <!--Solo si está desplegado con el eliminar -->
              <!-- <div class="float-left text-primary text-uppercase" style="margin-top: 15px; margin-left: -100px;">
                Archivos
              </div> -->
          </div>

          <div class="float-right mr-4">
          
            <img src="../assets/añadirDocumento.svg" alt="añadir documento nuevo" class="img-responsive img-fluid" style="margin-top: -120px; margin-right: 145px;"
              height="25" width="25"/>
            <div class="ml-3" style="margin-top: -82px;"> Añadir documento </div>

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
import EstructuraPagina from '@/components/EstructuraPagina.vue'

export default {
  name: 'Documentos',
  components: {
    Cabecera,
    Navegacion, 
    EstructuraPagina
  }
}
</script>