<template>
  <b-container class="mt-5" style="width: 500px;">
    <b-card bg-variant="light">
      <h1 class="text-center">Registro</h1>
      <hr />
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-container>
          <div class="d-flex align-items-center justify-content-center">
            <font-awesome-icon class="mr-3" size="lg" icon="envelope" fixed-width />
            <b-form-input
              id="input-1"
              v-model="userRegister.email"
              class="w-50"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </div>
        </b-container>
        <br />
        <b-container>
          <div class="d-flex align-items-center justify-content-center">
            <font-awesome-icon class="mr-3" size="lg" icon="key" fixed-width />
            <b-form-input
              id="input-2"
              v-model="userRegister.password"
              class="w-50"
              type="password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </div>
        </b-container>
        <br />
        <b-container>
          <div class="d-flex align-items-center justify-content-center flex-wrap">
            <font-awesome-icon class="mr-3" size="lg" icon="user" fixed-width />
            <b-form-input
              id="input-3"
              v-model="userRegister.displayName"
              type="text"
              class="w-50"
              required
              placeholder="Enter nickname"
            ></b-form-input>

            <div v-if="error == null"></div>
            <div v-else-if="error == true">
              <b-alert show variant="danger" class="mt-4">
                <span>{{message}}</span>
              </b-alert>
            </div>
            <div v-else-if="error == false">
              <b-alert show variant="success" class="mt-4">
                <span>{{message}}</span>
              </b-alert>
            </div>
          </div>
        </b-container>
        <div class="d-flex justify-content-center mt-3">
          <b-button type="submit" variant="primary" class="mx-3">Registro</b-button>
          <b-button type="reset" variant="danger" class="mx-3">Reset</b-button>
        </div>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      userRegister: {
        email: "",
        password: "",
        displayName: "",
        checked: []
      },
      show: true,
      error: null,
      message: ""
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.axios
        .post("/signup", this.userRegister)
        .then(res => {
          this.error = false;
          this.message = res.data.message;
          setInterval(async () => {
            this.$router.push("/login");
          }, 3000);
        })
        .catch(e => {
          this.error = true;
          if (e.response.data.message.includes("E11000")) {
            this.message = "El correo que indica ya está registrado";
          }
        });
    },
    onReset(evt) {
      evt.preventDefault();

      // Reset our form values
      this.userLogin.email = "";
      this.userLogin.name = "";
      this.userLogin.displayName = "";
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

<style >
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
