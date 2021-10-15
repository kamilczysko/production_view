<template>
  <div>
    <h2>Workstations</h2>
    <Table
      v-bind:tableHeaders="tableHeaders"
      v-bind:data="workstations"
      v-bind:wizardConfig="wizardConfig"
      v-on:saveOfUpdateElement="saveOrEditStation"
      v-on:removeElement="removeStation"
    ></Table>
  </div>
</template>

<script>
import Table from "../components/table/Table.vue";
import WorkstationWizardConfig from "./WorkstationWizardConfig.json";

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
      wizardConfig: WorkstationWizardConfig,
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
      ],
      tableHeaders: [
        { param: "id", name: "Id", editable: false, isTimestamp: false },
        { param: "name", name: "Name", editable: true, isTimestamp: false },
        {
          param: "description",
          name: "Description",
          editable: true,
          isTimestamp: false
        },
        {
          param: "nextUseTimestamp",
          name: "Will be free at",
          editable: false,
          isTimestamp: true
        }
      ],
      fields: [
        {
          param: "name",
          name: "Name",
          type: "text",
          editable: true,
          optional: false
        },
        {
          param: "desc",
          name: "Description",
          type: "text",
          editable: true,
          optional: true
        },
        {
          param: "fullName",
          name: "Full Name",
          type: "text",
          editable: true,
          optional: true
        }
      ]
    };
  }
};
</script>

<style>
</style>