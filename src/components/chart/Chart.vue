<template>
  <div>
    <div class="controlButtons">
      <div class="scaleButtons">
        <span>Scale</span>
        <div>
          <button v-on:click="scaleUp">+</button>
          <button v-on:click="scaleDown">-</button>
        </div>
      </div>
      <div class="refreshButton">
        <button v-on:click="refresh">
          <img src="https://img.icons8.com/ios-glyphs/30/000000/refresh--v2.png" />
        </button>
      </div>
      <div class="saveButton">
        <button><img src="https://img.icons8.com/ios-glyphs/30/000000/save--v1.png"/></button>
      </div>
    </div>
    <div class="tableContainer" v-on:mousemove="onMouseMovement" ref="tableContainer">
      <table>
        <thead>
          <tr class="tableHeader">
            <th class="selection"></th>
            <th style="width:100%; text-align:center">Timeline</th>
          </tr>
          <Timeline
            v-bind:timestamps="getTimestamps"
            v-bind:startTimestamp="startTimestamp"
            v-bind:endTimestamp="endTimestamp"
            v-bind:scaleFactor="scaleFactor"
            v-bind:timelineCursor="timelineCursor"
            v-bind:tableElement="$refs.tableContainer"/>
        </thead>
        <tbody>
          <Row
            v-for="(row, index) in getRows"
            v-bind:key="index"
            v-bind:startTimestamp="startTimestamp"
            v-bind:endTimestamp="endTimestamp"
            v-bind:operations="getOperationsByRowId(row.rowId)"
            v-bind:rowId="row.rowId"
            v-bind:label="row.rowTitle"
            v-bind:scaleFactor="scaleFactor"
            v-on:modifyOperationEvent="onModifyOperationEvent"/>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Row from "./Row.vue";
import Timeline from "./Timeline.vue";

export default {
  name: "chart",
  components: {
    Timeline,
    Row
  },
  data: () => {
    return {
      scaleFactor: 0.1,
      operations: [
        {
          id: 1,
          startTimestamp: 1633204221,
          duration: 200,
          rowId: 1,
          additionalInfo: [
            { name: "Operation name", value: "Koszenie trawnika" }
          ]
        },
        {
          id: 2,
          startTimestamp: 1633205221,
          duration: 400,
          rowId: 2,
          additionalInfo: []
        }
      ],
      rows: [
        { rowId: 1, rowTitle: "kosiarka" },
        { rowId: 2, rowTitle: "kibel" },
        { rowId: 3, rowTitle: "pralka" },
        { rowId: 4, rowTitle: "młotek" }
      ],
      startTimestamp: 0,
      endTimestamp: 0,
      groupedOperations: [],
      timelineCursor: 0
    };
  },
  created() {
    this.startTimestamp = this.getStartTimestamp(this.operations);
    this.endTimestamp = this.getEndTimestamp(this.operations);
    this.groupedOperations = this.getGroupedOperationsByRowId;
  },
  computed: {
    getRows() {
      return this.rows
    },
    getTimestamps() {
      return this.operations.map(op => op.startTimestamp);
    }
  },
  methods: {
    refresh(){
      this.$forceUpdate()
    },
    getOperationsByRowId(rowId){
      return this.operations.filter(a => a.rowId === rowId)
    },
    scaleUp() {
      this.scaleFactor += 0.05;
    },
    scaleDown() {
      this.scaleFactor += 0.05;
    },
    getStartTimestamp(operations) {
      return operations.sort((a, b) => {
        return a.startTimestamp - b.startTimestamp;
      })[0].startTimestamp;
    },
    getEndTimestamp(operations) {
      const result = operations.sort((a, b) => {
        return (
          b.plannedStartTime + b.duration - (a.plannedStartTime + a.duration)
        );
      })[0];
      return result.startTimestamp + result.duration;
    },
    getGrouped(list, key) {
      return list.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    },
    onMouseMovement(event) {
      const ROW_TITLE_WIDTH = 10;
      const tab = this.$refs.tableContainer;
      this.timelineCursor =
        event.pageX +
        tab.scrollLeft -
        tab.getBoundingClientRect().x -
        Math.round((ROW_TITLE_WIDTH * window.innerWidth) / 100);
    },
    onModifyOperationEvent(event){
      let foundOperation = this.operations.filter(op => op.id === event.operationToChange.id);
      if (foundOperation) {
        foundOperation[0].rowId = event.destinationId;
        foundOperation[0].startTimestamp = event.operationToChange.startTimestamp;
        foundOperation[0].duration = event.operationToChange.duration;
      }
    }
  }
};
</script>

<style>
table {
  border-collapse: collapse;
}
button {
  height: 25px;
}
th {
  text-align: center;
}
.tableContainer {
  overflow-x: scroll;
}
thead,
tbody {
  display: block;
}
thead {
  width: 100vw;
  position: sticky;
  top: 0px;
  background: white;
  z-index: 1000;
}
.rowContainer {
  margin-top: 10vh;
  display: inline-block;
  white-space: nowrap;
  width: calc(100% + 40px);
}
.scaleButtons {
  display: flex;
  width: 10vw;
  text-align: center;
  align-items: center;
  flex-direction: column;
  position: sticky;
  left: 20px;
}

.tableHeader {
  width: 100vw;
  background-color: blanchedalmond;
}
.controlButtons {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.scaleButtons div {
  display: flex;
  align-content: center;
  align-items: center;
  margin-bottom: 10px;
}

button {
  border: none;
  padding: 0.25em 0.8em;
  background: none;
  font-size: 20px;
  font-weight: bolder;
}

button:hover {
  color: red;
}

button:active {
  color: blue;
  font-size: 1.1rem;
}

.selection {
  position: sticky;
  left: 0px;
}
</style>