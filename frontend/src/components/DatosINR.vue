<template>
  <div class="datosINR mt-3">

      <div class="d-inline-flex flex-row float-left ml-3"> 

        <div class="text-dark "><u>Datos INR</u></div>
        
        <div v-if="inr.gravedad === 'BAJO'" class="bd-highlight border bg-success ml-3 mt-1" style="height: 15px; width: 45px"></div>
        <div v-if="inr.gravedad === 'MEDIO'" class="bd-highlight border bg-success ml-3 mt-1" style="height: 15px; width: 45px"></div>
        <div v-if="inr.gravedad === 'GRAVE'" class="bd-highlight border bg-success ml-3 mt-1" style="height: 15px; width: 45px"></div>


      </div>

      <br />

      <div class="d-inline-flex flex-row float-left ml-3"> 
          
          <div class="text-dark"> Descripción: </div> 
          <div class="text-dark pl-1"> {{ inr.descripcion }} </div>

      </div>

      <br />

      <div class="d-inline-flex flex-row float-left ml-3"> 
          
          <div class="text-dark"> Fecha de inicio: </div> 
          <div class="text-dark pl-1 pr-1"> {{ inr.fechaInicio }} </div> |
          <div><img src="../assets/date.svg" alt="date" class=" ml-1 img-responsive img-fluid" 
                height="20" width="20"/>
          </div> 

      </div>

        <br />

      <div class="d-inline-flex flex-row float-left ml-3"> 
          
          <div class="text-dark"> Fecha de finalización: </div> 
          <div class="text-dark pl-1 pr-1"> {{ inr.fechaFin }} </div> | 
          <div><img src="../assets/date.svg" alt="date" class=" ml-1 img-responsive img-fluid" 
                height="20" width="20"/>
          </div>

      </div>

        <br />

      <div class="d-inline-flex flex-row float-left ml-3"> 
          
          <div class="text-dark"> Zona afectada: </div> 
          <div class="text-dark pl-1"> {{ inr.localizacion }} </div> 

      </div>

        <br />

      <div class="d-inline-flex flex-row float-left ml-3"> 
          
          <div class="text-dark"> Número de afectados: </div> 
          <div class="text-dark pl-1"> {{ inr.numAfectados }} </div> 

      </div>

      <br /> <br />

      <div class="d-inline-flex flex-row float-left ml-3"> 
          
          <div class="text-dark"> Recursos necesarios: </div> 
          <div class="text-dark pl-1"> 

            <div class="dropdown">

              <button class="btn btn-secondary dropdown-toggle pl-1 pr-1 p-0 important!" style="color:black; background-color:white;" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Guardia civil
              </button>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>

            </div>
              
          </div> 

      </div>

      <br /> <br />

      <div class="d-inline-flex flex-row float-left ml-3"> 
          
          <div class="text-dark"> Tipo de terreno afectado: </div> 
          <div class="text-dark pl-1"> 
              
            <div class="dropdown">

              <button class="btn btn-secondary dropdown-toggle pl-1 pr-1 p-0 important!" style="color:black; background-color:white;" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Terrestre
              </button>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>

            </div>

          </div> 

      </div>

  </div>
</template>

<script>

export default {
  name: 'DatosINR',
    data() {
      return {
        inr: this.$store.getters.getINR,
       
      };

    },

}
</script>