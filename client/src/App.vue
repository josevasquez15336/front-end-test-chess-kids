<template>
  <router-view/>
</template>

<style lang="scss">
body{
    margin:0;
    background-color: #64A343;
    background-image: url("assets/background.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    min-height: 100%;
    }

#app {
  height: 100%;
  font-family: "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
@font-face {
  font-family: "LuckiestGuy";
  src: local("LuckiestGuy"),
   url(./fonts/LuckiestGuy-Regular.ttf) format("truetype");
}
</style>
