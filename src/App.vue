<template>
  <div id="app" class="bg">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
$test: red;
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  @extend .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  @extend .size;
}
.bg {
  color: $test;
}
</style>
