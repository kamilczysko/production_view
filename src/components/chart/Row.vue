<template>
  <tr v-bind:class="{background : isOddKey}">
    <td class="label">{{barName}}</td>
    <td class="container">
      <Bar
        v-for="operation in operations"
        v-bind:key="operation.id"
        v-bind:operation="operation"
        v-bind:startTimestamp="startTimestamp"
        v-bind:endTimestamp="endTimestamp"
        v-bind:scaleCoef="scaleCoef"
      />
    </td>
  </tr>
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
    "scaleCoef",
    "background"
  ],
  components: {
    Bar
  },
  computed: {
    barName() {
      return this.operations[0][this.mainParamName];
    },
    isOddKey() {
      console.log(this.background);
      return this.background % 2 == 1;
    }
  }
};
</script>
<style>
td {
  height: 40px;
}
tr {
  border-top: 0.5px solid black;
  width: 100vw;
}
tr .label {
}
.label {
  min-width: 10vw;
  max-width: 10vw;
  position: sticky;
  left: 0px;
  background-color: cornsilk;
  z-index: 1000;
}
.container {
  position: relative;
  display: flex;
  align-items: center;
  width: 90vw;
}
.background {
  background: wheat;
}
</style>