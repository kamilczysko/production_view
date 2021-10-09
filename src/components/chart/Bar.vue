<template>
  <div
    class="operationBar"
    v-bind:style="{
            'left': `${(op.plannedStartTime-this.startTimestamp)*scaleCoef}px`,
            'min-width': `${op.duration*scaleCoef}px`,'max-width': `${op.duration*scaleCoef}px`}"
    style="height: 20px; border-radius:5px; background: red; border: 1px solid black; margin-top:0px"
    v-on:mousedown="onClick"
    v-on:mouseover="mouseOver"
    v-on:mouseleave="mouseLeave"
    draggable="true"
    v-on:drag="drag"
    v-on:dragend="dragend"
  >
    <div class="tooltip" v-bind:class="{invisible:mouseIsOff}">
      <p>Operation: {{op.operationName}}</p>
      <p>Station: {{op.stationName}}</p>
      <p>Number of elements: {{op.numberOfElements}}</p>
      <p>Duration: {{op.duration/60}} minutes</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "bar",
  props: ["operation", "startTimestamp", "endTimestamp", "scaleCoef"],
  data() {
    return {
      startPosX: 0,
      mouseIsOff: true,
      op: {
        id: this.operation.id,
        operationName: this.operation.operationName,
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
    },
    drag(event) {
      this.op.plannedStartTime = event.pageX - this.startPosX;
    },
    dragend(event) {
      this.op.plannedStartTime = event.pageX - this.startPosX;
    },
    mouseOver(event) {
      this.mouseIsOff = false;
    },
    mouseLeave(event) {
      this.mouseIsOff = true;
    }
  }
};
</script>

<style>
.operationBar {
  position: absolute;
  z-index: 900;
}

.invisible {
    display: none;
}

.tooltip {
    white-space: nowrap;
    background: white;
    border: .5px solid black;
    width: fit-content;
    margin-top: 20px;
    padding: 5px;
    z-index: 1100;
}
</style>