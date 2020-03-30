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
              <DatosINR />
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

          <div class="float-right mr-4" style="margin-top: -15px;">
            <div class="row">
              <form id="custom-search-form" class="form-search form-horizontal pull-right" >
                  <div class="input-append">
                      <input type="text" class="search-query pl-2 border border-dark" placeholder="Search" style="border-radius: 15px;">
                        <button type="submit" class="btn"><img src="../assets/busqueda.svg" alt="búsqueda" style="margin-left: -63px;"></button>
                  </div>
              </form>
              </div>
          </div>

          <hr style="margin-top: 350px; height: 1px; width: 1000px;
            background: -moz-radial-gradient(center center, circle, black, white); 
            background: -o-radial-gradient(center center, circle, black, white); 
            background: -ms-radial-gradient(center center, circle, black, white); 
            background: radial-gradient(center center, circle, black, white); 
            background: -webkit-radial-gradient(center center, circle, black, white); 
          "/>

          <div class="float-left">
              <div class="text-uppercase">
                Favoritos
              </div>
              <div class="d-flex-inline" style="margin-top: 10px;">
                <img src="../assets/carpeta.svg" alt="carpeta" class="img-responsive img-fluid" 
                  height="25" width="25"/> 

                <div class="text-uppercase" style="margin-left: 110px; margin-top: -22px;">
                  Nombre
                </div>

                  
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
  name: 'Documentos',
  components: {
    Cabecera,
    Navegacion, 
    DatosINR
  }
}
</script>