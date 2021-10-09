<template>
  <tr>
    <td class="label"></td>
    <td>
      <div class="timeline--container">
        <p
          class="cursor"
          v-bind:style="{'margin-left': `${timelineCursor}px`}"
        >{{getTimeLineCursorValue(timelineCursor)}}</p>
        <p
          v-for="sign in getTimeSigns"
          v-bind:style="{'left': `${sign.signPosition*scaleCoef}px`}"
          v-bind:key="sign.timestamp"
          class="dateSign"
          ref="timelineContainer"
        >{{sign.date}}</p>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "timeline",
  props: [
    "startTimestamp",
    "endTimestamp",
    "operations",
    "scaleCoef",
    "timelineCursor",
    "tableElement"
  ],
  data() {
    return {
      timelinecursorValue: 0
    };
  },
  methods: {
    getTimeLineCursorValue(time) {
      const d = new Date(((Math.round(time/this.scaleCoef)+this.startTimestamp)*1000));
      return d.getUTCMonth() +
            1 +
            "/" +
            d.getUTCDate() +
            "-" +
            d.getHours() +
            ":" +
            d.getMinutes();
    }
  },
  computed: {
    getTimeSigns() {
      let timeSings = [];
      this.operations.forEach(element => {
        let actualTime = new Date(element.plannedStartTime * 1000);

        const timeSign = {
          signPosition: element.plannedStartTime - this.startTimestamp,
          timestamp: element.plannedStartTime * 1000,
          date:
            actualTime.getUTCMonth() +
            1 +
            "/" +
            actualTime.getUTCDate() +
            "-" +
            actualTime.getHours() +
            ":" +
            actualTime.getMinutes()
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
  }
};
</script>

<style scoped>
tr {
    width: 150vw;
    border-top: 1px solid black;
    background-color: beige;
}
.label {
  min-width: 10vw;
  max-width: 10vw;
}

.timeline {
  display: flex;
  align-items: center;
}

.dateSign {
  border-left: 3px solid blue;
  white-space: nowrap;
  margin-top: 0px;
}

.timeline--container {
  position: relative;
  height: 40px;
}

.timeline--container p {
  position: absolute;
}

.cursor {
  border-left: 1px solid black;
  white-space: nowrap;
  z-index: 900;
  top: 7px;
}
</style>