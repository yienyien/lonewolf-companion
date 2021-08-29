<template>
<div class="attributes">
  <div class="attribute">
    <h2 >Habileté</h2>
    <input type="number" v-model.number="combatSkill"/>
  </div>
  <div class="attribute">
    <h2 >Endurance</h2>
    <input type="number" v-model.number="endurance"/>
  </div>
</div>
</template>

<script>
import Vue from "vue";
import { mapStates } from "./utils.js";

const Component = Vue.extend({

  computed: mapStates("combatSkill", "endurance"),
    
});

export default Component;
</script>

<style>

.endurance input {
   outline: none;
   border: 0;
   width: 30px;
   height: 50px;
   font-size: 20px;  
}

.attribute input {
    outline: none;
    border: 0;
    width: 30px;
    height: 50px;
    font-size: 20px;
}

.attribute div {
    font-size: 20px;    
}

.attribute {
    text-align: center;
    border: 1px solid;
}
.attributes {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px;
    grid-auto-rows: minmax(50px, auto);
}
</style>
