<template>
  <nav>
    <h2>Menu</h2>
    <ul>
      <menu-item v-for="item in items" v-bind:key="item.id" v-bind:item="item" />
    </ul>
  </nav>
</template>

<script>
import MenuItem from "./MenuItem.vue";
export default {
  name: "menu-list",
  props: ["items"],
  components: {
    MenuItem
  },
  data: () => {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style>
main nav {
  background: antiquewhite;
  text-decoration: none;
  height: 100vh;
  resize: horizontal;
  overflow: auto;
}

ul {
  padding: 0px;
}

nav a:active {
  font-size: 0.95rem;
}

nav a:hover {
  font-weight: bold;
}

a {
  cursor: pointer;
}
</style>