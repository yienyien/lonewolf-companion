<template>
<div >
  <div v-for="index in 8" :key="index" class="backpack">
    <input type="text" v-model.lazy="backpack[index]"/>
    <select v-model="items[index]">
      <option value="1 repas">1 repas</option>
      <option value="Poition de guérison">Potion guérison</option>
    </select>
  </div>  
</div>
</template>

<script>
import Vue from "vue";
import { mapStates } from "./utils.js";

const Component = Vue.extend({
  data() {
    return {
      items: [null, null, null, null, null, null, null, null],
    }
  },

  computed: mapStates("backpack"),

  watch: {
    items: function(data) {
      const i = data.findIndex((e) => e);
      if (i> 0) {
        this.backpack[i] = data[i];
        this.items[i] = null;
        this.$store.commit("backpack", this.backpack);
      }
    },
  }

  
});

export default Component;
</script>

<style>
  .backpack {
    display: grid;
    grid-template-columns: auto 20px;
    grid-gap: 5px;
    grid-auto-rows: auto;
 
  }
</style>
