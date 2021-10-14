<template>
  <div>
    <button v-on:click="add">
      <img src="https://img.icons8.com/ios-glyphs/30/000000/add--v1.png" />
    </button>
    <table>
      <tr>
        <th v-for="column in getHeaders" v-bind:key="column.id">{{column.name}}</th>
      </tr>
      <tr v-for="(dataRow, index) in getDataToDisplay" v-bind:key="index">
        <td v-for="(d, indx) in dataRow" v-bind:key="indx">{{d}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "table",
  props: ["data", "tableHeaders"],
  computed: {
    getHeaders() {
      return this.tableHeaders;
    },
    getDataToDisplay() {
      let dataToDisplay = [];
      for (let row of this.data) {
        let dataRow = new Array();
        for (let hid of this.tableHeaders) {
          let dat = row[hid.param];
          if (dat) {
            if (hid.isTimestamp) {
              dataRow.push(this.getDateInfo(dat));
            } else {
              dataRow.push(row[hid.param]);
            }
          } else {
            dataRow.push("-");
          }
        }
        dataToDisplay.push(dataRow);
      }
      return dataToDisplay;
    }
  },
  methods: {
    getDateInfo(time) {
      const date = new Date(time);
      return (
        date.getUTCMonth() +
        1 +
        "/" +
        date.getUTCDate() +
        "-" +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },
    add() {
      console.log("adf");
    }
  }
};
</script>

<style>
table {
  width: 100%;
}
td {
  padding: 3px;
}
</style>