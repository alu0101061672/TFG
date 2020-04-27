<template>
  <div class="sge112">

    <Cabecera/>

    <div class="d-inline-flex">
      <Navegacion /> 
    </div>

    <div>
      <div class="d-inline-flex bd-highlight ml-5 mr-5"> 

        <div class="p-2 flex-row bd-highlight">

            <div class="d-inline-flex flex-column bd-highlight border border-dark" style="width: 500px; height: 627px;">
              <DatosINR />
            </div>

        </div>

        <div class="flex-row bd-highlight border border-dark mt-2" style="width: 1100px; height:627px;">

          <table class="table">
            <thead class="table-light">
              <br>
              <tr>
                <th scope="col">Clasificación</th>
                <th scope="col">Cola</th>
                <th scope="col">Nombre</th>
                <th scope="col">Observaciones</th>
              </tr>
            </thead>
            <tbody class="table-borderless">
              <br>
              <tr>
                <td>SANIDAD</td>
                <td>0</td>
                <td>SUSANA</td>
                <td>PERSONA CONSCIENTE CON MAREO</td>
              </tr>
              <br>
              <tr>
                <td>SEGURIDAD: GUARDIA CIVIL</td>
                <td>1</td>
                <td>RODRIGO</td>
                <td>PELEA DE DOS PERSONAS EN LA CALLE</td>
              </tr>
              <br>
              <tr>
                <td>SEGURIDAD: ACCIDENTE DE TRAFICO</td>
                <td>0</td>
                <td>MARTA</td>
                <td>TF-1 TUNELES GUIMAR MOTO-COCHE</td>
              </tr>
              <br>
              <tr>
                <td>SEGURIDAD: POLICIA LOCAL</td>
                <td>2</td>
                <td>JOSUE</td>
                <td>PERRO ABANDONADO EN LA ESPERANZA</td>
              </tr>
              <br>
              <tr>
                <td>SEGURIDAD: VIOLENCIA NO FISICA</td>
                <td>0</td>
                <td>PEDRO</td>
                <td>MALTRATO VERBAL EN VIA PUBLICA</td>
              </tr>
              <br>
              <tr>
                <td>SEGURIDAD: MULTIDISCIPLINAR</td>
                <td>0</td>
                <td>SOFIA</td>
                <td>BEBE ABANDONADO AV. TRINIDAD</td>
              </tr>
              <br>
              <tr>
                <td>SEGURIDAD: POLICIA LOCAL</td>
                <td>3</td>
                <td>EDUARDO</td>
                <td>DISTURBIO EN VIA PUBLICA</td>
              </tr>
              <br>
            </tbody>
          </table>

        </div>

      </div>
    
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Cabecera from '@/components/Cabecera.vue'
import Navegacion from '@/components/Navegacion.vue'
import DatosINR from '@/components/DatosINR.vue'

export default {
  name: 'Sge112',
  components: {
    Cabecera,
    Navegacion,
    DatosINR
  }
}
</script>