<template>

 <div class="d-flex flex-row bd-highlight pr-5 align-items-center" style="max-width:660px; margin-right: 200px;">
      
    <div class="p-2 bd-highlight font-weight-bold" style="color:black;">
        
        <h3> INR's </h3>
    
    </div>

    <div id="nav" >
        <router-link to="/inicio">Inicio</router-link> |
        <router-link to="/documentos">Documentos</router-link> |
        <router-link to="/actividad">Actividad</router-link> |
        <router-link to="/busqueda">Búsqueda</router-link> |
        <router-link to="/sge112">SGE-112</router-link> |
        <router-link to="/capas">Capas</router-link>
        
    </div>

 </div>

</template>

<script>
export default {
    name: 'Navegacion'
}
</script>
