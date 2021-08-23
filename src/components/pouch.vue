<template>
  <div>
    <h2>(50 pièces max.)</h2>
    <div class="pouch">
      <input class="pouch-value" type="number" min="0" max="50" v-model.number="pouch"/>
      <button type="button" v-on:click="pouch += 1">+1</button>
      <button type="button" v-on:click="pouch += 5">+5</button>
      <button type="button" v-on:click="pouch -= 1">-1</button>
      <button type="button" v-on:click="pouch -= 5">-5</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapStates } from "./utils.js";

const Component = Vue.extend({
  computed: mapStates("pouch"),
  
});

export default Component;
</script>

<style>
.pouch {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 0px;
    grid-auto-rows: minmax(15px, auto);    
}
  
.pouch-value {
    width: 70%;
}
</style>
