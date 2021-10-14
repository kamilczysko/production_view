<template>
  <div class="wizard">
      <div v-for="(conf, index) in getConfig" v-bind:key="index">
          <div class="wizardInput">
              <p>{{conf.name}} 
                  <span v-if="conf.mandatory">*</span>
              </p>
              <input type="conf.type" v-bind:ref="conf.param"/>
          </div>
      </div>
      <button v-on:click="add">Add</button>
      <button v-on:click="cancel">Cancel</button>
  </div>
</template>

<script>
export default {
    name: "wizard",
    props: ["config"],
    computed: {
        getConfig(){
            console.log(this.config)
            return this.config
        }
    },
    methods: {
        cancel() {
            this.$emit("closeWizard")
        },
        add() {
            let result = new Map();
            let confirm = true;
            this.config.forEach(element => {
                const value = this.$refs[element.param].value;
                if(element.mandatory){
                    if(!value) {
                        this.$refs[element.param].style.border="2px solid red";
                        confirm = false;
                        return;
                    }
                }
                result.set(element.param, value)
            })
            if(confirm){
            this.$emit("addElement", result);
            this.$emit("closeWizard")}
        }
    }
}
</script>

<style>
.wizard {
    width: fit-content;
    height: 30wh;
    margin: auto;
    backdrop-filter: blur(10px);

}
.wizardInput{
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.wizardInput input {
    margin-left: 5px;
}
</style>