<template>
  <div>
    <h1>Bourse (50 pièces max.)</h1>
    <div class="pouch">
      <input class="pouch-value" type="number" min="0" max="50" v-model.number="value"/>
      <button type="button" v-on:click="value += 1">+1</button>
      <button type="button" v-on:click="value -= 1">-1</button>
      <button type="button" v-on:click="value += 5">+5</button>
      <button type="button" v-on:click="value -= 5">-5</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

const Component = Vue.extend({
  props: ["db"],
  
  data() {
    return {
      value: 0
    }
  },

  watch: {
    value: function(v) {
      this.db.child('pouch').set(v);
    },
    db: function(newdb) {
      newdb.child('pouch').once('value').then((snap) => {
        const v = snap.val();
        this.value = v || 0;
      });
    }
  }
  
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
