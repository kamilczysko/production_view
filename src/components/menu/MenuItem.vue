<template>
  <li v-if="subitems.length" class="submenu">
    <a v-bind:class="{isActive:isActive}" v-on:click="click" class="link">
      <img v-bind:src="icon" />
      {{name}}
    </a>
    <ul v-if="isCollapsed" class="sublist">
      <menu-item v-for="subitem in this.subitems" v-bind:key="subitem.id" v-bind:item="subitem" />
    </ul>
  </li>
  <li v-else v-bind:class="{isActive:isActive}" v-on:clickedMenuItemEvent="isActive">
    <router-link :to="href" v-on:click="click" class="link">
      <img v-bind:src="icon" />
      {{name}}
    </router-link>
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
      isCollapsed: false,
      isChildSelected: false,
    };
  },
  methods: {
    click() {
      if(!this.hasChildrenSelected){
      this.$store.commit("setMenuItemActive", this.id);
      }
      this.isCollapsed = !this.isCollapsed;
    }
  },
  computed: {
    setActiveMenuItem() {
      return this.activeMenuItem;
    },
    isActive() {
      const id = this.$store.state.selectedMenuItem;
      const isActive = id === this.id;
      this.isChildSelected = this.subitems.filter(item => item.id === id);
      if (isActive && this.subitems.length && !this.isCollapsed) {
        return false;
      }
      if (this.isChildSelected.length) {
        return true;
      }
      return isActive;
    },
    hasChildrenSelected(){
      return this.isChildSelected.length;
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
  margin-right: 5px;
}

.link {
  margin-right: 0px;
  margin-top: 5px;
  margin-left: 10px;
  padding: 3px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.submenu {
  display: block;
}

.sublist {
  margin-left: 15px;
}

.submenu div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
}

.submenu .link {
  margin-top: 5px;
}

img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

a {
  text-decoration: none;
  color: crimson;
}
</style>