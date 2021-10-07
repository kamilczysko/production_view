<template>
  <div class="chart" v-on:scroll="scrollScale">
    <div class="scaleButtons">
      <button v-on:click="scaleDown">-</button>
      <button v-on:click="scaleUp">+</button>
      <p>{{scaleCoef}}</p>
    </div>
    <div class="timeline">
      <div style="min-width: 10vh; max-width: 10vh;"></div>
      <div class="timeline--container">
        <p
          v-for="sign in getTimeSigns"
          v-bind:style="{'left': `${sign.signPosition*scaleCoef}px`}"
          v-bind:key="sign.timestamp"
          class="dateSign"
        >{{sign.date}}</p>
      </div>
    </div>
    <div class="rowContainer">
      <Row
        v-for="(operations, index) in groupOperations"
        v-bind:key="index"
        v-bind:operations="operations"
        v-bind:mainParamName="mainParamName"
        v-bind:startTimestamp="startTimestamp"
        v-bind:endTimestamp="endTimestamp"
        v-bind:scaleCoef="scaleCoef"
        style="top: 30vh"
      />
    </div>
  </div>
</template>

<script>
import Row from "./Row.vue";

export default {
  name: "chart",
  components: {
    Row
  },
  data: () => {
    return {
      operations: [
        {
          id: 1,
          name: "test1",
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
          name: "test1",
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
          name: "test1",
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
          name: "test2",
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
          name: "test1",
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
          name: "test2",
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
          name: "test2",
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
          name: "test2",
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
          name: "test2",
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
          name: "test2",
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
          name: "test2",
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
          name: "test2",
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
      scaleCoef: 0.3
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
    getTimeSigns() {
      let timeSings = [];
      this.operations.forEach(element => {
        const timeSign = {
          signPosition: element.plannedStartTime - this.startTimestamp,
          timestamp: element.plannedStartTime * 1000,
          date: new Date(element.plannedStartTime * 1000)
        };
        timeSings.push(timeSign);
      });
      const set = timeSings.reduce((acc, current) => {
        const x = acc.find(item => {
          return Math.abs(item.timestamp - current.timestamp) <= 400 * 1000;
        });
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      return set;
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
    scrollScale(event) {
      
    }
  }
};
</script>

<style>
.chart {
  overflow-x: auto;
}
.timeline {
  display: flex;
  align-items: center;
}

.dateSign {
  border-left: 3px solid red;
  height: 100px;
  position: relative;
  width: 200px;
}

.timeline--container {
  position: relative;
}

.timeline--container p {
  position: absolute;
}
.rowContainer {
  margin-top: 10vh;
  display: inline-block;
  white-space: nowrap;
  width: calc(100% + 40px);
}

.scaleButtons {
  display: flex;
  align-content: center;
  position: sticky;
  left: 0px;
}
</style>