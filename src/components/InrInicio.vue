<template>
 <button type="button" class="bg-light d-inline-flex bd-highlight border border-dark align-items-center mt-4 ml-5 mr-5" style="width: 90%;"> 

        <div class="p-2 flex-row bd-highlight">

            <div class="d-inline-flex flex-column bd-highlight ml-3">
            
                Nombre INR

            </div>

            <div class="flex-column bd-highlight ml-4">
            
              <img src="../assets/localizacion.png" alt="localización" class="img-responsive img-fluid" 
              height="23" width="23"/> 

              Localización        

            </div>

        </div>

        <div class="flex-row bd-highlight mb-3 pb-1">

            <div class="d-inline-flex flex-column bd-highlight border bg-success" style="height: 15px; width: 45px">
            </div>

        </div>

        <div class="p-2 flex-row bd-highlight justify-content-center" style="margin-left: 100px;">

            <div class="d-inline-flex flex-column bd-highlight pl-2">
            
                Descripción

            </div>

            <div class="flex-column bd-highlight pl-5">
            
                Datos relevantes

            </div>

        </div>

        <div class="p-2 flex-row bd-highlight align-self-end" style="margin-left: 1100px;">

            <div class="flex-column bd-highlight justify-content-end">
            
                Fecha

            </div>
        </div>

</button>
    
</template>

<script>
export default {
    name: 'InrInicio'
}
</script>
