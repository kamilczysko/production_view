<template>
  <div>
    <h2>Storage View</h2>
    <Table
      v-bind:tableHeaders="tableConfig"
      v-bind:data="storageData"
      v-bind:wizardConfig="wizardConfig"
      v-on:saveOfUpdateElement="saveOrEdit"
      v-on:removeElement="remove"
    ></Table>
  </div>
</template>

<script>
import Table from "../components/table/Table.vue";
import StorageViewConfig from "./StorageViewConfig.json";

export default {
  name: "storage-view",
  components: { Table },
  data() {
    return {
      storageData: [
        {
          id: 1,
          name: "batonik",
          code: "23f434g",
          amount: 100,
          description: "klasyczny czekoladowy baton",
          fullName: "batonik czekoladowy"
        },
        {
          id: 2,
          name: "owocek",
          code: "f4f4f",
          amount: 23,
          description: "Jakiś owocek",
          fullName: "truskaweczka"
        },
        {
          id: 3,
          name: "ziemniaczki",
          code: "fff",
          amount: 333,
          description: "kartofel",
          fullName: "normalny kartofel"
        }
      ],
      wizardConfig: StorageViewConfig.wizardConfig,
      tableConfig: StorageViewConfig.tableConfig
    };
  },
  methods: {
    remove(row) {
      this.storageData = this.storageData.filter(s => s.id !== row.id);
    },
    saveOrEdit(product) {
      if (product.get("id")) {
        console.log("update...");
        let foundProducts = this.storageData.filter(
          s => s.id === product.get("id")
        )[0];
        product.forEach((e, i) => {
          foundProducts[i] = e;
        });
        return;
      }
      let newProduct = {
        id: this.getRandomInt(0, 1500),
        name: product.get("name"),
        fullName: product.get("fullName"),
        code: product.get("code"),
        amount: product.get("amount"),
        description: product.get("description")
      };

      this.storageData.push(newProduct);
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }
};
</script>

<style>
</style>