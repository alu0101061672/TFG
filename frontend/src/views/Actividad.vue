<template>
  <div class="actividad">

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

        <div class="d-flex-row bd-highlight border border-dark mt-2" style="width: 1100px; height:627px;">

          <div class="d-inline-flex flex-row mt-5 w-100 justify-content-between"> 

            <button type="button" data-toggle="modal" data-target="#addAportacion" class="d-inline-flex btn bg-light border border-dark ml-5 mb-2" style="width:235px; height:36px;">
               <img src="../assets/añadir.svg" alt="añadir aportación" class="img-responsive img-fluid" 
                height="25" width="25"/>
                <div class="text-dark ml-1">Añadir nueva aportación</div>
            </button>

            <div class="modal fade" id="addAportacion" tabindex="-1" role="dialog" aria-labelledby="Añadir una aportación" aria-hidden="true">
             <div class="modal-dialog modal-dialog-centered" role="document">
               <div class="modal-content">
                 <div class="modal-header">
                    <h5 class="modal-title" id="AñadirAportacion">Añadir una aportación</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                 </div>
                 <div class="modal-body">

                    <form id="aportacion-form" @submit="onSubmit" @reset="onReset" method="post" class="d-inline-flex flex-column justify-content-center align-items-center" role="form">
                       
                        <div class="form-group" style="min-width:300px;">
                            <input v-model="aportacion.titulo" type="text" name="titulo" id="titulo" tabindex="1" aria-describedby="titleAportacion" class="text-uppercase form-control" placeholder="Titulo de la aportación" value="" required />
                            <div><small id="titleAportacion" class="form-text text-muted float-left ml-2"> Formato: NOMBRE APORTACION </small></div>
                        </div>

                        <div class="form-group" style="min-width:300px;">
                            <input v-model="aportacion.descripcion" type="text" name="descripcion" id="descripcion" tabindex="1" aria-describedby="descripcionAportacion" class="text-uppercase form-control" placeholder="Descripción de la aportación" value="" required />
                        </div>

                        <div class="form-group" style="min-width:300px;">
                            <b-form-select aria-describedby="recursosHelp" v-model="aportacion.recursosAportacion" :options="recursos" multiple :select-size="4"></b-form-select>
                            <div><small id="recursosHelp" class="form-text text-muted float-left ml-2"> Pulse Ctrl y seleccione para añadir múltiples opciones </small></div> 
                            
                            <!-- <input v-model="aportacion.recursosAportacion" list="recursos" type="text" name="recursos" id="recursos" tabindex="2" class="text-uppercase form-control" placeholder="Recursos necesarios" required />
                            <datalist id="recursos">
                                <option v-for="recurso in this.recursos" :key="recurso" v-bind:value="recurso"> {{ recurso }} </option>
                            </datalist> -->
                        </div>

                        <div class="form-group w-50">
                            <div class="row">
                                <div class="col-sm-12 col-sm-offset-3">												
                                    <button type="reset" class="form-control btn btn-light"> Resetear </button>
                                </div>
                            </div>
                        </div>

                        <div class="form-group modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="cerrar" style="width: 90px;"> Cancelar </button>
                            <button type="submit" id="guardar" v-on:click="getAportaciones()" variant="primary" name="aportaciones-submit" class="btn btn-primary" style="width: 90px;"> Añadir </button>

                        </div>
					          </form>

                 </div>
              </div>
            </div>
          </div>

            <button type="button" data-toggle="modal" data-target="#addInfo" class="d-inline-flex btn bg-white mr-5" style="width:70px; height:36px;">
              <img src="../assets/addInfo.svg" alt="añadir información" class="img-responsive img-fluid float-right"
                height="25" width="25"/>
              <div style="color: #ff2301;"> info </div>
            </button>

            <div class="modal fade" id="addInfo" tabindex="-1" role="dialog" aria-labelledby="Información" aria-hidden="true">
             <div class="modal-dialog modal-dialog-centered" role="document">
               <div class="modal-content">
                 <div class="modal-header">
                    <h5 class="modal-title" id="info"> Información del estilo de sintaxis a utilizar </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                 </div>
                 <div class="modal-body">

                    <form id="info-aportacion-form" class="d-inline-flex flex-column justify-content-center align-items-center" role="form">
                       
                       <div class="form-group w-75">
                         <u> Normas a seguir </u>
                       </div>
                        <ul class="form-group w-75" style="min-width:400px;">
                         <li> Escribir en mayúsculas siempre </li>
                         <li> Escribir sin tildes </li>
                         <li> Separación de palabras por un espacio </li>
                        </ul>

                        <div class="form-group modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="cerrar" style="width: 90px;"> Salir </button>
                        </div>
					          </form>

                 </div>
              </div>
            </div>
          </div>

          </div>

          <br />

          <div class="d-inline-flex flex-row float-left"> 
            
            <button type="button" data-toggle="modal" data-target="#rectificarAportacion" class="d-inline-flex btn bg-light border border-dark ml-5" style="width:235px; height:36px;">
                <img src="../assets/rectificar.svg" alt="rectificar aportación" class="img-responsive img-fluid" 
                height="25" width="25"/>
              <div class="text-dark ml-1">Rectificar una aportación</div>
            </button>
            
            <div class="modal fade" id="rectificarAportacion" tabindex="-1" role="dialog" aria-labelledby="Rectificar una aportación" aria-hidden="true">
             <div class="modal-dialog modal-dialog-centered" role="document">
               <div class="modal-content">
                 <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Rectificar una aportación</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                 </div>
                 <div class="modal-body">

                    <form id="rectificar-aportacion-form" @reset="onReset" class="d-inline-flex flex-column justify-content-center align-items-center" role="form">
                       
                       <div class="form-group" style="min-width:370px;">
                            <input v-model="newTitleAportacion" list="aportaciones" type="text" name="tituloARectificar" id="tituloARectificar" tabindex="1" aria-describedby="rectificar" class="text-uppercase form-control" placeholder="Nombre de la aportación a rectificar" value="" required />
                            <datalist id="aportaciones">
                                <option v-for="aportacion in aportacionesINR" :key="aportacion.titulo" v-bind:value="aportacion.titulo"> {{ aportacion.titulo }} </option>
                            </datalist>
                                                     <div class="mt-3">Selected: <strong>{{ newTitleAportacion }}</strong></div>   

                        </div>

                        <div class="form-group" style="min-width:370px;">
                            <input v-model="aportacion.titulo" type="text" name="titulo" id="rtitulo" tabindex="1" aria-describedby="titleAportacion" class="text-uppercase form-control" placeholder="Nuevo titulo de la aportación" value="" required />
                            <div><small id="titleAportacion" class="form-text text-muted float-left ml-2"> Formato: NOMBRE APORTACION </small></div>
                                                     <div class="mt-3">Selected: <strong>{{ aportacion.titulo }}</strong></div>   

                        </div>

                        <div class="form-group" style="min-width:370px;">
                            <input v-model="aportacion.descripcion" type="text" name="descripcion" id="rdescripcion" tabindex="1" aria-describedby="descripcionAportacion" class="text-uppercase form-control" placeholder="Descripción de la aportación" value="" required />
                         <div class="mt-3">Selected: <strong>{{ aportacion.descripcion }}</strong></div>   
                        </div>

                        <div class="form-group" style="min-width:370px;">
                          <b-form-select aria-describedby="rectificarRecursosHelp" v-model="aportacion.recursosAportacion" :options="recursos" multiple :select-size="4"></b-form-select>
                            <div><small id="rectificarRecursosHelp" class="form-text text-muted float-left ml-2"> Pulse Ctrl y seleccione para añadir múltiples opciones </small></div> 
                          <div class="mt-3">Selected: <strong>{{ aportacion.recursosAportacion }}</strong></div>
                            <!-- <input v-model="aportacion.recursosAportacion" list="recursos" type="text" name="chrecursos" id="chrecursos" tabindex="2" class="text-uppercase form-control" placeholder="Recursos necesarios" required />
                            <datalist id="recursos">
                                <option v-for="rec in recursos" :key="rec" v-bind:value="rec"> {{ rec }} </option>
                            </datalist> -->
                        </div>

                        <div class="form-group w-50">
                            <div class="row">
                                <div class="col-sm-12 col-sm-offset-3">												
                                    <button type="reset" class="form-control btn btn-light"> Resetear </button>
                                </div>
                            </div>
                        </div>

                        <div class="form-group modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="cerrar" style="width: 90px;"> Cancelar </button>
                            <button type="submit" id="cambiar2" v-on:click="changeDataAportaciones(newTitleAportacion,{aportacion})" variant="primary" name="rectificar-aportaciones" class="form-control btn btn-primary" style="width: 90px;"> Rectificar </button>
                        </div>
					          </form>

                 </div>
              </div>
            </div>
          </div>

        </div>

        <br /> <br />

        <div class="d-inline-flex flex-row float-left" v-if="rol === 'ADMIN'" style="margin-top: -3px;"> 

          <button type="button" data-toggle="modal" data-target="#eliminarAportacion" class="d-inline-flex btn bg-light border border-dark ml-5" style="width:235px; height:36px;">
              <img src="../assets/delete.svg" alt="eliminar aportación" class="img-responsive img-fluid" 
              height="25" width="25"/>
            <div class="text-dark ml-1">Eliminar una aportación</div>
          </button>

          <div class="modal fade" id="eliminarAportacion" tabindex="-1" role="dialog" aria-labelledby="Eliminar una aportación" aria-hidden="true">
             <div class="modal-dialog modal-dialog-centered" role="document">
               <div class="modal-content">
                 <div class="modal-header">
                    <h5 class="modal-title" id="EliminarAportacion">Eliminar una aportación</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                 </div>
                 <div class="modal-body">

                    <form id="eliminar-aportacion-form" @reset="onReset" class="d-inline-flex flex-column justify-content-center align-items-center" role="form">
                       
                        <div class="form-group" style="min-width:350px;">

                          <input v-model="removeAportacion" list="aportacionEliminar" type="text" name="titulo" id="dtitulo" tabindex="1" aria-describedby="aportacionEliminar" class="text-uppercase form-control" placeholder="Nombre de la aportación a eliminar" value="" required />
                          <datalist id="aportacionEliminar">
                              <option v-for="aportacion in aportacionesINR" :key="aportacion.titulo" v-bind:value="aportacion.titulo"> {{ aportacion.titulo }} </option>
                          </datalist>

                        </div>

                        <div class="form-group w-50">
                            <div class="row">
                                <div class="col-sm-12 col-sm-offset-3">												
                                    <button type="reset" class="form-control btn btn-light"> Resetear </button>
                                </div>
                            </div>
                        </div>

                        <div class="form-group modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="cerrar" style="width: 90px;"> Cancelar </button>
                            <button type="submit" id="eliminar" v-on:click="deleteAportacion(removeAportacion)" variant="primary" name="delete-aportaciones" class="form-control btn btn-primary" style="width: 90px;"> Eliminar </button>
                        </div>
					          </form>

                 </div>
              </div>
            </div>
          </div>

        </div>



          <br /> <br /> <br />

          <div class="d-inline-flex flex-row float-left ml-5"> 

            <div><u> Aportaciones realizadas </u></div>
          </div>

          <br /> <br />

          <div class="d-inline-flex flex-row float-left ml-5" v-for="aportacion in aportacionesINR" :key="aportacion.titulo"> 

              <div class="media mb-3">
                <div class="media-body ml-3">
                  <div class="bg-light rounded py-2 px-3 mb-2 shadow" style="min-width: 650px; max-width: 650px; font-size: 13px;">
                    <p class="text-small mb-0 text-muted text-uppercase float-left"> TITULO: {{ aportacion.titulo }} </p><br />
                    <p class="text-small mb-0 text-muted text-uppercase float-left"> DESCRIPCION: {{ aportacion.descripcion }} </p><br />
                    <p class="text-small mb-0 text-muted text-uppercase float-left"> RECURSOS: {{ aportacion.recursosAportacion.toString() }} </p><br />
                    <p class="text-small mb-0 text-muted text-uppercase float-left"> CREADO POR: {{ aportacion.createdBy }} </p><br />
                    <p class="small mb-0 text-muted text-uppercase float-right" style="margin-top:-15px;"> {{aportacion.date}}  </p> 

                    <p v-if="aportacion.rectificado === true" class="small mb-0 text-muted text-uppercase float-right" style="margin-top:-75px; margin-right:-125px;"> Rectificado  </p> 
                  </div>
                </div>
              </div>
              
          </div>
          
          <br /><br /><br /><br />

          <!-- <div class="d-inline-flex flex-row float-right mr-5"> 

              <div class="media ml-auto mb-3">
                <div class="media-body">
                  <div class="bg-light rounded py-2 px-3 mb-2">
                    <p class="text-small mb-0 text-muted">Apollo University, Delhi, India Test</p>
                    <p class="small text-muted">12:00 PM | Aug 13</p>
                  </div>
                </div>
              </div>

          </div> -->


        </div>

      </div>
    
    </div>

  </div>
</template>

<script>

const URL = "http://localhost:4000";

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
  },
  data() {
    return {
      recursos: [],
      aportaciones: [],
      aportacionesINR: [],
      newTitleAportacion: "",
      rol: this.$store.getters.getRole,
      usuario: this.$store.getters.getUsuario,
      removeAportacion: "",
      inr: this.$store.getters.getINR,
      aportacion: {
        titulo: "",
        descripcion: "",
        recursosAportacion: [],
        date: Date.now(),
        createdBy: this.$store.getters.getUsuario,
        inr: this.$store.getters.getINR,

      },



    };
  },
  async mounted (){
      await this.getAportaciones();
      await this.getRecursos();
  },
  methods: {

    async getRecursos(){
        await this.axios
        .get(URL + "/user/getrecursos")
        .then(res => {
          //console.log(res.data)
            this.recursos = res.data;

        })
        .catch(err => {
        console.log(err);
        });
    },
    async getAportaciones(){
        
        await this.axios
        .get(URL + "/user/showaportaciones")
        .then(res => {
          console.log(res);
          this.aportaciones = res.data;

          for (var item in this.aportaciones){

            if((this.aportaciones[item].inr._id === this.inr._id) && !(this.aportacionesINR.includes(res.data[item]))){
              this.aportacionesINR.push(res.data[item]);

            }
          }

        })
        .catch(err => {
        console.log(err);
        });

        $("#cerrar").click();
        $('.modal-backdrop').remove();
        this.aportacion.titulo = "";
        this.aportacion.descripcion = "";
        this.aportacion.recursos = "";
    },
    onSubmit(evt) {

      evt.preventDefault();
      this.axios
        .post(URL + "/user/aportacion", this.aportacion)
        .then(res => {
            console.log(res.data);
            })
        .catch(e => {
        console.log(e.response);
        });
        this.$store.commit("setAportacion", this.aportacion);

    },
    onReset(evt) {
      evt.preventDefault();

      // Reset our form values
      this.aportaciones.titulo = "";
      this.aportaciones.descripcion = "";
      this.aportaciones.recursos = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
          this.show = true;
      });
    },
    async changeDataAportaciones(newTitleAportacion,aportacion) {

      await this.axios
        .put(URL + `/user/changeDataAportacion/${newTitleAportacion}`, { aportacion })
        .then(res => {
            console.log(res.data);
            })
        .catch( e => {
        console.log(e.response);
        });

    },
    async deleteAportacion(removeAportacion) {

      await this.axios
      .delete(URL + `/user/deleteAportacion/${removeAportacion}`)
      .then(res => {
            console.log(res.data);
            })
      .catch( e => {
      console.log(e.response);
      })
      // this.removeAportacion = '';

    },




  }

}
</script>