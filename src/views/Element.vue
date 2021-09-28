<template>
  <h1>Element {{this.$route.params.number}}</h1>
</template>

<script>
export default {
  name: "Element",
  data: function() {
    return {
      number: 0
    };
  }
};
</script>

<style>
</style>