<template>
  <b-container class="mt-5" style="width: 500px;">
    <b-card bg-variant="light">
      <h1 class="text-center">Login</h1>
      <hr />
      <b-form @submit="onSubmit" @reset="onReset">
        <b-container>
          <div class="d-flex align-items-center justify-content-center">
            <font-awesome-icon class="mr-3" size="lg" icon="envelope" fixed-width />
            <b-form-input
              id="input-1"
              v-model="userLogin.email"
              type="email"
              class="w-50"
              required
              placeholder="Introduzca email"
            ></b-form-input>
          </div>
        </b-container>
        <br />
        <b-container>
          <div class="d-flex align-items-center justify-content-center">
            <font-awesome-icon class="mr-3" size="lg" icon="key" fixed-width />
            <b-form-input
              id="input-2"
              class="w-50"
              v-model="userLogin.password"
              type="password"
              required
              placeholder="Introduzca password"
            ></b-form-input>
          </div>

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
        </b-container>

        <br />

        <div class="d-flex justify-content-center">
          <b-button type="submit" variant="primary" class="mx-3">Login</b-button>
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
      userLogin: {
        email: null,
        password: null
      },
      show: true,
      message: "",
      error: null,
      dataReady: false
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.axios
        .post("/signin", this.userLogin)
        .then(res => {
          if (res.data.token) {
            this.error = false;
            this.message = res.data.message;
            this.$store.commit("setEmail", res.data.email);
            this.$store.commit("setToken", res.data.token);
            this.$store.commit("islogIn");
            this.$router.push("/map");
          }
        })
        .catch(err => {
          this.error = true;
          this.message = err.response.data.message;
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.userLogin.email = "";
      this.userLogin.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  mounted() {
    this.dataready = true;
  }
};
</script>

<style>
.buttons {
  display: flex;
  justify-content: center;
}
</style>
