<template>
<div>
    <div class="p-2 d-flex bd-highlight justify-content-end mr-5" style="height:50px;" v-if="rol === 'ADMIN'">

        <button type="button" data-toggle="modal" data-target="#exampleModalCenter" class="d-flex btn bg-light border border-dark" style="width:180px; height:36px;">
            <img src="../assets/añadir.svg" alt="añadir aportación" class="img-responsive img-fluid float-left" 
                height="25" width="25"/>
            <div class="d-flex ml-1"> Crear nuevo INR </div>
        </button>

        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                            
                            <!-- <datalist id="gravedades">
                                <option v-for="grav in gravedades" :key="grav" v-bind:value="grav"> {{ grav }} </option>
                            </datalist> -->
                            
                            <div><small id="gravedadHelp" class="form-text text-muted float-left ml-2"> Opciones: GRAVE, MEDIO, BAJO </small></div>

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
                            <input v-model="inr.recursosNecesarios" type="text" name="recursosNecesarios" id="recursosNecesarios" tabindex="2" class="text-uppercase form-control" placeholder="Recursos necesarios" required />
                        </div>

                        <div class="form-group w-75">
                            <input v-model="inr.tipoTerreno" type="text" name="tipoTerreno" id="tipoTerreno" tabindex="2" class="text-uppercase form-control" placeholder="Tipo de terreno" required />
                        </div>

                        <div class="form-group w-75">
                            <div>
                                <label for="FechaInicio"></label>
                                <b-form-datepicker id="FechaInicio" v-model="inr.fechaInicio" class="mb-2" today-button reset-button close-button locale="es" :date-format-options="{ year: 'numeric', month: 'long', day: '2-digit'}"></b-form-datepicker>
                            </div>
                        </div>

                        <div class="form-group w-75">
                            <div>
                                <label for="FechaFin"></label>
                                <b-form-datepicker id="FechaFin" v-model="inr.fechaFin" class="mb-2" today-button reset-button close-button locale="es" :date-format-options="{ year: 'numeric', month: 'long', day: '2-digit'}"></b-form-datepicker>
                            </div>
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
                            <button type="submit" id="save" v-on:click="goInicio" variant="primary" name="inr-submit" class="form-control btn btn-primary"> Guardar </button>
                        </div>
					</form>

                </div>

                </div>
            </div>
        </div>


    </div>

    <div id=inrWatch v-for="inr in pageOfItems" :key="inr.nombre">
    <button type="button" v-on:click="goINR" class="bg-light d-inline-flex bd-highlight border border-dark align-items-center mt-1 mb-4 ml-5 mr-5" style="width: 90%;"> 

            <div class="p-2 flex-row bd-highlight" style="min-width: 250px;text-align: left;">

                <div class="d-inline-flex flex-column bd-highlight ml-3">
                
                    {{inr.nombre}}

                </div>

                <div class="flex-column bd-highlight ml-3">
                
                    <img src="../assets/localizacion.png" alt="localización" class="img-responsive img-fluid" 
                    height="23" width="23"/> 

                    {{inr.localizacion}}        

                </div>

            </div>

            <div class="flex-row bd-highlight mb-3 pb-1">

                <div class="d-inline-flex flex-column bd-highlight border bg-success" style="height: 15px; width: 45px">
                </div>

            </div>

            <div class="p-2 flex-row bd-highlight justify-content-center" style="margin-left: 100px; min-width: 1000px;text-align: left;">

                <div class="flex-column bd-highlight">
                
                    {{inr.descripcion}}

                </div>

                <div class="flex-column bd-highlight">
                
                    Número de afectados: {{inr.numAfectados}}

                </div>

            </div>

            <div class="p-2 flex-row bd-highlight align-self-end" style="margin-left:;">

                <div class="flex-column bd-highlight justify-content-end">
                
                    {{inr.fechaInicio}}

                </div>
            </div>

    </button>
    </div>

    <div class="card-footer bg-transparent border-0 mb-3 pb-0 pt-3">
            <jw-pagination :items="inrs" @changePage="onChangePage"></jw-pagination>
    </div>

</div>
</template>

<script>

const URL = "http://localhost:4000";

export default {
    name: 'InrInicio',
    data() {
        return{
            rol: this.$store.getters.getRole,
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
            },
            inrs: [],
            pageOfItems: [],
            // gravedades: [],
            // tipos: [],
            // gravedad: [],
            // tipo: [],
        };
    },
    async mounted (){
        await this.getINRs();
        // await this.getGravedades();
        // await this.getTipos();
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
        
        onChangePage(pageOfItems) {

            // update page of items

            this.pageOfItems = pageOfItems;

        },

        goInicio: function () {
		
            $("#cerrar").click();
            $('.modal-backdrop').remove();
            location.reload();
            
        },

        goINR: function () {
		
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
            return this.getINRs();
            
            
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
            await this.axios
            .get("http://localhost:4000/user/showinrs")
            .then(res => {

            this.inrs = res.data;
            console.log(this.inrs);

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
                console.log(this.gravedades);

            })
            .catch(err => {
            console.log(err);
            });
        },

        async getTipos(){
            await this.axios
            .get(URL + "/user/gettipo")
            .then(res => {

                this.tipos = res.data;
                console.log(this.tipos);

            })
            .catch(err => {
            console.log(err);
            });
        },
        
    }
}
</script>
