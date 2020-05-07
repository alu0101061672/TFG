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

    <div class="d-flex flex-column mt-5">

            <div class="d-flex align-items-center" style="width: 800px;">

                 <button type="button" data-toggle="modal" data-target="#addUser" class="d-flex btn bg-light border border-dark mr-2" style="width:; height:;">
                    <div class="d-flex ml-1"> Añadir un usuario nuevo </div>
                </button>

        <div class="modal fade" id="addUser" tabindex="-1" role="dialog" aria-labelledby="Añadir nuevo usuario" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered" role="document">
             <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Añadir nuevo usuario</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form id="userAdd-form" class="d-flex flex-column align-items-center" @submit="onSubmit" @reset="onReset" method="post" role="form">

                        <div class="form-group w-75">
							<input v-model="userRegister.usuario" type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Nombre de usuario" value="" pattern="^[A-Za-z0-9_]{1,15}$" required />
                        </div>
                        
                        <div class="form-group w-75">
							<input v-model="userRegister.email" type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Correo electronico" value="" pattern= "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required />
                        </div>

                        <div class="form-group w-75">
                            <input v-model="userRegister.role" list="roles" type="text" name="rolUsuario" id="rolUsuario" tabindex="1" class="form-control" placeholder="Rol del usuario" value="" required />
                            <datalist id="roles">
                                <option v-for="rol in roles" :key="rol" v-bind:value="rol"> {{ rol }} </option>
                            </datalist> 
                        </div>

                        <div class="form-group w-75">
							<input v-model="userRegister.password" type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Contraseña" required />
                        </div>

                        <div class="form-group w-75">
							<input v-model="userRegister.confirmpassword" type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirmar contraseña" required />
                        </div>

                        <div class="form-group w-75">
                            <div class="row justify-content-center">
                                <div class="col-sm-6 col-sm-offset-3">												
                                    <button type="reset" class="form-control btn btn-light"> Resetear </button>
                                </div>
                            </div>
                        </div>

                        <div class="form-group modal-footer">
                            <button type="button" class="form-control btn btn-secondary" data-dismiss="modal" id="cerrar" > Cancelar </button>
                            <button type="submit" class="form-control btn btn-register" variant="primary" id="addUser" name="addUser-submit"> Añadir </button>    

                        </div>
					</form>

                </div>
            </div>
         </div>
        </div>
                
    </div>
</div>

    <div class="d-flex mt-5 align-items-center" style="width: 500px;">
        <div class="text-dark"> Verificar usuarios </div>
                
        <div class="text-dark ml-3">

            <input v-model="usuNoVerificado" list="usuariosNoVerificados" placeholder="Usuario a verificar"/>

            <datalist id="usuariosNoVerificados">
                <option v-for="usuario in usuariosNoVerificados" :key="usuario.usuario" v-bind:value="usuario.usuario"> {{ usuario.usuario }} </option>
            </datalist>


        </div>

        <div class="text-dark ml-3">

                <button type="submit" v-on:click="changeVerificado(usuNoVerificado)" class="btn btn-outline-dark" style="height:36px;" > Verificar </button>    

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
            userRegister: {
                email: "",
                password: "",
                usuario: "",
                confirmpassword: "",
                role: "",
                verificado: true,
            },
            usuariosNoVerificados: [],
            usuNoVerificado: [],
            


        };
    },
    async mounted (){
        await this.getDataUser();
        await this.getRoleUser();
        await this.getNoVerificados();
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

        async getNoVerificados(){
            await this.axios
            .get("http://localhost:4000/user/shownoverificados")
            .then(res => {

            this.usuariosNoVerificados = res.data;

            })
            .catch(err => {
            console.log(err);
            });
        },
        async changeVerificado(usuNoVerificado){

            await this.axios
            .put(`http://localhost:4000/user/changeverificado/${usuNoVerificado}`)
            
            .catch( e => {
            console.log(e.response);
            })
            this.usuNoVerificado = '';


        },
        onSubmit(evt) {
            evt.preventDefault();
            if(this.userRegister.password === this.userRegister.confirmpassword){
            this.axios
                .post("http://localhost:4000/user/signupadmin", this.userRegister)
                .then(res => {
                console.log(res.data);
                this.$store.commit("setVerificado", res.data.verificado);
                })
                .catch(e => {
                console.log(e.response);
                });
            }else {
                alert("Las contraseñas no coinciden");
                console.log("Contraseñas no coinciden")
            }

            $("#cerrar").click();
            $('.modal-backdrop').remove();
            location.reload();
            this.userRegister = {};

        },
        onReset(evt) {
            evt.preventDefault();
            // Reset our form values
            this.userRegister.email = "";
            this.userRegister.password = "";
            this.userRegister.confirmpassword = "";
            this.userRegister.usuario = "";
            this.userRegister.role = "";
         
        },  

        // async addUser(usuadd){

        //     await this.axios
        //     .post(`http://localhost:4000/user/signup`)
            
        //     .catch( e => {
        //     console.log(e.response);
        //     })
        //     this.usuadd = '';

        // },

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
