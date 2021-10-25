<template>
  <div>
    <h2>Orders</h2>
    <Table
      v-bind:tableHeaders="tableConfig"
      v-bind:data="orders"
      v-bind:wizardConfig="wizardConfig"
      v-on:saveOfUpdateElement="saveOrEditStation"
      v-on:removeElement="removeStation"
    ></Table>
  </div>
</template>

<script>
import Table from "../components/table/Table.vue";
import OrdersViewConfig from "./OrdersViewConfig.json";

export default {
  name: "orders-view",
  components: { Table },
  methods: {
    saveOrEditStation(order) {
      if(order.get("id")){
        console.log("update...")
        let foundOrders = this.orders.filter(s => s.id === order.get("id"))[0]
        order.forEach((e, i) => {
          foundOrders[i] = e
        })
        return 
      }
      let newOrder = {
        amount: order.get("amount"),
        id: this.getRandomInt(0,1000),
        name: order.get("name"),
        description: order.get("description")
      };

      this.orders.push(newOrder);
    },
    removeStation(row){
      this.orders = this.orders.filter(s => s.id !== row.id)
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  },
  data() {
    return {
      wizardConfig: OrdersViewConfig.wizardConfig,
      tableConfig: OrdersViewConfig.tableConfig,
      orders: [
        {
          id: 1,
          name: "sraczyk",
          description: "klasyczny sracz",
          orderDate: 123444234,
          amount: 1
        },
        {
          id: 2,
          name: "frezarka do paznokci",
          description: "frezarka dla kobiet",
          orderDate: 123444234,
          amount: 23
        },
        {
          id: 3,
          name: "pralka",
          description: "",
          orderDate: 123444234,
          amount: 100
        }
      ]
    };
  }
};
</script>

<style>
</style>