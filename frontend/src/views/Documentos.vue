<template>
  <div class="documentos">

    <Cabecera/>

    <div class="d-inline-flex">
      <Navegacion /> 
    </div>

    <div>
      <div class="d-inline-flex bd-highlight ml-5 mr-5"> 

        <div class="p-2 flex-row bd-highlight">

            <div class="d-inline-flex flex-column bd-highlight border border-dark" style="width: 500px; height: 627px;">
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
                         <!-- '<div style='margin-left: 20px;'>;

              <img src='../assets/carpetaCerrada.svg' height='25' width='25' alt='carpetaCerrada' class='img-responsive img-fluid ml-5 float-left' />;
              <div class='ml-1 float-left text-uppercase' style='margin-top: -2px;'> Nombre carpeta</div>;

              </div>;'" -->
             <div class="float-left btn" height="40" width="40">
              <img src="../assets/carpeta.svg" alt="carpeta" class="img-responsive img-fluid" 
                height="40" width="40"/>
             </div>

            </div>


          </div>

          <div class="d-flex float-left" v-for="carpeta in carpetasINR" :key="carpeta.nombre" style="margin-left: 68px; min-width: 700px;">
              
              <img src="../assets/carpetaCerrada.svg" height="25" width="25" alt="carpeta cerrada" class="img-responsive img-fluid" />
              <div class="ml-1 text-uppercase" style="margin-top: -2;"> {{ carpeta.nombre }}</div>

          </div>
             <!-- <hr class="float-left border border-dark" style="border-right: 1px solid; height: 27px; width: 0px; margin-left: 67px; margin-top: -28px;">
            <div class="border border-dark mt-4" style="width: 50px; margin-left: 67px;"></div>
              -->
          <!--Para cada carpeta-->
          <!-- <div style="margin-left: 20px;">

            <img src="../assets/carpetaCerrada.svg" height="25" width="25" alt="a" class="img-responsive img-fluid ml-5 float-left" />
            <div class=" ml-1 float-left text-uppercase" style="margin-top: -2;"> Nombre carpeta</div>

          </div> -->

          <div class="float-right mr-4" style="margin-top: -70px;">

            <button type="button" data-toggle="modal" data-target="#addCarpeta" class="d-flex btn bg-light border border-dark mr-2 mb-2" style="width:190px; height:36px;">
               <img src="../assets/carpetaCerrada.svg" alt="añadir carpeta nueva" class="img-responsive img-fluid" 
              height="25" width="25"/>
              <div class="ml-2"> Añadir carpeta </div>
            </button>
          
            <button type="button" data-toggle="modal" data-target="#addDocument" class="d-flex btn bg-light border border-dark mr-2" style="width:190px; height:36px;">
               <img src="../assets/añadirDocumento.svg" alt="añadir documento nuevo" class="img-responsive img-fluid" 
              height="25" width="25"/>
              <div class="ml-2"> Añadir documento </div>
            </button>

            <div class="modal fade" id="addCarpeta" tabindex="-1" role="dialog" aria-labelledby="Añadir una carpeta" aria-hidden="true">
             <div class="modal-dialog modal-dialog-centered" role="document">
               <div class="modal-content">
                 <div class="modal-header">
                    <h5 class="modal-title" id="AñadirCarpeta">Añadir una carpeta</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                 </div>
                 <div class="modal-body">

                    <form id="addCarpeta-form" @submit="onSubmit" method="post" class="d-inline-flex flex-column justify-content-center align-items-center" role="form">

                        <input v-model="carpeta.nombre" placeholder="Nombre de la carpeta" aria-describedby="nombreCarpeta" type="nombreCarpeta" name="nombreCarpeta" id="nombreCarpeta" class="form-control mt-3 mb-3"  required/>

                        <div class="form-group modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="cerrar" style="width: 90px;"> Cancelar </button>
                            <button type="submit" id="guardarCarpeta" v-on:click="getCarpetas()" variant="primary" name="inr-submit" class="btn btn-primary" style="width: 90px;"> Añadir </button>

                        </div>
					          </form>

                 </div>
               </div>
              </div>
            </div>
          </div>


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

</template>


<script>
const URL = "http://localhost:4000";

// $(function() {

//     $('#addCarpeta').click(function(e) {
//       console.log(e)
//         render('<h1>HOLA</h1>')
//         // render(`<div style="margin-left: 20px;">

//         //     <img src="../assets/carpetaCerrada.svg" height="25" width="25" alt="a" class="img-responsive img-fluid ml-5 float-left" />
//         //     <div class=" ml-1 float-left text-uppercase" style="margin-top: -2;"> Nombre carpeta </div>

//         //   </div>`)
//   });

// });

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
        carpeta: {
          nombre: "",
          file: "",
          inr: this.$store.getters.getINR,
        },
        carpetas: [],
        carpetasINR: [],
        inr: this.$store.getters.getINR,




      };
  },
  async mounted (){
      await this.getCarpetas();
  },
  methods: {

    async getCarpetas () {

      await this.axios
        .get(URL + "/user/showcarpetas")
        .then(res => {

          console.log(res.data);
          this.carpetas = res.data;

          for (var item in this.carpetas){

            if((this.carpetas[item].inr._id === this.inr._id) && !(this.carpetasINR.includes(res.data[item]))){
              this.carpetasINR.push(res.data[item]);

            }
          }

        })
        .catch(err => {
        console.log(err);
        });

        $("#cerrar").click();
        $('.modal-backdrop').remove();
        this.carpetas.nombre = "";

    },

    onSubmit(evt) {

      evt.preventDefault();
      this.axios
        .post(URL + "/user/addCarpeta", this.carpeta)
        .then(res => {
            console.log(res.data);
            })
        .catch(e => {
        console.log(e.response);
        });
        this.$store.commit("setCarpeta", this.carpeta);

    },

  },
}
</script>