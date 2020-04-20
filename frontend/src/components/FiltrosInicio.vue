<template>
        <div class="d-flex flex-row bd-highlight align-items-center pl-5 float-right" style="max-width:750px;">
          
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
                <a class="dropdown-item" href="#"> Más grave </a>
                <a class="dropdown-item" href="#"> Menos grave </a>               
              </div>
            
            </div>
          </div>

          <div class="input-group-prepend mb-2 ml-3">
            <div class="input-group-text bg-white border-0">
              <input type="checkbox" aria-label="Gravedad">
            </div>
              <div class="bd-highlight" >
                Simulacros
              </div>
          </div>

          <div class="input-group-prepend mb-2 ml-3">
            <div class="input-group-text bg-white border-0">
              <input type="checkbox" aria-label="Gravedad">
            </div>
          
              <div class="bd-highlight">
                Casos reales
              </div>
          </div>

    </div>
    
</template>

<script>
export default {
    name: 'FiltrosInicio'
}
</script>
