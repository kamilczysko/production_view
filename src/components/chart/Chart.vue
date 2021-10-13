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
        <button>Save</button>
      </div>
    </div>
    <div class="table-container" v-on:mousemove="onMouseMovement" ref="tableContainer">
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
            v-bind:tableElement="$refs.tableContainer"
          />
        </thead>
        <tbody>
          <!-- <Row
            v-for="(row, rowId) in getRows"
            v-bind:key="rowId"
            v-bind:startTimestamp="startTimestamp"
            v-bind:endTimestamp="endTimestamp"
            v-bind:operations="groupedOperations[rowId]"
            v-bind:rowId="rowId"
            v-bind:label="row.rowTitle"
            v-bind:scaleFactor="scaleFactor"
            v-on:moveOperationEvent="onMoveOperationEvent"
          /> -->
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
          operationId: 1,
          startTimestamp: 1633204221,
          duration: 200,
          rowId: 1,
          additionalInfo: [
            { name: "Operation name", value: "Koszenie trawnika" }
          ]
        },
        {
          operationId: 2,
          startTimestamp: 1633205221,
          duration: 200,
          rowId: 1,
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
      return this.getGrouped(this.rows, "rowId");
    },
    getGroupedOperationsByRowId() {
      return this.getGrouped(this.operations, "rowId");
    },
    getTimestamps() {
      return this.operations.map(op => op.startTimestamp);
    }
  },
  methods: {
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
.table-container {
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