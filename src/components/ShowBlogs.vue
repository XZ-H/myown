<template>
  <div v-theme:bkground="'wide'" id="show-blogs">
    <h1>博客总览</h1>
    <input type="text" v-model="search" placeholder="搜索" />
    <div v-for="blog in filterBlogs" class="single-blog">
      <router-link v-bind:to="'/blog/' + blog.id">
        <h2 v-rainbow>{{ blog.title | to-uppercase }}</h2>
      </router-link>
      <article>
        {{ blog.body | snippet-art }}
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: "show-blogs",
  data() {
    return {
      blogs: [],
      search: "",
    };
  },
  created() {
    this.$http.get("/static/posts.json").then(function (data) {
      this.blogs = data.body.slice(0, 10);
      // console.log(this.blogs);
    });
  },
  computed: {
    filterBlogs: function () {
      return this.blogs.filter((blog) => {
        return blog.title.match(this.search);
      });
    },
  },
  filters: {
    // 'snippet-art': function(value) {
    //   return value.slice(0, 50) + "...";
    // },
    snippetArt(value) {
      return value.slice(0, 50) + "...";
    },
  },
  directives: {
    rainbow: {
      bind(el, binding, vnode) {
        el.style.color = "#" + Math.random().toString(16).slice(2, 8);
      },
    },
  },
};
</script>

<style scoped>
#show-blogs {
  max-width: 800px;
  margin: 0 auto;
}

.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
  border: 1px dotted #aaa;
}

#show-blogs a{
  color: #444;
  text-decoration: none;
}

input[type='text']{
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
</style>
