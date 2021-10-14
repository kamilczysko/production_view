<template>
  <div>
    <h2>Workstations</h2>
    <Table v-bind:tableHeaders="tableHeaders" v-bind:data="workstations"></Table>
  </div>
</template>

<script>
import Table from "../components/table/Table.vue";

export default {
  
  name: "workstations-view",
  components: { Table },
  data() {
    return {
      workstations: [
        {id: 1, name: "sraczyk", description: "klasyczny sracz", nextUseTimestamp: null},
        {id: 2, name: "frezarka do paznokci", description: "frezarka dla kobiet", nextUseTimestamp: 1633206221}
      ],
      tableHeaders: [
        {param: "id", name: "Id", editable: false, isTimestamp: false},
        {param: "name", name: "Name", editable: true, isTimestamp: false},
        {param: "description", name: "Description", editable: true, isTimestamp: false},
        {param: "nextUseTimestamp", name: "Will be free at", editable: false, isTimestamp: true}
      ],
      fields: [        
        {param: "name" ,name: "Name", type: 'text', editable: true, optional: false},
        {param: "desc" ,name: "Description", type: 'text', editable: true, optional: true},
        {param: "fullName" ,name: "Full Name", type: 'text', editable: true, optional: true},
      ]
    }
  }
};
</script>

<style>
</style>