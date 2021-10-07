<template>
  <div>
    <div class="bar">
      <p class="label">{{barName}}</p>
      <div class="bar--container">
        <Bar
          v-for="operation in operations"
          v-bind:key="operation.id"
          v-bind:operation="operation"
          v-bind:startTimestamp="startTimestamp"
          v-bind:endTimestamp="endTimestamp"
          v-bind:scaleCoef="scaleCoef"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Bar from "./Bar.vue";
export default {
  name: "row",
  props: [
    "operations",
    "mainParamName",
    "startTimestamp",
    "endTimestamp",
    "scaleCoef"
  ],
  components: {
    Bar
  },
  computed: {
    barName() {
      return this.operations[0][this.mainParamName];
    }
  }
};
</script>
<style>
.bar {
  display: flex;
  align-items: center;
}
.bar:hover {
  background-color:antiquewhite;
}
.label {
  min-width: 10vh;
  max-width: 10vh;
  position: sticky;
  left: 0px;
  z-index: 1000;
}
.bar--container {
  position: relative;
  /* overflow: scroll; */
}
</style>