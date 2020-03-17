<template>
        <div class="d-flex bd-highlight align-items-center justify-content-end mt-4 w-80 ml-5 mr-5 float-right" style="max-width:750px;">
          
          <div class="p-2 bd-highlight ml-4 font-weight-bold">
              <h5> Filtros </h5>
          </div>

          <div class="input-group-prepend mb-2 ml-3">
            <div class="input-group-text bg-white border-0">
              <input type="checkbox" aria-label="Fecha">
            </div>
          
              <div class="bd-highlight">
                <div class="dropdown float-right">

                  <button class="btn btn-secondary dropdown-toggle" style="color:black; background-color:white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Fecha
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                    <a class="dropdown-item" href="#"> Más reciente </a>
                    <a class="dropdown-item" href="#"> Más antiguo </a>               
                  </div>
                
                </div>
              </div>
          </div>
                      
          <div class="input-group-prepend mb-2 ml-3">
            <div class="input-group-text bg-white border-0">
              <input type="checkbox" aria-label="Gravedad">
            </div>
          
              <div class="bd-highlight">
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
          </div>

          <div class="p-2 bd-highlight ml-4">

          </div>

          <div class="p-2 bd-highlight ml-4">

          </div>

        </div>
    </div>
    
</template>

<script>
export default {
    name: 'FiltrosInicio'
}
</script>
