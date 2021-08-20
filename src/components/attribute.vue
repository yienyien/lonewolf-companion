<template>
<div class="attributes">
  <div class="attribute">
    <h2 >Habileté</h2>
    <input type="number" v-model.number="combatSkill" v-on:change="change"/>
  </div>
  <div class="attribute">
    <h2 >Endurance</h2>
    <input type="number" v-model.number="endurance" v-on:change="change"/>
  </div>
</div>
</template>

<script>
import Vue from "vue";

const Component = Vue.extend({
  props: ["wounds", "db"],
  
  data() {
    return {
      combatSkill: 0,
      endurance: 0
    }
  },
  methods: {
    change: function() {
      this.$emit('input', [this.combatSkill, this.endurance]);
    }
  },
  watch: {
    combatSkill: function(v) {
      this.db.child('attributes').child('combatSkill').set(v);
    },
    endurance: function(v) {
      this.db.child('attributes').child('endurance').set(v);
    },
    db: function(newdb) {
      newdb.child('attributes').once('value').then((snap) => {
        const attributes = snap.val();
        if (attributes) {
          this.combatSkill = attributes.combatSkill || 0;
          this.endurance = attributes.endurance || 0;
          this.change();
        }
      });
    }
  }
  
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
