<template>
  <div>
    <div v-bind:class="{wizardOn : showWizard}">
      <button v-on:click="openWizard">
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
    <Wizard
      v-on:addElement="addElement"
      v-on:closeWizard="closeWizard"
      v-if="showWizard"
      v-bind:config="config"
    />
  </div>
</template>

<script>
import Wizard from "../Wizard.vue";
export default {
  name: "table",
  props: ["data", "tableHeaders", "wizardConfig"],
  components: {
    Wizard
  },
  data() {
    return {
      config: this.wizardConfig,
      showWizard: false
    };
  },
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
      if(Date.now()/1000 >= time){
        return "-"
      }

      const date = new Date(time*1000);
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
    openWizard() {
      this.showWizard = true;
    },
    closeWizard() {
      this.showWizard = false;
    },
    addElement(station) {
        this.$emit("addElement", station)
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
.wizardOn {
  filter: blur(8px);
}
</style>