<template>
  <div id="list-one">
    <h2>List One</h2>
    <button @click="completeInfo">信息完善</button><br />
    <button @click="reduceAgeLimit">Be Younger!!</button>
    <h4>adults</h4>
    <ul>
      <li v-for="(adult, index) in adults" :key="index">
        <span>{{ adult.name }} -- {{ adult.age }} --{{ adult.sex }}</span>
      </li>
    </ul>
    <h4>students</h4>
    <ul>
      <li v-for="(student, index1) in students" :key="index1">
        <span
          >{{ student.name }} -- {{ student.age }} -- {{ student.sex }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  components: {},
  computed: {
    ...mapState({
      students: (state) => state.students,
    }),
    ...mapGetters({
      adults: "getAdults",
    }),
    // students(){
    //     return this.$store.state.students
    // }
    // adults() {
    //   return this.$store.getters.getAdults;
    // },
  },
  methods: {
    completeInfo: function () {
      this.$store.commit("completeInfo");
      //   console.log(this.$store.state.students);
    },
    // reduceAge: function () {
    //   this.$store.commit("reduceAge", 2);
    // },
    reduceAgeLimit: function () {
      this.$store.dispatch("reduceAgeLimit", 2);
    },
  },
  created() {
    // console.log(this.$store.getters.getAdults);
  },
};
</script>

<style>
</style>
