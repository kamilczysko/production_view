<template>
</template>

<script>
import Vue3DraggableResizable from "vue3-draggable-resizable";

export default {
  components: {
    Vue3DraggableResizable
  },
  data() {
    return {
      x: 100,
      y: 100,
      h: 100,
      w: 100,
      active: false
    };
  }
};
</script>

<style>
.parent {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 100px;
  left: 100px;
  border: 1px solid #000;
  user-select: none;
}
</style>