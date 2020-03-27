<template>
    
<div class="container h-100" style="margin-top:230px;">
    	<div class="row justify-content-center ">
			<div class="col-md-6 col-md-offset-3">
				<div class="panel panel-login">
					<div class="panel-heading">
						<div class="row justify-content-center">
							<div class="col-xs-6">
								<a href="#" class="active mr-3" id="login-form-link">Iniciar sesión</a> |
							</div>
							<div class="col-xs-6 ml-3">
								<a href="#" id="register-form-link">Regístrate ahora</a>
							</div>
						</div>
						<hr>
					</div>
					<div class="panel-body">
						<div class="row mt-2">
							<div class="col-lg-12">
								<form id="login-form" @submit1="onSubmit1" @reset1="onReset1" method="post" role="form" style="display: block;">
									<div class="d-inline-flex form-group w-75 justify-content-center">
										<input v-model="userRegister.usuario" type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Usuario" value="" required />
									</div>
									<div class="d-inline-flex form-group w-75 justify-content-center">
										<input v-model="userRegister.password" type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Contraseña" required />
									</div>
									<div class="form-group text-center">
										<input type="checkbox" tabindex="3" class="" name="remember" id="remember">
										<label class="pl-2" for="remember"> Recordarme</label>
									</div>
									<div class="form-group">
										<div class="row justify-content-center">
											<div class="col-sm-6 col-sm-offset-3">
												<!--<input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Iniciar sesión">-->
												<button type="submit" variant="primary" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" > Iniciar sesión </button>
												<!--<button type="reset" variant="danger" name="register-reset" id="register-reset" tabindex="4" class="form-control btn btn-light"> Resetear </button> -->

											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-lg-12">
												<div class="text-center">
													<a href="http://phpoll.com/recover" tabindex="5" class="forgot-password">¿Has olvidado tu contraseña?</a>
												</div>
											</div>
										</div>
									</div>
								</form>
								<!-- action="http://phpoll.com/register/process" -->
								<form id="register-form" @submit="onSubmit" method="post" role="form" style="display: none;">
									<div class="d-inline-flex form-group w-75 justify-content-center">
										<input v-model="userRegister.usuario" type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Usuario" value="" pattern="^[A-Za-z0-9_]{1,15}$" required />
									</div>
									<div class="d-inline-flex form-group w-75 justify-content-center">
										<input v-model="userRegister.email" type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Correo electronico" value="" pattern= "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required />
									</div>
									<div class="d-inline-flex form-group w-75 justify-content-center">
										<input v-model="userRegister.password" type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Contraseña" required />
									</div>
									<div class="d-inline-flex form-group w-75 justify-content-center">
										<input v-model="userRegister.confirmpassword" type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirmar contraseña" required />
									</div>
									<div class="form-group">
										<div class="row justify-content-center">
											<div class="col-sm-6 col-sm-offset-3">												
												<button type="submit" variant="primary" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" > Crear cuenta </button>
												<button type="reset" class="form-control btn btn-light"> Resetear </button>

											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</div>

</template>

<style scoped>
body {
    padding-top: 90px;
}
.panel-login {
	border-color: #ccc;
	-webkit-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
	-moz-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
	box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
}
.panel-login>.panel-heading {
	color: #00415d;
	background-color: #fff;
	border-color: #fff;
	text-align:center;
}
.panel-login>.panel-heading a{
	text-decoration: none;
	color: #666;
	font-weight: bold;
	font-size: 15px;
	-webkit-transition: all 0.1s linear;
	-moz-transition: all 0.1s linear;
	transition: all 0.1s linear;
}
.panel-login>.panel-heading a.active{
	color: #029f5b;
	font-size: 18px;
}
.panel-login>.panel-heading hr{
	margin-top: 10px;
	margin-bottom: 0px;
	clear: both;
	border: 0;
	height: 1px;
	background-image: -webkit-linear-gradient(left,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.15),rgba(0, 0, 0, 0));
	background-image: -moz-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
	background-image: -ms-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
	background-image: -o-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
}
.panel-login input[type="text"],.panel-login input[type="email"],.panel-login input[type="password"] {
	height: 45px;
	border: 1px solid #ddd;
	font-size: 16px;
	-webkit-transition: all 0.1s linear;
	-moz-transition: all 0.1s linear;
	transition: all 0.1s linear;
}
.panel-login input:hover,
.panel-login input:focus {
	outline:none;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	box-shadow: none;
	border-color: #ccc;
}
.btn-login {
	background-color: #59B2E0;
	outline: none;
	color: #fff;
	font-size: 14px;
	height: auto;
	font-weight: normal;
	padding: 14px 0;
	text-transform: uppercase;
	border-color: #59B2E6;
}
.btn-login:hover,
.btn-login:focus {
	color: #fff;
	background-color: #53A3CD;
	border-color: #53A3CD;
}
.forgot-password {
	text-decoration: underline;
	color: #888;
}
.forgot-password:hover,
.forgot-password:focus {
	text-decoration: underline;
	color: #666;
}

.btn-register {
	background-color: #1CB94E;
	outline: none;
	color: #fff;
	font-size: 14px;
	height: auto;
	font-weight: normal;
	padding: 14px 0;
	text-transform: uppercase;
	border-color: #1CB94A;
}
.btn-register:hover,
.btn-register:focus {
	color: #fff;
	background-color: #1CA347;
	border-color: #1CA347;
}
</style>

<script>

$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});


export default {
  data() {
    return {
	 userLogin: {
        usuario: "",
        password: "",
        checked: []
      },
      userRegister: {
        email: "",
        password: "",
		usuario: "",
		confirmpassword: "",
        checked: []
      },
      show: true
    };
  },
  methods: {
	onSubmit1(evt) {
      evt.preventDefault();
      this.axios
        .post("/signin", this.userLogin)
        .then(res => {
          if (res.data.token) {
            console.log(res.data);
            this.$store.commit("islogIn");
            this.$store.commit("setEmail", res.data.email);
            this.$store.commit("setToken", res.data.token);
            this.$router.push("/map");
          }
        })
        .catch(err => {
          console.log(err.response);
          onReset();
          this.$store.commit("isLogOut");
        });
    },
    onReset1(evt) {
      evt.preventDefault();
      // Reset our form values
      this.userLogin.email = "";
      this.userLogin.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
	})},
	  
    onSubmit(evt) {
	  evt.preventDefault();
	  if(this.userRegister.password === this.userRegister.confirmpassword){
      this.axios
        .post("/signup", this.userRegister)
        .then(res => {
          console.log(res.data);
        })
        .catch(e => {
          console.log(e.response);
		});
	  }else {
		  alert("Las contraseñas no coinciden");
		  console.log("Contraseñas no coinciden")
	  }

    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.userLogin.email = "";
	  this.userLogin.password = "";
	  this.userLogin.confirmpassword = "";
      this.userLogin.usuario = "";
      this.userLogin.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
