<template>
  <li v-if="subitems.length" class="submenu">
    <div v-bind:class="{isActive:setActive}">
      <img v-bind:src="icon" />
      <a v-on:click="click">{{name}}</a>
    </div>
    <ul v-if="isCollapsed">
      <menu-item v-for="subitem in this.subitems" v-bind:key="subitem.id" v-bind:item="subitem" />
    </ul>
  </li>
  <li v-else v-bind:class="{isActive:setActive}" v-on:clickedMenuItemEvent="setActive">
    <img v-bind:src="icon" />
    <router-link :to="href" v-on:click="click">{{name}}</router-link>
  </li>
</template>
    
<script>
export default {
  name: "menu-item",
  props: ["item", "activeItem"],
  data() {
    return {
      id: this.item.id,
      name: this.item.name,
      href: this.item.ref,
      icon: require("@/assets/icons/menu/" + this.item.icon),
      subitems: this.item.subitems,
      isCollapsed: false
    };
  },
  methods: {
    click() {
      this.isCollapsed = !this.isCollapsed;
      this.$store.commit("setMenuItemActive", this.id);
    }
  },
  computed: {
    setActiveMenuItem() {
      return this.activeMenuItem;
    },
    setActive() {
      const id = this.$store.state.selectedMenuItem;
      const isActive = id === this.id;
      const isChildSelected = this.subitems.filter(item => item.id === id);
      if (isActive && this.subitems.length && !this.isCollapsed) {
        return false;
      }
      if (isChildSelected.length) {
        return true;
      }
      return isActive;
    }
  }
};
</script>

<style scoped>
.isActive {
  background: burlywood;
}

li {
  text-align: left;
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 7px;
  margin-left: 20px;
}

li li {
  margin-right: 0px;
  margin-top: 3px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.submenu {
  display: block;
}

.submenu div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 7px;
  padding-bottom: 7px;
}

img {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

a {
  text-decoration: none;
  color: crimson;
}
</style>