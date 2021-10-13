<template>
  <div>
    <Vue3DraggableResizable
      class="bar"
      :initW="op.duration*scaleCoef"
      :initH="20"
      v-model:x="x"
      v-model:y="y"
      v-model:w="w"
      v-model:h="h"
      :active="active"
      :draggable="true"
      :resizable="true"
      :disabledY="true"
      :disabledH="true"
      @drag-end="onDragEnd"
      @activated="onActive"
      @deactivated="onDeactive"
    >
      <div class="tooltip" v-bind:class="{invisible:mouseIsOff}">
        <p>Operation: {{op.operationName}}</p>
        <p>Station: {{op.stationName}}</p>
        <p>Number of elements: {{op.numberOfElements}}</p>
        <p>Start at: {{getTime((getStartTimeFromPosition*1000))}}</p>
        <p>Ends at: {{getTime((getEndTimeFromPosition)*1000)}}</p>
        <p>Duration: {{op.duration/60}} minutes</p>
      </div>
    </Vue3DraggableResizable>
  </div>
</template>

<script>
import Vue3DraggableResizable from "vue3-draggable-resizable";

export default {
  name: "bar",
  components: {
    Vue3DraggableResizable
  },
  props: ["operation", "startTimestamp", "endTimestamp", "scaleCoef"],
  data() {
    return {
      x: 0,
      y: 0,
      h: 0,
      w: this.getWidth,
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
  mounted() {
    this.x = this.getPosition
    this.w = this.getWidth
  },
  watch: {
    scaleCoef: {
      handler(newVal, oldVal) {
        this.getPos();
        this.getWidthAfterRezise();
      },
      deep: true,
      immediate: true,
    }},
  methods: {
    onDragEnd(){
        this.op.plannedStartTime = parseInt((this.x / this.scaleCoef) + this.startTimestamp)
        this.duration = parseInt(this.op.duration*this.scaleCoef)
    },
    getPos(){
      this.x = (this.op.plannedStartTime - this.startTimestamp) * this.scaleCoef
    },
    getWidthAfterRezise(){
      this.w = this.op.duration*this.scaleCoef
    },
    getTime(actualTime) {
      const time = new Date(actualTime);
      return (
        time.getUTCDate() +
        " / " +
        (time.getUTCMonth() + 1) +
        "-" +
        time.getHours() +
        ":" +
        time.getMinutes()
      );
    },onDeactive(){
     this.$store.commit("selectOperationToMove", {id: this.operation.id, stationId: this.stationId, startTime: this.getStartTimeFromPosition, endTime:this.getEndTimeFromPosition, duration: this.getDuration});
    },
    onDeactivate(){
    }
  },
  computed: {
    getPosition() {
      return (this.op.plannedStartTime - this.startTimestamp) * this.scaleCoef
    },
    getStartTimeFromPosition(){
      return parseInt((this.x / this.scaleCoef) + this.startTimestamp)
    },
    getEndTimeFromPosition(){
      return ((this.x+this.w) / this.scaleCoef) + this.startTimestamp
    },
    getDuration() {
      return this.w/this.scaleCoef
    },
    getWidth(){
      return this.op.duration*this.scaleCoef
    }
  }
  
};
</script>

<style>
.bar {
  z-index: 999;
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
  border: 0.5px solid black;
  width: fit-content;
  margin-top: 20px;
  padding: 5px;
  z-index: 5000;
  position: absolute;
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

