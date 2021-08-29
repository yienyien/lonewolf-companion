<template>
<div >
  <div v-for="index in 2" :key="index" class="list">
    <span class="index">{{index}}</span>
    <input type="text" v-model.lazy="weapons[index]"/>
    <select v-model="propositions[index]">
        <option value="Poignard">Poignard</option>
        <option value="Lance">Lance</option>        
        <option value="Masse d'armes">Masse d'armes</option>        
        <option value="Sabre">Sabre</option>        
        <option value="Marteau de guerre">Marteau de guerre</option>        
        <option value="Epée">Epée</option>        
        <option value="Hache">Hache</option>        
        <option value="Baton">Baton</option>
        <option value="Glaive">Glaive</option>         
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
      propositions: [null, null],
    }
  },

  computed: mapStates("weapons"),

  watch: {
    propositions: function(data) {
      const i = data.findIndex((e) => e);
      if (i > 0) {
        this.weapons[i] = data[i];
        this.propositions[i] = null;
      }
    },
  }  
});

export default Component;
</script>

<style>


</style>
