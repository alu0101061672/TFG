<template>
      <div class="d-flex justify-content-center">
        <div class="d-flex flex-row bd-highlight border border-dark justify-content-between align-items-center mt-5 w-100 ml-5 mr-5" id="cabecera">
          
          <div class="p-2 bd-highlight justify-content-start ml-4">
            
            <img src="../assets/logo.png" alt="logo" class="img-responsive img-fluid" 
              height="90" width="90"/>

          </div>

          <div class="p-2 bd-highlight">

            <h3 class="">SMC</h3>

          </div>

          <div class="p-2 bd-highlight" style="margin-right:-620px;">
<!-- 
            <img src="../assets/icono_perfil.png" alt="perfil" class="float-left" 
              height="55" width="55"/> -->
            <b-avatar variant="info" text="BV"></b-avatar>

            <div class="dropdown mr-5 float-right ml-2" style="height:36px;">

              <button class="btn btn-secondary dropdown-toggle" style="color:black; background-color:white;" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ perfil }}
              </button>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>

            </div>

          </div>

          <div class="p-2 bd-highlight">

            <button type="submit" v-on:click="logOut" class="btn btn-outline-danger mr-5" style="height:36px;" > Cerrar sesión </button>    
                       
          </div>

        </div>
    </div>
    
</template>

<script>
export default {
    name: 'Inicio',
    data() {
      return {
        sesion: this.$store.getters.getSession,
        perfil: this.$store.getters.getUsuario,

      };

    },

    methods: {
        
        logOut: function () {
          
          this.$store.commit("isLogOut");
          this.$router.push("/");

        }
    }

}
</script>
