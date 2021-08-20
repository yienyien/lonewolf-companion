<template>
<div>
  <h1>Armes</h1>
  <textarea class="backpack-text" v-model="weapons">
  </textarea>
</div>
</template>

<script>
import Vue from "vue";

const Component = Vue.extend({
  props: ["db"],

  data() {
    return {
      weapons: "",
    }
  },

  watch: {
    weapons: function(v) {
      this.db.child('weapons').set(v);
    },
    db: function(newdb) {
      newdb.child('weapons').once('value').then((snap) => {
        const txt = snap.val();
        this.weapons = txt || "";
      });
    }
  }  
});

export default Component;
</script>

<style>
</style>
