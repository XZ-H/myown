<template>
  <div id="home">
    <h1>this is home</h1>
    <button @click="logout">注销</button>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.commit("del_token");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>