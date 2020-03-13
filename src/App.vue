<template>
  <div id="app">

    <router-view/>

    <div class="d-flex flex-row bd-highlight mb-3 ml-5 mr-5 pl-5 pr-5 align-items-center">
      
      <div class="p-2 bd-highlight font-weight-bold">
        
        <h3> INR's </h3>
        
      </div>

      <div id="nav">
        <router-link to="/">Inicio</router-link> |
        <router-link to="/documentos">Documentos</router-link> |
        <router-link to="/actividad">Actividad</router-link> |
        <router-link to="/busqueda">Búsqueda</router-link> |
        <router-link to="/sge112">SGE-112</router-link> |
        <router-link to="/capas">Capas</router-link>
      </div>

      <div class="bd-highlight align-self-">

        <h5> Filtros </h5>


      </div>

    </div>

   
    
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
