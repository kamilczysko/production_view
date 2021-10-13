<template>
  <div>
    <Vue3DraggableResizable
      class="bar"
      :initW="localOperation.duration * scaleFactor"
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
      @drag-end="refreshBarState"
      @resize-end="refreshBarState"
      @deactivated="setSelectedBar"
    ></Vue3DraggableResizable>
  </div>
</template>

<script>
import Vue3DraggableResizable from "vue3-draggable-resizable";

export default {
  name: "bar",
  components: {
    Vue3DraggableResizable
  },
  props: ["operation", "startTimestamp", "endTimestamp", "scaleFactor"],
  data() {
    return {
      x: 0,
      y: 0,
      h: 0,
      w: 0,
      active: false,
      localOperation: {
        id: this.operation.id,
        rowId: this.operation.rowId,
        startTimestamp: this.operation.startTimestamp,
        duration: this.operation.duration,
        additionalInfo: this.operation.additionalInfo
      }
    };
  },
  mounted() {
    this.setXPos();
    this.setWidth();
  },
  watch: {
    scaleFactor: {
      handler(newVal, oldVal) {
        this.setXPos();
        this.setWidth();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    refreshBarState() {
      console.log("asdf: "+ JSON.stringify({
        id: this.operation.id,
        rowId: this.operation.rowId,
        startTimestamp: this.getStartTimestampFromPosition,
        duration: this.getDuration
      }))

      this.localOperation.startTimestamp = this.x / this.scaleFactor + this.startTimestamp
      this.duration = parseInt(this.localOperation.duration * this.scaleFactor);
      this.$emit("onModifyOperationEvent", {
        id: this.localOperation.id,
        rowId: this.localOperation.rowId,
        startTimestamp: this.getStartTimestampFromPosition,
        duration: this.getDuration
      });
    },
    setXPos() {
      this.x = (this.localOperation.startTimestamp - this.startTimestamp) * this.scaleFactor;
    },
    setWidth() {
      this.w = this.localOperation.duration * this.scaleFactor;
    },
    setSelectedBar() {
      this.$store.commit("selectOperationToMove", {
        id: this.localOperation.id,
        rowId: this.localOperation.rowId,
        startTimestamp: this.getStartTimestampFromPosition,
        duration: this.getDuration
      });
    }
  },
  computed: {
    getOperationId(){
      return this.localOperation.id
    },
    getRowId(){
      return this.localOperation.rowId;
    },
    getStartTimestampFromPosition() {
      return parseInt(this.x / this.scaleFactor + this.startTimestamp);
    },
    getEndTimestampFromPosition() {
      return (this.x + this.w) / this.scaleFactor + this.startTimestamp;
    },
    getDuration() {
      return this.w / this.scaleFactor;
    }
  }
};
</script>

<style>
.bar {
  z-index: 999;
  background: red;
  border-radius: 5px;
  border: 1px solid black;
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

