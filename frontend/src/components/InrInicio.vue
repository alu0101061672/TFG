<template>
<div>
    <div class="d-flex flex-row bd-highlight align-items-center pl-5 float-right" style="max-width:750px; margin-top: -69px; margin-right: 180px;">
          
          <div class="p-2 bd-highlight ml-4 font-weight-bold">
              <h5> Filtros </h5>
          </div>
          
          <div class="bd-highlight mb-2 ml-3">
            <div class="dropdown float-right">

              <button class="btn btn-secondary dropdown-toggle" style="color:black; background-color:white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Fecha
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                <a class="dropdown-item" href="#"> Comienzan antes </a>
                <a class="dropdown-item" href="#"> Comienzan más tarde </a>               
              </div>
            
            </div>
          </div>
          
          <div class="bd-highlight mb-2 ml-3">
            <div class="dropdown float-right">

              <button class="btn btn-secondary dropdown-toggle" style="color:black; background-color:white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Gravedad
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                <a v-on:click="getMasGrave()" class="dropdown-item" href="#"> Más grave </a>
                <a v-on:click="getMenosGrave()" class="dropdown-item" href="#"> Menos grave </a> 
                <div class="dropdown-divider"></div>
                <a v-on:click="putNormal()" class="dropdown-item" href="#"> Sin filtro </a>                             
              </div>
            
            </div>
          </div>

          <div class="input-group-prepend mb-2 ml-3">
            <div class="input-group-text bg-white border-0">
              <input v-on:click="getSimulacros()" v-model="checked" type="checkbox" id="checkbox" aria-label="Simulacros">
            </div>
              <div class="bd-highlight" >
                Simulacros
              </div>
          </div>

          <div class="input-group-prepend mb-2 ml-3">
            <div class="input-group-text bg-white border-0">
              <input type="checkbox" aria-label="Casos reales" id="checkbox2" v-on:click="getCasosReales()" v-model="checked2">
            </div>
              <div class="bd-highlight">
                Casos reales
              </div>
          </div>

    </div>
    
    <div class="p-2 d-flex bd-highlight justify-content-end mr-5" style="height:50px;" v-if="rol === 'ADMIN'">

        <button type="button" data-toggle="modal" data-target="#newINR" class="d-flex btn bg-light border border-dark mr-2" style="width:180px; height:36px;">
            <img src="../assets/añadir.svg" alt="añadir inr" class="img-responsive img-fluid float-left" 
                height="25" width="25"/>
            <div class="d-flex ml-1"> Crear nuevo INR </div>
        </button>

        <button type="button" data-toggle="modal" data-target="#modifyINR" class="d-flex btn bg-light border border-dark mr-2" style="width:225px; height:36px;">
            <img src="../assets/rectificar.svg" alt="modificar inr" class="img-responsive img-fluid float-left" 
                height="25" width="25"/>
            <div class="d-flex ml-1"> Modificar INR existente </div>
        </button>

        <button type="button" data-toggle="modal" data-target="#deleteINR" class="d-flex btn bg-light border border-dark" style="width:150px; height:36px;">
            <img src="../assets/delete.svg" alt="eliminar inr" class="img-responsive img-fluid float-left" 
                height="25" width="25"/>
            <div class="d-flex ml-1"> Eliminar INR </div>
        </button>

        <div class="modal fade" id="newINR" tabindex="-1" role="dialog" aria-labelledby="newINRTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Crear INR</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form id="inr-form" class="d-flex flex-column align-items-center" @submit="onSubmit" @reset="onReset" method="post" role="form">
                       
                        <div class="form-group w-75">
                            <input v-model="inr.nombre" type="text" name="nombre" id="nombre" tabindex="1" aria-describedby="nombreHelp" class="text-uppercase form-control" placeholder="Nombre" value="" required />
                            <div><small id="nombreHelp" class="form-text text-muted float-left ml-2"> Formato: NOMBRE INR </small></div>
                        </div>
                        
                        <div class="form-group w-75">
                            <input v-model="inr.localizacion" type="text" name="localizacion" id="localizacion" tabindex="1" class="text-uppercase form-control" aria-describedby="localizacionHelp" placeholder="Localización" value="" required />
                            <div><small id="localizacionHelp" class="form-text text-muted float-left ml-2"> Formato: SANTA CRUZ </small></div>

                        </div>

                        <div class="form-group w-75">
                            <input v-model="inr.descripcion" type="text" name="descripcion" id="descripcion" tabindex="1" class="text-uppercase form-control" placeholder="Descripción" value="" required />

                        </div>

                        <div class="form-group w-75">

                            <input v-model="inr.gravedad" list="gravedades" type="text" name="gravedad" id="gravedad" tabindex="2" class="text-uppercase form-control" aria-describedby="gravedadHelp" placeholder="Gravedad" required />
                            
                            <datalist id="gravedades">
                                <option v-for="grav in gravedades" :key="grav" v-bind:value="grav"> {{ grav }} </option>
                            </datalist> 
                            
                        </div>

                        <div class="form-group w-75">
                            <input v-model="inr.tipo" list="tipos" type="text" name="tipo" id="tipo" tabindex="2" class="text-uppercase form-control" placeholder="Tipo" aria-describedby="tipoHelp" required />
                            
                            <datalist id="tipos">
                                <option v-for="tipo in tipos" :key="tipo" v-bind:value="tipo"> {{ tipo }} </option>
                            </datalist> 

                        </div>

                        <div class="form-group w-75">
                            <input v-model="inr.numAfectados" type="number" name="numAfectados" min="0" id="numAfectados" tabindex="2" class="text-uppercase form-control" placeholder="Número de afectados" required />
                        </div>

                        <div class="form-group w-75">
                            
                            <div>
                                <b-form-select aria-describedby="recursosHelp" v-model="inr.recursoArray" :options="recursos" multiple :select-size="4"></b-form-select>
                                <div><small id="recursosHelp" class="form-text text-muted float-left ml-2"> Pulse Ctrl y seleccione para añadir múltiples opciones </small></div> -->
                            </div>

                        </div>

                        <div class="form-group w-75">
                            <input v-model="inr.tipoTerreno" list="terrenos" type="text" name="tipoTerreno" id="tipoTerreno" tabindex="2" class="text-uppercase form-control" placeholder="Tipo de terreno" required />
                        
                            <datalist id="terrenos">
                                <option v-for="terreno in terrenos" :key="terreno" v-bind:value="terreno"> {{ terreno }} </option>
                            </datalist>

                        </div>

                        <div class="form-group w-75" style="max-height: 38px !important; margin-top: -23px;">
                            
                                <label for="FechaInicio"></label>
                                <b-form-datepicker id="FechaInicio" v-model="inr.fechaInicio" today-button reset-button close-button locale="es" :date-format-options="{ year: 'numeric', month: 'long', day: '2-digit'}"></b-form-datepicker>
                            
                        </div>

                        <div class="form-group w-75">
                            
                                <label for="FechaFin"></label>
                                <b-form-datepicker id="FechaFin" v-model="inr.fechaFin" today-button reset-button close-button locale="es" :date-format-options="{ year: 'numeric', month: 'long', day: '2-digit'}"></b-form-datepicker>
                            
                        </div>

                        <div class="form-group w-75">
                            <div class="row justify-content-center">
                                <div class="col-sm-6 col-sm-offset-3">												
                                    <button type="reset" class="form-control btn btn-light"> Resetear </button>
                                </div>
                            </div>
                        </div>

                        <div class="form-group modal-footer">
                            <button type="button" class="form-control btn btn-secondary" data-dismiss="modal" id="cerrar" > Cancelar </button>
                            <button type="submit" id="guardar" v-on:click="getINRs()" variant="primary" name="inr-submit" class="form-control btn btn-primary"> Guardar </button>

                        </div>
					</form>

                </div>

                </div>
            </div>
        </div>

        <div class="modal fade" id="modifyINR" tabindex="-1" role="dialog" aria-labelledby="modifyINRTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Modificar INR</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form id="inr-form-modify" class="d-flex flex-column align-items-center" @reset="onReset" role="form">

                        <div class="form-group w-75">
                            <input v-model="nameOfINR" type="text" name="nombre" id="nombre" tabindex="1" aria-describedby="nombreHelp" class="text-uppercase form-control" placeholder="Nombre del INR a modificar" value="" required />
                            <div><small id="nombreHelp" class="form-text text-muted float-left ml-2"> Formato: NOMBRE INR </small></div>
                        </div>
                       
                        <div class="form-group w-75">
                            <input v-model="inr.nombre" type="text" name="nombre" id="nombre" tabindex="1" aria-describedby="nombreHelp" class="text-uppercase form-control" placeholder="Nuevo nombre" value="" required />
                            <div><small id="nombreHelp" class="form-text text-muted float-left ml-2"> Formato: NOMBRE INR </small></div>
                        </div>
                        
                        <div class="form-group w-75">
                            <input v-model="inr.localizacion" type="text" name="localizacion" id="localizacion" tabindex="1" class="text-uppercase form-control" aria-describedby="localizacionHelp" placeholder="Localización" value="" required />
                            <div><small id="localizacionHelp" class="form-text text-muted float-left ml-2"> Formato: SANTA CRUZ </small></div>

                        </div>

                        <div class="form-group w-75">
                            <input v-model="inr.descripcion" type="text" name="descripcion" id="descripcion" tabindex="1" class="text-uppercase form-control" placeholder="Descripción" value="" required />

                        </div>

                        <div class="form-group w-75">

                            <input v-model="inr.gravedad" list="gravedades" type="text" name="gravedad" id="gravedad" tabindex="2" class="text-uppercase form-control" aria-describedby="gravedadHelp" placeholder="Gravedad" required />
                            
                            <!-- <datalist id="gravedades">
                                <option v-for="grav in gravedades" :key="grav" v-bind:value="grav"> {{ grav }} </option>
                            </datalist> -->
                            
                        </div>

                        <div class="form-group w-75">
                            <input v-model="inr.tipo" list="tipos" type="text" name="tipo" id="tipo" tabindex="2" class="text-uppercase form-control" placeholder="Tipo" aria-describedby="tipoHelp" required />
                            <!-- <datalist id="tipos">
                                <option v-for="tipo in tipos" :key="tipo" v-bind:value="tipo"> {{ tipo }} </option>
                            </datalist> -->
                            <div><small id="tipoHelp" class="form-text text-muted float-left ml-2"> Opciones: SIMULACRO, CASO REAL </small></div>

                        </div>

                        <div class="form-group w-75">
                            <input v-model="inr.numAfectados" type="number" name="numAfectados" min="0" id="numAfectados" tabindex="2" class="text-uppercase form-control" placeholder="Número de afectados" required />
                        </div>

                        <div class="form-group w-75">
                            <input v-model="inr.recursosNecesarios" list="recursos" type="text" name="recursosNecesarios" id="recursosNecesarios" tabindex="2" class="text-uppercase form-control" placeholder="Recursos necesarios" required />
                        </div>

                        <div class="form-group w-75">
                            <input v-model="inr.tipoTerreno" list="terrenos" type="text" name="tipoTerreno" id="tipoTerreno" tabindex="2" class="text-uppercase form-control" placeholder="Tipo de terreno" required />
                        </div>

                        <div class="form-group w-75" style="max-height: 38px !important; margin-top: -23px;">
                            
                                <label for="FechaInicio"></label>
                                <b-form-datepicker id="FechaInicio" v-model="inr.fechaInicio" today-button reset-button close-button locale="es" :date-format-options="{ year: 'numeric', month: 'long', day: '2-digit'}" required></b-form-datepicker>
                            
                        </div>

                        <div class="form-group w-75">
                            
                                <label for="FechaFin"></label>
                                <b-form-datepicker id="FechaFin" v-model="inr.fechaFin" today-button reset-button close-button locale="es" :date-format-options="{ year: 'numeric', month: 'long', day: '2-digit'}" required></b-form-datepicker>
                            
                        </div>

                        <div class="form-group w-75">
                            <div class="row justify-content-center">
                                <div class="col-sm-6 col-sm-offset-3">												
                                    <button type="reset" class="form-control btn btn-light"> Resetear </button>
                                </div>
                            </div>
                        </div>

                        <div class="form-group modal-footer">
                            <button type="button" class="form-control btn btn-secondary" data-dismiss="modal" id="cerrar" > Cancelar </button>
                            <button type="submit" id="cambiar" v-on:click="changeDataINR(nameOfINR,{inr})" variant="primary" name="inr-submit-modify" class="form-control btn btn-primary"> Cambiar </button>
                        </div>
					</form>

                </div>

                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="deleteINR" tabindex="-1" role="dialog" aria-labelledby="deleteINRTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Eliminar INR</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form id="inr-form-eliminar" class="d-flex flex-column align-items-center" @reset="onReset" role="form">

                        <div class="form-group w-75">

                            <input v-model="deleteINR" list="inrEliminar" type="text" name="nombre" id="nombre" tabindex="1" aria-describedby="nombreHelp" class="text-uppercase form-control" placeholder="Nombre del INR" value="" required />
                            <datalist id="inrEliminar">
                                <option v-for="inr in inrs" :key="inr.nombre" v-bind:value="inr.nombre"> {{ inr.nombre }} </option>
                            </datalist>

                        </div>
                       
                        <div class="form-group w-75">
                            <div class="row justify-content-center">
                                <div class="col-sm-6 col-sm-offset-3">												
                                    <button type="reset" class="form-control btn btn-light"> Resetear </button>
                                </div>
                            </div>
                        </div>

                        <div class="form-group modal-footer">
                            <button type="button" class="form-control btn btn-secondary" data-dismiss="modal" id="cerrar" > Cancelar </button>
                            <button type="submit" id="eliminar" v-on:click="deleteAnINR(deleteINR)" variant="primary" name="inr-submit-delete" class="form-control btn btn-primary"> Eliminar </button>
                        </div>
					</form>

                </div>

                </div>
            </div>
        </div>
    

    <div id=inrWatch v-for="inr in pageOfItems" :key="inr.nombre">
    <button type="button" v-on:click="goINR(inr)" class="bg-light d-inline-flex bd-highlight border border-dark align-items-center mt-1 mb-4 ml-5 mr-5" style="width: 90%;"> 

            <div class="p-2 flex-row bd-highlight" style="min-width: 250px;text-align: left;">

                <div class="d-inline-flex flex-column bd-highlight ml-3 text-uppercase">
                
                    {{inr.nombre}}

                </div>

                <div class="flex-column bd-highlight ml-3 text-uppercase">
                
                    <img src="../assets/localizacion.png" alt="localización" class="img-responsive img-fluid" 
                    height="23" width="23"/> 

                    {{inr.localizacion}}        

                </div>

            </div>

            <div class="flex-row bd-highlight mb-3 pb-1">

                <div v-if="inr.gravedad === 'BAJO'" class="d-inline-flex flex-column bd-highlight border bg-success" style="height: 15px; width: 45px"></div>
                <div v-if="inr.gravedad === 'MEDIO'" class="d-inline-flex flex-column bd-highlight border bg-warning" style="height: 15px; width: 45px"></div>
                <div v-if="inr.gravedad === 'GRAVE'" class="d-inline-flex flex-column bd-highlight border bg-danger" style="height: 15px; width: 45px"></div>

            </div>

            <div class="p-2 flex-row bd-highlight justify-content-center" style="margin-left: 100px; min-width: 1000px;text-align: left;">

                <div class="flex-column bd-highlight text-truncate text-uppercase" style="max-width: 850px;">
                
                    {{inr.descripcion}}

                </div>

                <div class="flex-column bd-highlight ">
                
                    Número de afectados: {{inr.numAfectados}}, Tipo: {{inr.tipo}}

                </div>

            </div>

            <div class="p-2 flex-row bd-highlight align-self-end">

                <div class="flex-column bd-highlight justify-content-end" style="margin-left:130px;">
                
                    {{inr.fechaInicio.split('T')[0]}}

                </div>
            </div>

    </button>
    </div>

    <div class="card-footer bg-transparent border-0 mb-3 pb-0 pt-3">
            <jw-pagination v-if='showINRs === "normal"' :items="inrs" @changePage="onChangePage"></jw-pagination>
            <jw-pagination v-if='showINRs === "simulacros"' :items="simulacros" @changePage="onChangePage"></jw-pagination>
            <jw-pagination v-if='showINRs === "casosReales"' :items="casosReales" @changePage="onChangePage"></jw-pagination>
            <jw-pagination v-if='showINRs === "masGraves"' :items="masgrave" @changePage="onChangePage"></jw-pagination>
            <jw-pagination v-if='showINRs === "menosGraves"' :items="menosgrave" @changePage="onChangePage"></jw-pagination>
    </div>

</div>
</template>

<script>

const URL = "http://localhost:4000";

export default {
    name: 'InrInicio',
    data() {
        return{
            rol: localStorage.getItem("Rol"),
            inr: {
                nombre: "",
                localizacion: "",
                descripcion: "",
                gravedad: "",
                tipo: "",
                numAfectados: "",
                recursosNecesarios: [],
                tipoTerreno: [], 
                fechaInicio: '',
                fechaFin: '',
                recursoArray: [],
            },
            inrs: [],
            pageOfItems: [],
            nameOfINR: "",
            deleteINR: "",
            gravedades: [],
            tipos: [],
            recursos: [],
            terrenos: [],
            showINRs: "",
            simulacros: [],
            checked: "",
            casosReales: [],
            checked2: "",
            masgrave: [],
            menosgrave: [],
            medio: [],
            grave: [],
            bajo: [],
            
        };
    },
    async mounted (){
        await this.getINRs();
        await this.getGravedades();
        await this.getTipos();
        await this.getRecursos();
        await this.getTerrenos();
    },
    watch: {

        // inrs: function () {
        //     return this.getINRs();
        // },
        // gravedad: function () {
        //     return this.getGravedades();
        // },
        // tipo: function () {
        //     return this.getTipos();
        // },

    },

    methods: {

        async deleteAnINR(deleteINR){

            await this.axios
            .delete(URL + `/user/deleteINR/${deleteINR}`)
            
            .catch( e => {
            console.log(e.response);
            })
            this.deleteINR = '';

        },

        async changeDataINR(nameOfINR,inr){

            await this.axios
            .put(URL + `/user/changeDataINR/${nameOfINR}`, { inr })
            
            .catch( e => {
            console.log(e.response);
            })
            this.nameOfINR = '';
            this.inr = {};

        },
        
        onChangePage(pageOfItems) {

            // update page of items

            this.pageOfItems = pageOfItems;

        },

        goInicio() {
		
            $("#cerrar").click();
            $('.modal-backdrop').remove();
            location.reload();
            this.inr = {};
            
        },

        goINR(inr) {
            
            this.$store.commit("setINR", inr);
            this.$router.push("/documentos");
	    
        },

        onSubmit(evt) {

            evt.preventDefault();
            this.axios
                .post(URL + "/user/inr", this.inr)
                .then(res => {
                    console.log(res.data);
                    })
                .catch(e => {
                console.log(e.response);
                });
            
        },

        onReset(evt) {
            evt.preventDefault();
            // Reset our form values
            console.log(this.inr);
            this.inr.nombre = "";
            this.inr.localizacion = "";
            this.inr.gravedad = "";
            this.inr.tipo = "";
            this.inr.numAfectados = "";
            this.inr.recursosNecesarios = "";
            this.inr.tipoTerreno = "";
            this.inr.fechaInicio = "";
            this.inr.fechaFin = "";
            // Trick to reset/clear native browser form validation state
            this.show = false;
            this.$nextTick(() => {
                this.show = true;
            });
        },

        async getINRs(){

            this.showINRs = "normal";
            await this.axios
            .get("http://localhost:4000/user/showinrs")
            .then(res => {

            this.inrs = res.data;

            })
            .catch(err => {
            console.log(err);
            });
        },

        async getGravedades(){
            await this.axios
            .get(URL + "/user/getgravedad")
            .then(res => {

                this.gravedades = res.data;

            })
            .catch(err => {
            console.log(err);
            });
        },
        putNormal(){

            this.showINRs = "normal";
            $('#checkbox2').removeAttr('checked');
            $('#checkbox').removeAttr('checked');
            this.checked2 = false;
            this.checked = false;

        },
        
        fillGravedades(){

            this.inrs.forEach(element => {

                if (element.gravedad === "GRAVE" && !(this.grave.includes(element))){
                    this.grave.push(element);
                } else if (element.gravedad === "MEDIO" && !(this.medio.includes(element))){
                    this.medio.push(element);
                } else if (element.gravedad === "BAJO" && !(this.bajo.includes(element))){
                    this.bajo.push(element);
                }

            });
        },

        getMasGrave(){

            this.masgrave =  [];

            this.fillGravedades();
            
            this.grave.forEach(element => {
                this.masgrave.push(element);
            });
            this.medio.forEach(element => {
                this.masgrave.push(element);
            });

            this.bajo.forEach(element => {
                this.masgrave.push(element);
            });
            this.showINRs = "masGraves";


        },

        getMenosGrave(){

            this.menosgrave =  [];

            this.fillGravedades();

            this.bajo.forEach(element => {
                this.menosgrave.push(element);
            });
            
            this.medio.forEach(element => {
                this.menosgrave.push(element);
            });

            this.grave.forEach(element => {
                this.menosgrave.push(element);
            });
            this.showINRs = "menosGraves";



        },

        getSimulacros(){

            if((this.checked === false || this.checked === "") && (this.checked2 === true )){

                this.showINRs = "normal";
                $('#checkbox2').removeAttr('checked');
                $('#checkbox').removeAttr('checked');
                this.checked2 = false;

            } else if(this.checked === false || this.checked === ""){
               
               $('#checkbox').attr('checked');
                this.showINRs = "simulacros";

                this.inrs.forEach(element => {

                    if (element.tipo === "SIMULACRO" && !(this.simulacros.includes(element))){
                        this.simulacros.push(element);
                    }

                });

            } else {
                this.showINRs = "normal";

            }
        },  

        getCasosReales(){
            
            if((this.checked2 === false || this.checked2 === "") && (this.checked === true)){
                
                this.showINRs = "normal";
                $('#checkbox2').removeAttr('checked');
                $('#checkbox').removeAttr('checked');
                this.checked = false;

            } else if(this.checked2 === false || this.checked2 === ""){
                
                $('#checkbox2').attr('checked');
                this.showINRs = "casosReales";

                this.inrs.forEach(element => {

                    if (element.tipo === "CASO REAL" && !(this.casosReales.includes(element))){
                        this.casosReales.push(element);
                    }

                });

            } else {
                this.showINRs = "normal";
            }
        },  

        async getTipos(){
            await this.axios
            .get(URL + "/user/gettipo")
            .then(res => {

                this.tipos = res.data;

            })
            .catch(err => {
            console.log(err);
            });
        },

        async getRecursos(){
            await this.axios
            .get(URL + "/user/getrecursos")
            .then(res => {

                this.recursos = res.data;

            })
            .catch(err => {
            console.log(err);
            });
        },

        async getTerrenos(){
            await this.axios
            .get(URL + "/user/getterreno")
            .then(res => {

                this.terrenos = res.data;

            })
            .catch(err => {
            console.log(err);
            });
        },
        
    }
}
</script>
