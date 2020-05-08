<template>
  <div class="busqueda">

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

          <div class="d-flex flex-row mt-5 justify-content-center">
            <form id="custom-search-form" class="form-search form-horizontal pull-right" role="form">
                <div class="input-append">
                    <input v-model="informacion" type="text" class="search-query pl-2 border border-dark mt-3" placeholder="Busque cualquier aportación o información del INR..." 
                      style="border-radius: 15px; width: 500px; height: 35px;">
                    <button v-on:click.prevent="searchInfo(informacion)" class="btn"><img src="../assets/busqueda.svg" alt="búsqueda" style="margin-left: -63px;"></button>
                </div>
            </form>
          </div>

          <div class="d-flex flex-row mt-4 justify-content-center">

           <div v-if="enseñar === true" class="bg-light d-inline-flex bd-highlight border border-dark" style="width: 70%;">

             <div class="p-2 text-left"> 
               <p> Título: {{ resConsulta.titulo }} </p>
               <p> Descripción: {{ resConsulta.descripcion }} </p>
               <p> Recursos:  {{ resConsulta.recursosAportacion.toString() }} </p>
               <p> Creado por:  {{ resConsulta.createdBy }} </p>
               <p> Fecha:  {{ resConsulta.date.split('T')[0] }} </p>

             </div>

           </div>

          </div>
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
  name: 'Busqueda',
  components: {
    Cabecera,
    Navegacion,
    DatosINR

  },
  async mounted (){
      await this.getAportaciones();
  },
  data () {
    
    return {
      informacion: "",
      resConsulta: [],
      aportaciones: [],
      aportacionesINR: [],
      inr: JSON.parse(localStorage.getItem("INR")),
      enseñar: false,



    };
  },
  methods: {

    async searchInfo(informacion) {

      for (var item in this.aportacionesINR){

        if(this.aportacionesINR[item].titulo === informacion.toUpperCase()){

          this.resConsulta = this.aportacionesINR[item];

        }
      }
      this.enseñar = true;      
    },

     async getAportaciones(){
        
        await this.axios
        .get(URL + "/user/showaportaciones")
        .then(res => {
          console.log(res.data);
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
     }

  }
}
</script>