<template>
  <div>
    <h1>Objets spéciaux</h1>
    <textarea class="backpack-text" v-model="specialText">
    </textarea>
  </div>
</template>

<script>
import Vue from "vue";

const Component = Vue.extend({
  props: ["db"],

  data() {
    return {
      specialText: "",
    }
  },

  watch: {
    specialText: function(v) {
      this.db.child('special').set(v);
    },
    db: function(newdb) {
      newdb.child('special').once('value').then((snap) => {
        const txt = snap.val();
        this.specialText = txt || "";
      });
    }
  }
  
  
});

export default Component;
</script>

<style>
</style>
