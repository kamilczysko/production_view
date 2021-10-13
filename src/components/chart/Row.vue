<template>
  <tr v-on:contextmenu="onRightClick">
    <td class="label">{{barName}}</td>
    <td class="container">
      <Bar
        v-for="operation in getOperations"
        v-bind:key="operation.id"
        v-bind:operation="operation"
        v-bind:startTimestamp="startTimestamp"
        v-bind:endTimestamp="endTimestamp"
        v-bind:scaleFactor="scaleFactor"
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
    "rowId",
    "label",
    "scaleFactor",
    "startTimestamp",
    "endTimestamp",
  ],
  components: {
    Bar
  },
  computed: {
    barName() {
      return this.label
    },
    getOperations(){
      return this.operations.filter(a => a.rowId === this.rowId)
    }
  },
  methods: {
    onRightClick(event) {
      event.preventDefault()
      const selectedOperation = this.$store.state.selectedOperation
      this.$emit("modifyOperationEvent", {destinationId: this.rowId, operationToChange: selectedOperation})
    },
    onModifyOperationEvent(event){
      console.log("event: "+JSON.stringify(event))
      this.$emit("modifyOperationEvent", {destinationId: event.rowId, operationToChange: event})
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