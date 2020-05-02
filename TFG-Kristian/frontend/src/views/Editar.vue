<template>
  <b-container class="mt-5" style="width: 500px;">
    <b-card bg-variant="light">
      <h1 class="text-center">Información de la cuenta</h1>
      <hr />
      <b-form @submit="updateEventMongoose">
        <div class="d-flex justify-content-around align-items-center">
          <div>
            <font-awesome-icon icon="edit" />
          </div>
          <div style="width: 40%;" class="py-2">
            <input v-if="edit" v-model="userEdit.email" type="email" required />
            <span v-else>
              <b>{{ user.email }}</b>
            </span>
          </div>
        </div>
        <div class="d-flex justify-content-around align-items-center">
          <div>
            <font-awesome-icon icon="key" />
          </div>
          <div style="width: 40%;" class="py-2">
            <input v-if="edit" v-model="userEdit.password" type="password" required />
            <span v-else>
              <b>{{ user.password }}</b>
            </span>
          </div>
        </div>
        <div class="d-flex justify-content-around align-items-center">
          <div>
            <font-awesome-icon icon="user" />
          </div>
          <div style="width: 40%;" class="py-2">
            <input v-if="edit" v-model="userEdit.displayName" type="text" required />
            <span v-else>
              <b>{{ user.displayName }}</b>
            </span>
          </div>
        </div>
        <div class="d-flex justify-content-around">
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
        <div class="d-flex justify-content-around py-4">
          <div v-if="!edit">
            <b-button @click="editMode()" variant="dark">
              <font-awesome-icon icon="edit" />
            </b-button>
          </div>
          <div v-if="edit">
            <b-button type="submit" @click="editMode()" variant="danger">
              <font-awesome-icon icon="times" />
            </b-button>
          </div>

          <div v-if="edit">
            <b-button type="submit" variant="success">
              <font-awesome-icon icon="check" />
            </b-button>
          </div>
        </div>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        displayName: "",
        checked: []
      },
      error: null,
      message: null,
      userEdit: {
        email: "",
        password: "",
        displayName: "",
        checked: []
      },
      edit: false,
      show: false
    };
  },
  methods: {
    showinfo() {
      this.axios
        .get("/showinfo", {
          params: {
            email: this.$store.getters.getEmail
          }
        })
        .then(res => {
          this.user.email = res.data.user.email;
          this.user.displayName = res.data.user.displayName;
          this.user.password = res.data.user.password;
        })
        .catch(err => {
          this.message =
            "Hubo un problema con mostrar la información de su cuenta";
          this.error = true;
        });
    },
    editMode() {
      if (this.edit == true) {
        this.edit = false;
        this.message = null;
        this.error = null;
      } else this.edit = true;
    },
    async updateEventMongoose(evt) {
      evt.preventDefault();
      await this.axios
        .post("/edituser", this.userEdit)
        .then(res => {
          this.error = false;
          this.message = res.data.message;
        })
        .catch(e => {
          this.error = true;
          this.message = e.response;
          console.log(e.response);
        });
    }
  },

  async mounted() {
    this.$store.commit("islogIn");
    this.edit = false;
    await this.showinfo();
  }
};
</script>

<style>
.cardDimension {
  width: 40vw;
}
</style>
