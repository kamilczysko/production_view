<template>
  <div>
    <header>
      <h1>MyProduction</h1>
    </header>
    <main>
      <MenuList v-bind:items="menu" class="menu" />
      <router-view></router-view>
    </main>
    <footer>kw</footer>
  </div>
  
</template>

<script>
import MenuList from "./components/menu/MenuList.vue";
import menuData from "./MenuData.js"

export default {
  components: { MenuList },
  data: () => {
    return {
      menu: menuData
    };
  }
};
</script>

<style scoped>

header {
  background: #2c3e50;
}

header h1 {
  margin-top: 0px;
  margin-bottom: 0px;
  color: antiquewhite;
  text-align: left;
  margin-left: 10vh;
}
main {
  display: grid;
  grid-template-columns: 15% 85%;
}

nav {
  grid-column-start: 0;
}
</style>
