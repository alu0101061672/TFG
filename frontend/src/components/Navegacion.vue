<template>

 <div class="d-flex flex-row bd-highlight pr-5 align-items-center" style="max-width:790px;">
      
    <div class="p-2 bd-highlight font-weight-bold" style="color:black;">
        
        <h3> INR's </h3>
    
    </div>

    <div id="nav" v-if="rol === 'ADMIN'">
        <router-link to="/inicio">Inicio</router-link> |
        <router-link to="/documentos">Documentos</router-link> |
        <router-link to="/actividad">Actividad</router-link> |
        <router-link to="/busqueda">Búsqueda</router-link> |
        <router-link to="/sge112">SGE-112</router-link> |
        <router-link to="/capas">Mapa</router-link> |
        <router-link to="/administrador">Administrador</router-link>
        
    </div>

    <div id="nav" v-else>
        <router-link to="/inicio">Inicio</router-link> |
        <router-link to="/documentos">Documentos</router-link> |
        <router-link to="/actividad">Actividad</router-link> |
        <router-link to="/busqueda">Búsqueda</router-link> |
        <router-link to="/sge112">SGE-112</router-link> |
        <router-link to="/capas">Mapa</router-link>

        
    </div>

 </div>

</template>

<script>
export default {
    name: 'Navegacion',
    data() {
        return{
            usuarios: [],
            rol: this.$store.getters.getRole,
        };
    },
    async mounted (){
        await this.getDataUser();
    },
    // watch: {
    //     usu: function () {
    //         return this.getDataUser();
    //     }
    // },
    methods: {
        async getDataUser(){
            await this.axios
            .get("http://localhost:4000/user/showall")
            .then(res => {

            this.usuarios = res.data;
            console.log(this.usuarios);

            })
            .catch(err => {
            console.log(err);
            });
        }
    }

}
</script>
