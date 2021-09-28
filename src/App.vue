<template>
  <div>
    <header>
      <h1>Title bar bitch</h1>
    </header>
    <main>
      <MenuList v-bind:items="menu" class="menu" />
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import MenuList from "./components/menu/MenuList.vue";
export default {
  components: { MenuList },
  data: () => {
    return {
      menu: [
        {
          name: "Magazine",
          id: 0,
          icon: "warehouse.svg",
          ref: "/start",
          subitems: []
        },
        {
          name: "Production",
          id: 1,
          icon: "manufacturing_black.svg",
          ref: "",
          subitems: [
            {
              name: "Production view",
              id: 11,
              icon: "conveyor-belt.svg",
              ref: "/element/21",
              subitems: []
            },
            {
              name: "Production planning",
              id: 12,
              icon: "planning.svg",
              ref: "/element/22",
              subitems: []
            }
          ]
        },
        {
          name: "Orders",
          id: 2,
          icon: "order.svg",
          ref: "/element/3",
          subitems: []
        },
        {
          name: "Workstations",
          id: 3,
          icon: "machine.svg",
          ref: "/element/4",
          subitems: []
        },
        {
          name: "Administration Panel",
          id: 4,
          icon: "settings.svg",
          ref: "/element/5",
          subitems: []
        }
      ]
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
}
main {
  display: grid;
  grid-template-columns: 20% 80%;
}

nav {
  grid-column-start: 0;
}
</style>
