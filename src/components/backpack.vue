<template>
  <div>
    <h1>Sac à dos</h1>
    <textarea class="backpack-text" v-model="backpackText">
    </textarea>
  </div>
</template>

<script>
import Vue from "vue";

const Component = Vue.extend({
  props: ["db"],

  data() {
    return {
      backpackText: "",
    }
  },
  watch: {
    backpackText: function(v) {
      this.db.child('backpack').set(v);
    },
    db: function(newdb) {
      newdb.child('backpack').once('value').then((snap) => {
        const txt = snap.val();
        this.backpackText = txt || "";
      });
    }
  }

  
});

export default Component;
</script>

<style>
.backpack-text {
    width: 100%;
    height: 80px;
    resize: none;
    border: 0;
}
</style>
