<template>
  <div class="datosINR mt-3 mb-3">

      <div class="d-inline-flex flex-row float-left ml-3"> 

        <div class="text-dark "><u>Datos INR</u></div>
        
        <div v-if="inr.gravedad === 'BAJO'" class="bd-highlight border bg-success ml-3 mt-1" style="height: 15px; width: 45px"></div>
        <div v-if="inr.gravedad === 'MEDIO'" class="bd-highlight border bg-warning ml-3 mt-1" style="height: 15px; width: 45px"></div>
        <div v-if="inr.gravedad === 'GRAVE'" class="bd-highlight border bg-danger ml-3 mt-1" style="height: 15px; width: 45px"></div>

      </div>

      <br />

      <div class="d-inline-flex flex-row float-left ml-3" style="min-width: 370px;"> 
          
          <div class="text-dark"> Nombre: </div> 
          <div class="text-dark pl-1 mr-3 text-uppercase"> {{ JSON.parse(inr).nombre }} </div>

      </div>

      <br />

      <div class="d-inline-flex flex-row float-left ml-3"> 
          
          <div class="text-dark"> Descripción: </div> 
          <div class="text-dark pl-1 text-justify mr-3 text-uppercase text-break" style="max-width: 370px; min-width:370px;"> {{ JSON.parse(inr).descripcion }} </div>

      </div>

      <br />

      <div class="d-inline-flex flex-row float-left ml-3" style="min-width: 370px;"> 
          
          <div class="text-dark"> Tipo de INR: </div> 
          <div class="text-dark pl-1 mr-3 text-uppercase"> {{ JSON.parse(inr).tipo }} </div>

      </div>

      <br />

      <div class="d-inline-flex flex-row float-left ml-3" style="min-width: 370px;"> 
          
          <div class="text-dark"> Fecha de inicio: </div> 
          <div class="text-dark pl-1 pr-1 mr-1 text-uppercase"> {{ JSON.parse(inr).fechaInicio.split('T')[0] }} </div> |
          <div><img src="../assets/date.svg" alt="date" class=" ml-1 img-responsive img-fluid" 
                height="20" width="20"/>
          </div> 

      </div>

        <br />

      <div class="d-inline-flex flex-row float-left ml-3" style="min-width: 370px;"> 
          
          <div class="text-dark"> Fecha de finalización: </div> 
          <div class="text-dark pl-1 pr-1 mr-1 text-uppercase"> {{ JSON.parse(inr).fechaFin.split('T')[0] }} </div> | 
          <div><img src="../assets/date.svg" alt="date" class=" ml-1 img-responsive img-fluid" 
                height="20" width="20"/>
          </div>

      </div>

        <br />

      <div class="d-inline-flex flex-row float-left ml-3" style="min-width: 370px;"> 
          
          <div class="text-dark"> Localización: </div> 
          <div class="text-dark pl-1 mr-3 text-uppercase"> {{ JSON.parse(inr).localizacion }} </div> 

      </div>

        <br />

      <div class="d-inline-flex flex-row float-left ml-3" style="min-width: 370px;"> 
          
          <div class="text-dark"> Número de afectados: </div> 
          <div class="text-dark pl-1 mr-3"> {{ JSON.parse(inr).numAfectados }} </div> 

      </div>

      <br /> 

      <div class="d-inline-flex flex-row float-left ml-3" style="min-width: 370px;"> 
          
          <div class="text-dark text-break" style="min-width:155px;"> Recursos necesarios: </div> 
          <div class="text-dark pl-1 text-justify mr-3 text-uppercase text-break" style="min-width:300px;"> 
                {{ JSON.parse(inr).recursoArray.toString() }}

            <!-- <div class="dropdown">

              <button class="btn btn-secondary dropdown-toggle pl-1 pr-1 p-0 important!" style="color:black; background-color:white;" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ inr.recursosNecesarios }}
              </button>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>

            </div> -->
              
          </div> 

      </div>

      <br /> 

      <div class="d-inline-flex flex-row float-left ml-3" style="min-width: 370px;"> 
          
          <div class="text-dark"> Tipo de terreno afectado: </div> 
          <div class="text-dark pl-1 mr-3 text-uppercase"> 
              {{ JSON.parse(inr).tipoTerreno }}
            <!-- <div class="dropdown">

              <button class="btn btn-secondary dropdown-toggle pl-1 pr-1 p-0 important!" style="color:black; background-color:white;" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ inr.tipoTerreno }}
              </button>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>

            </div> -->

          </div> 

      </div>

      <!-- <div class="d-inline-flex flex-column bd-highlight border-dark border border-top-0 mt-2" style="width: 499px;">
      </div> -->

  </div>
</template>

<script>

export default {
  name: 'DatosINR',
    data() {
      return {
        inr: localStorage.getItem("INR"),
       
      };

    },

}
</script>