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
            v-bind:operations="operations"
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
            v-bind:mainParamName="getSelected"
            v-bind:startTimestamp="startTimestamp"
            v-bind:endTimestamp="endTimestamp"
            v-bind:scaleCoef="scaleCoef"
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
          stationId: 12,
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
          id: 134,
          operationName: "test1",
          stationId: 12,
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
          id: 156,
          operationName: "test1",
          stationId: 12,
          stationName: "frezarka",
          plannedStartTime: 1633204222,
          realStartTime: null,
          duration: 25,
          realDuration: null,
          prepareTime: 344,
          endingTime: 2345,
          orderNumber: 1234,
          numberOfElements: 23,
          dependentOn: []
        },
        {
          id: 55,
          operationName: "test2",
          stationId: 12,
          stationName: "frezarka",
          plannedStartTime: 1633204351,
          realStartTime: null,
          duration: 50,
          realDuration: null,
          prepareTime: 344,
          endingTime: 2345,
          orderNumber: 1234,
          numberOfElements: 23,
          dependentOn: []
        },
        {
          id: 9,
          operationName: "test1",
          stationId: 12,
          stationName: "frezarka",
          plannedStartTime: 1633205221,
          realStartTime: null,
          duration: 650,
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
          stationId: 12,
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
          id: 3442,
          operationName: "test2",
          stationId: 12,
          stationName: "kosiarka",
          plannedStartTime: 1633201621,
          realStartTime: null,
          duration: 150,
          realDuration: null,
          prepareTime: 344,
          endingTime: 2345,
          orderNumber: 1234,
          numberOfElements: 23,
          dependentOn: [1]
        },
        {
          id: 3,
          operationName: "test2",
          stationId: 12,
          stationName: "kosiarka",
          plannedStartTime: 1633204221,
          realStartTime: null,
          duration: 45,
          realDuration: null,
          prepareTime: 344,
          endingTime: 2345,
          orderNumber: 1234,
          numberOfElements: 23,
          dependentOn: [2]
        },
        {
          id: 5,
          operationName: "test2",
          stationId: 12,
          stationName: "kosiarka",
          plannedStartTime: 1633204221,
          realStartTime: null,
          duration: 66,
          realDuration: null,
          prepareTime: 344,
          endingTime: 2345,
          orderNumber: 1234,
          numberOfElements: 23,
          dependentOn: []
        },
        {
          id: 6,
          operationName: "test2",
          stationId: 12,
          stationName: "kosiarka",
          plannedStartTime: 1633204221,
          realStartTime: null,
          duration: 345,
          realDuration: null,
          prepareTime: 344,
          endingTime: 2345,
          orderNumber: 1234,
          numberOfElements: 23,
          dependentOn: []
        },
        {
          id: 6,
          operationName: "test2",
          stationId: 12,
          stationName: "pralka",
          plannedStartTime: 1633204721,
          realStartTime: null,
          duration: 345,
          realDuration: null,
          prepareTime: 344,
          endingTime: 2345,
          orderNumber: 1234,
          numberOfElements: 23,
          dependentOn: []
        },
        {
          id: 6,
          operationName: "test2",
          stationId: 12,
          stationName: "dupsko",
          plannedStartTime: 1633204221,
          realStartTime: null,
          duration: 345,
          realDuration: null,
          prepareTime: 344,
          endingTime: 2345,
          orderNumber: 1234,
          numberOfElements: 23,
          dependentOn: []
        },
        {
          id: 6,
          operationName: "test2",
          stationId: 12,
          stationName: "sracz",
          plannedStartTime: 1633204721,
          realStartTime: null,
          duration: 345,
          realDuration: null,
          prepareTime: 344,
          endingTime: 2345,
          orderNumber: 1234,
          numberOfElements: 23,
          dependentOn: []
        },
        {
          id: 6,
          operationName: "test2",
          stationId: 12,
          stationName: "pralka",
          plannedStartTime: 1633205721,
          realStartTime: null,
          duration: 150,
          realDuration: null,
          prepareTime: 344,
          endingTime: 2345,
          orderNumber: 1234,
          numberOfElements: 23,
          dependentOn: []
        }
      ],
      mainParam: "stationName",
      mainParamName: "stationName",
      scaleCoef: 0.3,
      timeLineCursor: 0
    };
  },
  computed: {
    groupOperations() {
      return this.group(this.operations, this.mainParam);
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
    getSelected() {
      this.mainParam = this.selected;
      this.mainParamName = this.selected;
      return this.selected;
    }
  },
  methods: {
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