<template>
  <div>
    <div class="controlButtons">
      <div class="scaleButtons">
        <span>scale</span>
        <div>
          <button v-on:click="scaleUp">+</button>
          <button v-on:click="scaleDown">-</button>
        </div>
      </div>
      <div class="refreshButton">
        <button>
          <img src="https://img.icons8.com/ios-glyphs/30/000000/refresh--v2.png" />
        </button>
      </div>

      <div class="saveButton">
        <button>Save</button>
      </div>
    </div>
    <div class="table-container" v-on:mousemove="mousemoveEvent" ref="container">
      <table>
        <thead>
          <tr class="tableHeader">
            <th class="selection">
              <select name="chartSelection" id="chartSelection" v-model="selected">
                <option value="operationName">Operation</option>
                <option value="stationName">Station</option>
              </select>
            </th>
            <th style="width:100%; text-align:center">Timeline</th>
          </tr>

          <Timeline
            v-bind:operations="getOperations"
            v-bind:startTimestamp="startTimestamp"
            v-bind:endTimestamp="endTimestamp"
            v-bind:scaleCoef="scaleCoef"
            v-bind:timelineCursor="timeLineCursor"
            v-bind:tableElement="$refs.container"
          />
        </thead>
        <tbody>
          <Row
            v-for="(operations, index) in groupOperations"
            v-bind:key="index"
            v-bind:background="index"
            v-bind:operations="operations"
            v-bind:mainParamName="getSelectedParamName"
            v-bind:mainParamId="getSelectedParamId"
            v-bind:startTimestamp="startTimestamp"
            v-bind:label="index"
            v-bind:endTimestamp="endTimestamp"
            v-bind:scaleCoef="scaleCoef"
            v-on:moveOperationEvent="onMoveOperationEvent"
          />
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
      selected: "stationName",
      operations: [
        {
          id: 1,
          operationName: "test1",
          stationId: 3,
          stationName: "frezarka",
          plannedStartTime: 1633204221,
          realStartTime: null,
          duration: 100,
          realDuration: null,
          prepareTime: 344,
          endingTime: 2345,
          orderNumber: 1234,
          numberOfElements: 23,
          dependentOn: []
        },
        {
          id: 2,
          operationName: "test2",
          stationId: 2,
          stationName: "kosiarka",
          plannedStartTime: 1633201221,
          realStartTime: null,
          duration: 155,
          realDuration: null,
          prepareTime: 344,
          endingTime: 2345,
          orderNumber: 1234,
          numberOfElements: 23,
          dependentOn: [1]
        },
        {
          id: 3,
          operationName: "test2hhh",
          stationId: 3,
          stationName: "kosiarka",
          plannedStartTime: 1633201221,
          realStartTime: null,
          duration: 155,
          realDuration: null,
          prepareTime: 344,
          endingTime: 2345,
          orderNumber: 1234,
          numberOfElements: 23,
          dependentOn: [1]
        }
      ],
      stations: [
        { name: "frezarka", id: 1 },
        { name: "sracz", id: 2 },
        { name: "kosiarka", id: 3 }
      ],
      mainParam: "stationName",
      mainParamName: "stationName",
      mainParamId: "stationId",
      scaleCoef: 0.3,
      timeLineCursor: 0
    };
  },
  computed: {
    groupOperations() {
      let stations = new Map();
      const groupedOperations = this.group(this.getOperations, this.mainParam);
      this.stations.forEach(element => {
      
        let a = groupedOperations[element.name];
        if (a) {
          stations.set(element.name, a);
        } else {
          stations.set(element.name, []);
        }
      });
      
      return Object.fromEntries(stations);
    },
    startTimestamp() {
      return this.operations.sort((a, b) => {
        return a.plannedStartTime - b.plannedStartTime;
      })[0].plannedStartTime;
    },
    endTimestamp() {
      const list = this.operations.sort((a, b) => {
        return (
          a.plannedStartTime + a.duration - b.plannedStartTime + b.duration
        );
      });
      const lastElement = list[list.length - 1];
      return lastElement.plannedStartTime + lastElement.duration;
    },
    getSelectedParamName() {
      this.mainParam = this.selected;
      this.mainParamName = this.selected;
      return this.selected;
    },
    getSelectedParamId() {
      return "stationName";
    },
    getOperations() {
      return this.operations;
    }
  },
  methods: {
    onMoveOperationEvent(event) {
      let foundOperation = this.operations.filter(
        op => op.id === event.operationToChange.id
      );
      if (foundOperation) {
        foundOperation[0][this.getSelectedParamId] = event.destinationId;
        foundOperation[0].plannedStartTime = event.operationToChange.startTime;
        foundOperation[0].duration = event.operationToChange.duration;
        console.log(JSON.stringify(foundOperation))
      }
    },
    group(list, key) {
      return list.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    },
    getDateTime(timestamp) {
      return new Date(timestamp);
    },
    scaleUp() {
      this.scaleCoef += 0.01;
    },
    scaleDown() {
      this.scaleCoef -= 0.01;
    },
    mousemoveEvent(event) {
      const tab = this.$refs.container;
      this.timeLineCursor =
        event.pageX +
        tab.scrollLeft -
        tab.getBoundingClientRect().x -
        Math.round((10 * window.innerWidth) / 100);
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