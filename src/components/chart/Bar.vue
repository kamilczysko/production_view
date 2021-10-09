<template>
  <div
    class="operationBar"
    v-bind:style="{
            'left': `${(op.plannedStartTime-this.startTimestamp)*scaleCoef}px`,
            'min-width': `${op.duration*scaleCoef}px`,'max-width': `${op.duration*scaleCoef}px`}"
    style="height: 20px; border-radius:5px; background: red; border: 1px solid black; margin-top:0px"
    v-on:mousedown="onClick"
    draggable="true"
    v-on:drag="drag"
    v-on:dragend="dragend">

    
  </div>
</template>

<script>
export default {
  name: "bar",
  props: ["operation", "startTimestamp", "endTimestamp", "scaleCoef"],
  data() {
    return {
      startPosX: 0,
      op: {
        id: this.operation.id,
        name: this.operation.name,
        stationId: this.operation.stationId,
        stationName: this.operation.stationName,
        plannedStartTime: this.operation.plannedStartTime,
        realStartTime: this.operation.realStartTime,
        duration: this.operation.duration,
        realDuration: this.operation.realDuration,
        prepareTime: this.operation.prepareTime,
        endingTime: this.operation.endingTime,
        orderNumber: this.operation.orderNumber,
        numberOfElements: this.operation.numberOfElements,
        dependentOn: this.operation.dependentOn
      }
    };
  },
  methods: {
    onClick(event) {
      this.startPosX = event.pageX;
      console.log("start: " + this.startPosX);
    },
    drag(event) {
      this.op.plannedStartTime = event.pageX - this.startPosX;
    },
    dragend(event) {
      this.op.plannedStartTime = event.pageX - this.startPosX;
    }
  }
};
</script>

<style>
.operationBar {
  position: absolute;
}
</style>