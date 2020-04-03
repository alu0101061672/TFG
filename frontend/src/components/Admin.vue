<template>
 <div class="d-inline-flex bd-highlight border border-dark" style="width: 1600px; height:627px;"> 
    
    <div class="d-flex flex-column ml-5">

        <div class="d-flex mt-5 align-items-center" style="width: 500px;">

            <div class="text-dark"> Eliminar usuarios </div>
            
            <div class="text-dark ml-3">

                <input v-model="identificador" list="usuariosEliminar" placeholder="Nombre de usuario"/>

                <datalist id="usuariosEliminar">
                    <option v-for="usuario in usuarios" :key="usuario._id" :value="usuario._id"> {{ usuario.usuario }} </option>
                </datalist>

            </div>

            <div class="text-dark ml-3">

                <button type="submit" v-on:click="eliminarUsuario(identificador)" class="btn btn-outline-dark" style="height:36px;" > Eliminar </button>    

            </div>
        </div>

        <div class="d-flex flex-column mt-5">

            <div class="d-flex align-items-center" style="width: 800px;">

                <div class="text-dark"> Cambiar rol a un usuario </div>

                <div class="text-dark ml-3">

                    <input list="usuariosCambiarRol" placeholder="Nombre de usuario"/>

                    <datalist id="usuariosCambiarRol">
                        <option v-for="usuarioCambiarRol in usuarios" v-bind:key = "usuarioCambiarRol.usuario" >  </option>
                    </datalist>

                </div>

                <div class="text-dark ml-3">

                    <input list="usuariosRol" placeholder="Rol de usuario"/>

                    <datalist id="usuariosRol">
                        <option v-for="rol in roles" v-bind:key = "rol.rol" >  </option>
                    </datalist>

                </div>

                <div class="text-dark ml-3">

                    <button type="button" class="btn btn-outline-dark" style="height:36px;" > Cambiar </button>    

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
            usuario: [],

        };
    },
    async mounted (){
        await this.getDataUser();
    },
    methods: {

        eliminarUsuario(id){

            this.axios.delete(`http://localhost:4000/user/delete/${id}`)
            .then(res => {
            let index = this.usuarios.findIndex( item => item._id === res.data._id )
            this.usuarios.splice(index, 1);

            this.showAlert();
            this.mensaje.texto = 'Usuario Eliminado!'
            this.mensaje.color = 'danger'
            })
            .catch( e => {
            console.log(e.response);
            })
            this.identificador = '';

        },
        async getDataUser(){
            await this.axios
            .get("http://localhost:4000/user/showall")
            .then(res => {

            this.usuarios = res.data;

            })
            .catch(err => {
            console.log(err);
            });
        }
    }
}
</script>
