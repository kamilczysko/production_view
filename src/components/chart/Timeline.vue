<template>
  <tr>
    <td class="label"></td>
    <td>
      <div class="timelineContainer">
        <p class="cursor" v-bind:style="{'margin-left': `${timelineCursor}px`}">
          {{getTimelineCursorValue(timelineCursor)}}
        </p>
        <p
          v-for="sign in getTimeSigns"
          v-bind:style="{'left': `${sign.position}px`}"
          v-bind:key="sign.timestamp"
          class="dateSign"
          ref="timelineContainer">
            {{sign.date}}
        </p>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "timeline",
  props: [
    "timestamps",
    "startTimestamp",
    "endTimestmap",
    "scaleFactor",
    "timelineCursor",
    "tableElement"
  ],
  data() {
    return {};
  },
  methods: {
    getTimelineCursorValue(time) {
      const date = new Date((Math.round(time / this.scaleFactor) + this.startTimestamp) * 1000);
      return (this.getDateInfo(date));
    },
    getTimeSign(startTime) {
      const time = parseInt(startTime);
      let actualTime = new Date(time * 1000);
      return {
        position: (time - this.startTimestamp) * this.scaleFactor,
        timestamp: time * 1000,
        date: this.getDateInfo(actualTime)
      };
    },
    getDateInfo(time) {
      return (time.getUTCMonth() +1 +"/" +time.getUTCDate() +"-" +time.getHours() +":" +time.getMinutes());
    }
  },
  computed: {
    getTimeSigns() {
      let timeSigns = [];
      timeSigns.push(this.getTimeSign(this.startTimestamp));
      this.timestamps.forEach(timestamp => {
        timeSigns.push(this.getTimeSign(timestamp));
      });
      return timeSigns.reduce((acc, current) => {
        const x = acc.find(item => {return Math.abs(item.timestamp - current.timestamp) <= 350 * 1000;});
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
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

.timelineContainer {
  position: relative;
  height: 40px;
}

.timelineContainer p {
  position: absolute;
}

.cursor {
  border-left: 1px solid black;
  white-space: nowrap;
  z-index: 900;
  top: 7px;
}
</style>