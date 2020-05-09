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
              <DatosINR /> 
            </div>

        </div>

        <div class="d-flex flex-column bd-highlight border border-dark mt-2" style="width: 1100px; height:627px;">
         
          <div class="d-inline-flex flex-column mt-3" style="max-width: 840px; max-height:350px;">

            <div class="btn" style="justify-content: flex-start;display: flex; margin-left: 95px;" height="40" width="40">
              <img src="../assets/carpeta.svg" alt="carpeta" class="img-responsive img-fluid" 
                height="40" width="40"/>
             </div>
            
            <div class="overflow-auto" style="margin-top: 5px; left: -12px; position: relative;">
            <div class="float-left" v-for="carpeta in carpetasINR" :key="carpeta.nombre" style="margin-left: 68px; min-width: 700px;">

                <div v-if="!carpeta.fav">
                  <b-button v-on:click="addFavorito(carpeta)" class="btn bg-white border-0 btn-outline-light float-left" type="submit">
                  <img src="../assets/favoritovacio.svg" height="25" width="25" alt="favorito vacio" class="d-flex img-responsive img-fluid" />
                  </b-button>
                </div>
                <div v-else>
                  <b-button  v-on:click="removeFavorito(carpeta)" class="btn bg-white border-0 btn-outline-light float-left" type="button">
                  <img src="../assets/favoritolleno.svg" height="25" width="25" alt="favorito lleno" class="d-flex img-responsive img-fluid" />
                  </b-button>
                </div>


                <b-button v-b-toggle="carpeta._id" class="btn bg-white border-0 btn-outline-light float-left" type="button">
                  <img src="../assets/carpetaCerrada.svg" height="25" width="25" alt="carpeta cerrada" class="d-flex img-responsive img-fluid" />
                </b-button>

                <div class="text-uppercase d-flex" style="margin-left: 30px; margin-top:8px;"> {{ carpeta.nombre }}</div>
                <b-collapse :id="carpeta._id">
                  <b-link href="#" style="margin-left:100px;" class="d-flex alert-link" v-for="file in carpeta.file" :key="file"> {{ file.toString() }} </b-link> 
                </b-collapse>
              </div>
          </div>

          <div class="d-inline-flex flex-row" style="max-width: 250px; position:absolute; right: 140px; margin-top:30px;">
            <div class="float-right mr-3">
            <button type="button" v-if="rol === 'ADMIN'" data-toggle="modal" data-target="#addCarpeta" class="d-flex btn bg-light border border-dark mr-2 mb-2" style="width:190px; height:36px;">
               <img src="../assets/carpetaCerrada.svg" alt="añadir carpeta nueva" class="img-responsive img-fluid" 
              height="25" width="25"/>
              <div class="ml-2"> Añadir carpeta </div>
            </button>

            <button type="button" v-if="rol === 'ADMIN'" data-toggle="modal" data-target="#deleteCarpeta" class="d-flex btn bg-light border border-dark mr-2 mb-2" style="width:190px; height:36px;">
               <img src="../assets/delete.svg" alt="eliminar carpeta nuevo" class="img-responsive img-fluid" 
              height="25" width="25"/>
              <div class="ml-2"> Eliminar carpeta </div>
            </button>
          
            <button type="button" data-toggle="modal" data-target="#addDocument" class="d-flex btn bg-light border border-dark mr-2 mb-2" style="width:190px; height:36px;">
               <img src="../assets/añadirDocumento.svg" alt="añadir documento nuevo" class="img-responsive img-fluid" 
              height="25" width="25"/>
              <div class="ml-2"> Añadir documento </div>
            </button>
          </div>
          </div>
          </div>

          <div class="d-inline-flex flex-column justify-content-end">
            <hr style="height: 1px; width: 1000px;
            background: -moz-radial-gradient(center center, circle, black, white); 
            background: -o-radial-gradient(center center, circle, black, white); 
            background: -ms-radial-gradient(center center, circle, black, white); 
            background: radial-gradient(center center, circle, black, white); 
            background: -webkit-radial-gradient(center center, circle, black, white); 
          "/>

            <div class="text-uppercase mb-1" style="margin-left: -785px; margin-top: 10px;">
              <img src="../assets/carpeta.svg" height="25" width="25" alt="a" class="img-responsive img-fluid mr-1" />
              Favoritos
            </div>

            <div class="overflow-auto" style="min-height: 170px;max-height: 170px; max-width: 830px;">
              <div class="d-flex mt-2" v-for="favorito in favs" :key="favorito.nombre" style="margin-left:105px;">

                    <b-button v-b-toggle="favorito" class="btn bg-white border-0 btn-outline-light" type="button">
                    <img src="../assets/carpetaCerrada.svg" alt="carpeta cerrada" class="img-responsive img-fluid d-flex" 
                      height="25" width="25"/> 
                    </b-button>

                    <div class="text-uppercase d-flex" style=" margin-top: 8px;"> {{ favorito.nombre }} </div>
                    <b-collapse :id="favorito.nombre">
                      <b-link href="#" style="margin-left:50px;" class="d-flex alert-link" v-for="file in favorito.file" :key="file"> {{ file.toString() }} </b-link> 
                    </b-collapse>
                   
          
<!--                 
             
                    <div class="text-uppercase">
                      {{ favorito.nombre }}
                    </div> -->

              </div>
            </div>

          </div>
          
<!--           
         <div class="ml-4 d-flex flex-column" style="margin-top: 500px" >
          <hr style="height: 1px; width: 1000px;
            background: -moz-radial-gradient(center center, circle, black, white); 
            background: -o-radial-gradient(center center, circle, black, white); 
            background: -ms-radial-gradient(center center, circle, black, white); 
            background: radial-gradient(center center, circle, black, white); 
            background: -webkit-radial-gradient(center center, circle, black, white); 
          "/>
          <div class="float-left ml-5 text-uppercase">
            Favoritos
          </div>

          <div class="d-flex" v-for="favorito in favoritos" :key="favorito.nombre">
                <img src="../assets/carpeta.svg" alt="carpeta" class="img-responsive img-fluid mr-1" 
                  height="25" width="25"/> 

                <div class="text-uppercase">
                  {{ favorito.nombre }}
                </div>

          </div>

         </div>

          <div style="margin-top: -580px;">
            <div class="d-flex" style="margin-left:;">

             <div class="btn" height="40" width="40">
              <img src="../assets/carpeta.svg" alt="carpeta" class="img-responsive img-fluid" 
                height="40" width="40"/>
             </div>

            </div>

          </div>
          <div class="float-right mr-3">
            <button type="button" data-toggle="modal" data-target="#addCarpeta" class="d-flex btn bg-light border border-dark mr-2 mb-2" style="width:190px; height:36px;">
               <img src="../assets/carpetaCerrada.svg" alt="añadir carpeta nueva" class="img-responsive img-fluid" 
              height="25" width="25"/>
              <div class="ml-2"> Añadir carpeta </div>
            </button>

            <button type="button" data-toggle="modal" data-target="#deleteCarpeta" class="d-flex btn bg-light border border-dark mr-2 mb-2" style="width:190px; height:36px;">
               <img src="../assets/delete.svg" alt="eliminar carpeta nuevo" class="img-responsive img-fluid" 
              height="25" width="25"/>
              <div class="ml-2"> Eliminar carpeta </div>
            </button>
          
            <button type="button" data-toggle="modal" data-target="#addDocument" class="d-flex btn bg-light border border-dark mr-2 mb-2" style="width:190px; height:36px;">
               <img src="../assets/añadirDocumento.svg" alt="añadir documento nuevo" class="img-responsive img-fluid" 
              height="25" width="25"/>
              <div class="ml-2"> Añadir documento </div>
            </button>
          </div> -->

          <!-- <div class="overflow-auto" style="max-height:340px; margin-top: 5px; left: -12px; position: relative; max-width: 840px;">
            <div class="float-left" v-for="carpeta in carpetasINR" :key="carpeta.nombre" style="margin-left: 68px; min-width: 700px;">

                <div v-if="carpeta.fav === false">
                  <b-button v-on:click="addFavorito(carpeta)" class="btn bg-white border-0 btn-outline-light float-left" type="submit">
                  <img src="../assets/favoritovacio.svg" height="25" width="25" alt="favorito vacio" class="d-flex img-responsive img-fluid" />
                  </b-button>
                </div>
                <div v-if="carpeta.fav === true">
                  <b-button  v-on:click="removeFavorito(carpeta)" class="btn bg-white border-0 btn-outline-light float-left" type="button">
                  <img src="../assets/favoritolleno.svg" height="25" width="25" alt="favorito lleno" class="d-flex img-responsive img-fluid" />
                  </b-button>
                </div>


                <b-button v-b-toggle="carpeta._id" class="btn bg-white border-0 btn-outline-light float-left" type="button">
                  <img src="../assets/carpetaCerrada.svg" height="25" width="25" alt="carpeta cerrada" class="d-flex img-responsive img-fluid" />
                </b-button>

                <div class="text-uppercase d-flex" style="margin-left: 30px; margin-top:8px;"> {{ carpeta.nombre }}</div>
                <b-collapse :id="carpeta._id">
                <b-link href="#" style="margin-left:50px;" class="d-flex alert-link" v-for="file in carpeta.file" :key="file"> {{ file.toString() }} </b-link> 
                </b-collapse>
            </div>
          </div>  -->
          <!-- ----------------------------- -->
           
             <!-- <hr class="float-left border border-dark" style="border-right: 1px solid; height: 27px; width: 0px; margin-left: 67px; margin-top: -28px;">
            <div class="border border-dark mt-4" style="width: 50px; margin-left: 67px;"></div>
              -->
          <!--Para cada carpeta-->
          <!-- <div style="margin-left: 20px;">

            <img src="../assets/carpetaCerrada.svg" height="25" width="25" alt="a" class="img-responsive img-fluid ml-5 float-left" />
            <div class=" ml-1 float-left text-uppercase" style="margin-top: -2;"> Nombre carpeta</div>

          </div> -->

          <!-- <div class="float-right mr-4" > style="margin-top: -400px;" -->

            <!-- <button type="button" data-toggle="modal" data-target="#addCarpeta" class="d-flex btn bg-light border border-dark mr-2 mb-2" style="width:190px; height:36px;">
               <img src="../assets/carpetaCerrada.svg" alt="añadir carpeta nueva" class="img-responsive img-fluid" 
              height="25" width="25"/>
              <div class="ml-2"> Añadir carpeta </div>
            </button>

            <button type="button" data-toggle="modal" data-target="#deleteCarpeta" class="d-flex btn bg-light border border-dark mr-2 mb-2" style="width:190px; height:36px;">
               <img src="../assets/delete.svg" alt="eliminar carpeta nuevo" class="img-responsive img-fluid" 
              height="25" width="25"/>
              <div class="ml-2"> Eliminar carpeta </div>
            </button>
          
            <button type="button" data-toggle="modal" data-target="#addDocument" class="d-flex btn bg-light border border-dark mr-2 mb-2" style="width:190px; height:36px;">
               <img src="../assets/añadirDocumento.svg" alt="añadir documento nuevo" class="img-responsive img-fluid" 
              height="25" width="25"/>
              <div class="ml-2"> Añadir documento </div>
            </button> -->

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

          <div class="modal fade" id="deleteCarpeta" tabindex="-1" role="dialog" aria-labelledby="Eliminar una carpeta" aria-hidden="true">
             <div class="modal-dialog modal-dialog-centered" role="document">
               <div class="modal-content">
                 <div class="modal-header">
                    <h5 class="modal-title" id="eliminarCarpeta">Eliminar una carpeta</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                 </div>
                 <div class="modal-body">

                    <form id="eliminarCarpeta-form" class="d-inline-flex flex-column justify-content-center align-items-center" role="form">

                        <input v-model="removeCarpeta" list="eliminarCarpeta" placeholder="Nombre de la carpeta" aria-describedby="nombreCarpeta" type="nombreCarpeta" name="nombreCarpeta" id="nombreCarpetaEliminar" class="form-control mt-3 mb-3"  required/>
                        <datalist id="eliminarCarpeta">
                            <option v-for="carpeta in carpetasINR" :key="carpeta.nombre" v-bind:value="carpeta.nombre"> {{ carpeta.nombre }} </option>
                        </datalist>

                        <div class="form-group modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="cerrar" style="width: 90px;"> Cancelar </button>
                            <button type="submit" id="eliminarCarpeta" v-on:click="deleteCarpeta(removeCarpeta)" variant="primary" name="inr-submit" class="btn btn-primary form-control" style="width: 90px;"> Eliminar </button>
                        </div>
					          </form>

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
                       
                       <input v-model="carpeta.nombre" list="verCarpeta" placeholder="Nombre de la carpeta para el fichero" aria-describedby="nombreCarpeta" type="nombreCarpeta" name="nombreCarpeta" id="nombreCarpetaVer" class="form-control mt-3 mb-3"  required/>
                        <datalist id="verCarpeta">
                            <option v-for="carpeta in carpetasINR" :key="carpeta.nombre" v-bind:value="carpeta.nombre"> {{ carpeta.nombre }} </option>
                        </datalist>

                        <b-form-file v-model="file" class="mt-3 mb-3" plain></b-form-file>
                         <!-- <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>  -->

                        <div class="form-group modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="cerrar" style="width: 90px;"> Cancelar </button>
                            <button type="submit" v-on:click="addFile(file)" id="addFile" variant="primary" name="addFile-submit" class="btn btn-primary" style="width: 90px;"> Añadir </button>

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
          </div> Poner antes-->

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
          file: [],
          inr: JSON.parse(localStorage.getItem("INR")),
          fav: false,
          favoritos: [],
          
        },
        carpetas: [],
        carpetasINR: [],
        inr: localStorage.getItem("INR"),
        removeCarpeta: "",
        favoritos: [],
        rol: localStorage.getItem("Rol"),
        favs: [],


      };
  },
  async mounted (){
      await this.getCarpetas();
      await this.getFavoritos();

  },
  watch: {

    

  },
  methods: {

    addFavorito(carpeta) {

      if(!(this.carpeta.favoritos.includes(carpeta))){
        this.carpeta.favoritos.push(carpeta);
      }

      this.axios
        .put(URL + "/user/addFavorito",  carpeta)
        .then(res => {
            this.getCarpetas();
            console.log(res.data);
            })
        .catch(e => {
        console.log(e.response);
        });
        this.$store.commit("setFavoritos", carpeta);
        location.reload();



    },
    removeFavorito(carpeta) {

      if((this.carpeta.favoritos.includes(carpeta))){
        this.carpeta.favoritos.pop(carpeta);
      }

      this.axios
        .put(URL + "/user/removeFavorito",  carpeta)
        .then(res => {
                        this.getCarpetas();

            console.log(res.data);
            })
        .catch(e => {
        console.log(e.response);
        });
        this.$store.commit("removeFavoritos", carpeta);
        location.reload();



    },

    async addFile(filename) {

      this.carpeta.file.push(filename.name);

      this.axios
        .put(URL + "/user/addFile",  this.carpeta)
        .then(res => {
            console.log(res.data);
            })
        .catch(e => {
        console.log(e.response);
        });

    },

     async getFavoritos () {

      await this.axios
        .get(URL + "/user/showfavoritos")
        .then(res => {

            
            for (var item in res.data){

              if((res.data[item].inr === JSON.parse(this.inr)._id) && !(this.carpeta.favoritos.includes(res.data[item]))){
                this.favs.push(res.data[item]);
              }
            }
        })
        .catch(err => {
        console.log(err);
        });

    },

    async getCarpetas () {

      await this.axios
        .get(URL + "/user/showcarpetas")
        .then(res => {

          if(!(this.carpetas.includes(res.data))){ 
              this.carpetas = res.data;
          }

          for (var item in this.carpetas){

            if((this.carpetas[item].inr._id === JSON.parse(this.inr)._id) && !(this.carpetasINR.includes(res.data[item]))){

              this.carpetasINR.push(res.data[item]);

            }
          }

        })
        .catch(err => {
        console.log(err);
        });

        $("#cerrar").click();
        $('.modal-backdrop').remove();
        this.carpetas = {};

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
        location.reload();

    },

    async deleteCarpeta(removeCarpeta) {

      await this.axios
      .delete(URL + `/user/deleteCarpeta/${removeCarpeta}`)
      .then(res => {
            console.log(res.data);
            })
      .catch( e => {
      console.log(e.response);
      })
      this.removeCarpeta = '';


    },

  },
}
</script>