<template>
  <div class="container">
    <h1 id="header" class="text">Portal de acceso</h1>
    <div class="parentButtons">
      <b-button class="myButton" variant="primary" href="/login">
        <span class="textButton">Login</span>
      </b-button>

      <b-button class="myButton" variant="primary" href="/register">
        <span class="textButton">Registro</span>
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap");

.img {
  position: absolute;
  z-index: -1;
  left: 17%;
}

.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.myButton {
  width: 16%;
  height: auto;
}

.parentButtons {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

#header {
  position: relative;
  bottom: 16%;
  display: flex;
  justify-content: center;
}

.textButton {
  font-family: "roboto", sans-serif;
  font-weight: 600;
}

.text {
  color: black;
  font-family: "roboto", sans-serif;
  font-size: 3.45rem;
}
</style>
