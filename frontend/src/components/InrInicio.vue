<template>
<div>
    <div class="p-2 d-flex bd-highlight justify-content-end mr-5" style="height:50px;" v-if="rol === 'ADMIN'">

        <button type="button" data-toggle="modal" data-target="#exampleModalCenter" v-on:click="newINR" class="d-flex btn bg-light border border-dark" style="width:180px; height:36px;">
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
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>


    </div>

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
</div>
</template>

<script>
export default {
    name: 'InrInicio',
    data() {
        return{
            rol: this.$store.getters.getRole,
        };
    },

    methods: {
        
        newINR: function () {
		
          

        }
    }
}
</script>
