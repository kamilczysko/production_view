<template>
  <!-- <div
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
    ref="container"
  >
    <div class="tooltip" v-bind:class="{invisible:mouseIsOff}">
      <p>Operation: {{op.operationName}}</p>
      <p>Station: {{op.stationName}}</p>
      <p>Number of elements: {{op.numberOfElements}}</p>
      <p>Start at: {{getTime((op.plannedStartTime*1000))}}</p>
      <p>Ends at: {{getTime((op.plannedStartTime+op.duration)*1000)}}</p>
      <p>Duration: {{op.duration/60}} minutes</p>
    </div>
  </div> -->
  
    <Vue3DraggableResizable
    class="bar"
      :initW="op.duration*scaleCoef"
      :initH="20"
      v-model:x="getPosition"
      v-model:y="y"
      v-model:w="w"
      v-model:h="h"
      v-model:active="active"
      :draggable="true"
      :resizable="true"
      :disabledY="true"
      :disabledH="true" ></Vue3DraggableResizable>
  
</template>

<script>
import Vue3DraggableResizable from 'vue3-draggable-resizable'

export default {
  name: "bar",
  components: {
    Vue3DraggableResizable
  },
  props: ["operation", "startTimestamp", "endTimestamp", "scaleCoef"],
  data() {
    return {
      x: 100,
      y: 0,
      h: 100,
      w: 100,
      active: false,
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
      
    },
    dragend(event) {
      this.op.plannedStartTime = this.op.plannedStartTime + (event.pageX - this.startPosX)/this.scaleCoef
    },
    mouseOver(event) {
      this.mouseIsOff = false;
    },
    mouseLeave(event) {
      this.mouseIsOff = true;
    },
    getTime(actualTime){
      const time = new Date(actualTime)
       return time.getUTCDate() + " / "+ (time.getUTCMonth() + 1 )+ "-" + time.getHours() + ":" + time.getMinutes()
    }
  },
  computed: {
    getPosition() {
      return (this.op.plannedStartTime-this.startTimestamp)*this.scaleCoef
    }
  }
};
</script>

<style>
.bar {
  z-index: 500000;
  background: red;
  border-radius: 5px;
}
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
    z-index: 11000;
}
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