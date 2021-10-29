<template>
  <div>
    <h2>Workstations</h2>
    <Table
      v-bind:tableHeaders="tableConfig"
      v-bind:data="workstations"
      v-bind:wizardConfig="wizardConfig"
      v-on:saveOfUpdateElement="saveOrEditStation"
      v-on:removeElement="removeStation"
    ></Table>
  </div>
</template>

<script>
import Table from "../components/table/Table.vue";
import WorkstationViewConfig from "./config/WorkstationViewConfig.json";

export default {
  name: "workstations-view",
  components: { Table },
  methods: {
    saveOrEditStation(station) {
      if(station.get("id")){
        console.log("update...")
        let foundStation = this.workstations.filter(s => s.id === station.get("id"))[0]
        station.forEach((e, i) => {
          foundStation[i] = e
        })
        return 
      }
      let newWorkstation = {
        name: station.get("name"),
        description: station.get("description")
      };

      this.workstations.push(newWorkstation);
    },
    removeStation(row){
      this.workstations = this.workstations.filter(s => s.id !== row.id)
    }
  },
  data() {
    return {
      wizardConfig: WorkstationViewConfig.wizardConfig,
      tableConfig: WorkstationViewConfig.tableConfig,
      workstations: [
        {
          id: 1,
          name: "sraczyk",
          description: "klasyczny sracz",
          nextUseTimestamp: null
        },
        {
          id: 2,
          name: "frezarka do paznokci",
          description: "frezarka dla kobiet",
          nextUseTimestamp: 1633206221
        },
        {
          id: 3,
          name: "pralka",
          description: "",
          nextUseTimestamp: (Date.now() + 500) / 1000
        }
      ]
    };
  }
};
</script>

<style>
</style>