<template>
  <div id="list-two">
    <h2>List Two</h2>
    <h4>lv</h4>
    <span>{{ love.name }}</span
    >---
    <span>{{ love.age }}</span>
    --
    <span>{{ love.sex }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      love: {},
    };
  },
  components: {},
  created() {
    this.love = this.$store.getters.getLover("lq");
  },
};
</script>

<style>
</style>
