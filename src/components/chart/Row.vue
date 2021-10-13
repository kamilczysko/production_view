<template>
  <tr v-on:contextmenu="onClick">
    <td class="label">{{barName}}</td>
    <td class="container">
      <Bar
        v-for="operation in operations"
        v-bind:key="operation.id"
        v-bind:operation="operation"
        v-bind:startTimestamp="startTimestamp"
        v-bind:endTimestamp="endTimestamp"
        v-bind:scaleCoef="scaleCoef"
        v-on:onModifyOperationEvent="onModifyOperationEvent"
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
    "mainParamId",
    "endTimestamp",
    "scaleCoef",
    "background",
    "label"
  ],
  components: {
    Bar
  },
  computed: {
    barName() {
      return this.label
    }
  },
  methods: {
    onClick(event) {
      event.preventDefault()
      const op = this.$store.state.selectedOperation
      this.$emit("moveOperationEvent", {destinationId: this.label, operationToChange: op})
    },
    onModifyOperationEvent(event){
      this.$emit("moveOperationEvent", {destinationId: this.label, operationToChange: event})
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