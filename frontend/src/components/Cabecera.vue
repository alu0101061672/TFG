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
            <b-avatar variant="info"></b-avatar>

            <div class="dropdown mr-5 float-right ml-2" style="height:36px;">

              <button v-on:click="updateData()" class="btn btn-secondary dropdown-toggle" style="color:black; background-color:white;" type="button" id="usuariosActivos" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ perfil }}
              </button>

              <div class="dropdown-menu"  aria-labelledby="usuariosActivos">
                <h6 class="dropdown-header">Usuarios activos</h6>
                <a class="dropdown-item" v-for="usu in activeUsers" :key="usu.usuario" v-bind:value="usu.usuario"> {{ usu.usuario }} </a>
              </div>

            </div>

          </div>

          <div class="p-2 bd-highlight">

            <button type="button" v-on:click="logOut" class="btn btn-outline-danger mr-5" style="height:36px;" > Cerrar sesión </button>    
                       
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
        perfil: localStorage.getItem("Usuario"),
        usuarios: [],
        activeUsers: [],

      };

    },

    async mounted (){
        await this.getDataUser();
    },

    methods: {
      async getDataUser (){
        await this.axios
        .get("http://localhost:4000/user/showall")
        .then(res => {

          this.usuarios = res.data;

        })
        .catch(err => {
          console.log(err);
        });

      },

      async updateData() {
        
        this.getDataUser();
        this.activeUsers = [];


        this.usuarios.forEach(user => {
          if((user.activo === false) && (user.usuario != this.perfil) && !(this.activeUsers.includes(user)))
            this.activeUsers.push(user);
        });

      },
        
      async logOut() {

        await this.axios
          .put(`http://localhost:4000/user/logout/${this.perfil}`)
          
          .catch( e => {
            console.log(e.response);
          })
        
        //this.activeUsers.pop(this.perfil);
        this.$store.commit("isLogOut");
        this.$router.push("/");

      }
    }

}
</script>
