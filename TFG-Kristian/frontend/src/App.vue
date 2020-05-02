<template>
  <div id="app test">
    <div>
      <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-brand href="/">GeoCanCanarias</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-if="!returnLog" :to="{ name: 'login' }" exact>Login</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item v-if="!returnLog" :to="{ name: 'register' }">Registro</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item v-if="returnLog" :to="{ name: 'map' }">
              <font-awesome-icon size="lg" icon="map-marked" fixed-width />&nbsp;Mapa
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav v-if="returnLog" class="ml-auto">
            <b-nav-item :to="{ name: 'edit' }" class="mr-sm-2">
              <font-awesome-icon size="lg" icon="cog" fixed-width />
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav v-if="returnLog" right>
            <b-nav-item @click="logout">
              <font-awesome-icon size="lg" icon="sign-out-alt" fixed-width />
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit("islogIn");
      this.$router.push("/login");
    }
  },

  computed: {
    returnLog() {
      return this.$store.getters.getSession;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
