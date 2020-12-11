<template>
  <div id="app">
    <list-one></list-one>
    <list-two></list-two>
  </div>
</template>

<script>
import ListOne from "./components/ListOne.vue";
import ListTwo from "./components/ListTwo.vue";
export default {
  name: "App",
  components: { ListOne, ListTwo },
};
</script>

<style>
</style>
