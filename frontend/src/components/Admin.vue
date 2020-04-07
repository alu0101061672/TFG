<template>
 <div class="d-inline-flex bd-highlight border border-dark" style="width: 1600px; height:627px;"> 
    
    <div class="d-flex flex-column ml-5">

        <div class="d-flex mt-5 align-items-center" style="width: 500px;">

            <div class="text-dark"> Eliminar usuarios </div>
            
            <div class="text-dark ml-3">

                <input v-model="usudel" list="usuariosEliminar" placeholder="Nombre de usuario"/>

                <datalist id="usuariosEliminar">
                    <option v-for="usuario in usuarios" :key="usuario.usuario" v-bind:value="usuario.usuario"> {{ usuario.usuario }} </option>
                </datalist>

            </div>

            <div class="text-dark ml-3">

                <button type="submit" v-on:click="eliminarUsuario(usudel)" class="btn btn-outline-dark" style="height:36px;" > Eliminar </button>    

            </div>
        </div>

        <div class="d-flex flex-column mt-5">

            <div class="d-flex align-items-center" style="width: 800px;">

                <div class="text-dark"> Cambiar rol a un usuario </div>

                <div class="text-dark ml-3">

                    <input v-model="usurol" list="usuariosCambiarRol" placeholder="Nombre de usuario"/>

                    <datalist id="usuariosCambiarRol">
                        <option v-for="usuarioCambiarRol in usuarios" :key="usuarioCambiarRol.usuario" v-bind:value="usuarioCambiarRol.usuario" > {{ usuarioCambiarRol.usuario }} </option>
                    </datalist>

                </div>

                <div class="text-dark ml-3">

                    <input v-model="rolChosen" list="usuariosRol" placeholder="Rol de usuario"/>

                    <datalist id="usuariosRol">
                        <option v-for="rol in roles" :key="rol" v-bind:value="rol"> {{ rol }} </option>
                    </datalist>

                </div>

                <div class="text-dark ml-3">

                    <button type="submit" v-on:click="changeRolUser(usurol,rolChosen)" class="btn btn-outline-dark" style="height:36px;" > Cambiar </button>    

                </div>

            </div>

        </div>
    </div>


 </div>
    
</template>

<script>
export default {
    name: 'Admin',
    data() {
        return{
            usuarios: [],
            roles: [],
            usudel: [],
            usurol: [],
            rolChosen: [],


        };
    },
    async mounted (){
        await this.getDataUser();
        await this.getRoleUser();
    },
    watch: {
        usudel: function () {
            return this.getDataUser();
        },
        usurol: function () {
            return this.getDataUser();
        },
        rolChosen: function () {
            return this.getRoleUser();
        },
    },
    methods: {

        async eliminarUsuario(usudel){

            await this.axios
            .delete(`http://localhost:4000/user/delete/${usudel}`)
            
            .catch( e => {
            console.log(e.response);
            })
            this.usudel = '';

        },
        async changeRolUser(usurol,rolChosen){

            await this.axios
            .put(`http://localhost:4000/user/changerol/${usurol}`, { role: rolChosen })
            
            .catch( e => {
            console.log(e.response);
            })
            this.usurol = '';
            this.rolChosen = '';

        },
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
        },
        async getRoleUser(){
            await this.axios
            .get("http://localhost:4000/user/getrole")
            .then(res => {

            this.roles = res.data;
            console.log(this.roles);

            })
            .catch(err => {
            console.log(err);
            });
        },

    }
}
</script>
