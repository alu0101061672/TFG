<template>
  <div class="documentos">

    <Cabecera/>

    <div class="d-inline-flex">
      <Navegacion /> 
    </div>

    <div>
      <div class="d-inline-flex bd-highlight ml-5 mr-5"> 

        <div class="p-2 flex-row bd-highlight">

            <div class="d-inline-flex flex-column bd-highlight border-dark border-top" style="width: 500px;">
              <!-- <div class="d-inline-flex flex-column bd-highlight border-dark border-left" style="height: 273px;">
              <div class="d-inline-flex flex-column bd-highlight border-dark border-right" style="height: 273px;">
                -->
              <DatosINR /> 
               <!-- </div></div> -->
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

          <div class="float-right mr-4" style="margin-top: -70px;">
          
            <button type="button" data-toggle="modal" data-target="#addDocument" class="d-flex btn bg-light border border-dark mr-2" style="width:190px; height:36px;">
               <img src="../assets/añadirDocumento.svg" alt="añadir documento nuevo" class="img-responsive img-fluid" 
              height="25" width="25"/>
              <div class="ml-2"> Añadir documento </div>
            </button>

            <div class="modal fade" id="addDocument" tabindex="-1" role="dialog" aria-labelledby="Añadir un documento" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Añadir un documento</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form id="documento-form" class="d-inline-flex flex-column justify-content-center align-items-center" role="form">
                       
                        <b-form-file v-model="file" class="mt-3 mb-3" plain></b-form-file>
                        <!-- <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div> -->

                        <div class="form-group modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="cerrar" style="width: 90px;"> Cancelar </button>
                            <button type="button" id="guardar" variant="primary" name="inr-submit" class="btn btn-primary" style="width: 90px;"> Añadir </button>

                        </div>
					</form>

                </div>

                </div>
            </div>
        </div>

          </div>

          <!-- <div class="float-right mr-4" style="margin-top: -15px;">
            <div class="row">
              <form id="custom-search-form" class="form-search form-horizontal pull-right" >
                  <div class="input-append">
                      <input type="text" class="search-query pl-2 border border-dark" placeholder="Search" style="border-radius: 15px;">
                        <button type="submit" class="btn"><img src="../assets/busqueda.svg" alt="búsqueda" style="margin-left: -63px;"></button>
                  </div>
              </form>
              </div>
          </div> -->

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
  },
  data() {
      return {
        file: null,
      }
    }
}
</script>