<template>
  <div>
    <h2>Production View</h2>
    <Chart v-bind:operationsData="operations" v-bind:rowsData="rows"/>
  </div>
</template>

<script>
import Chart from "../components/chart/Chart.vue";
export default {
  name: "production-view",
  components: { Chart },
  data(){
    return {
      rows: [
        { rowId: 1, rowTitle: "kosiarka" },
        { rowId: 2, rowTitle: "kibel" },
        { rowId: 3, rowTitle: "pralka" },
        { rowId: 4, rowTitle: "młotek" }
      ],
      operations: [
        {
          id: 1,
          startTimestamp: 1633204221,
          duration: 200,
          rowId: 1,
          additionalInfo: [
            { name: "Operation name", value: "Koszenie trawnika" }
          ]
        },
        {
          id: 2,
          startTimestamp: 1633205221,
          duration: 400,
          rowId: 2,
          additionalInfo: []
        }
      ]
    }
  }
};
</script>

<style>
</style>