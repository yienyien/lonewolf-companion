<template>
  <div>
    <div class="container">
      <Discipline :db="db"/>
      <Weapons :db="db"/>
      <Backpack :db="db"/>
      <Special :db="db"/>
      <Pouch :db="db"/>
      <Attribute v-model="attributes" :wounds="wounds" :db="db"/>
    </div>
    <div>
    </div>
    <Combat :db="db" :combatSkill="attributes[0]" :endurance="attributes[1]" v-model="wounds"/>
  </div>    
</template>

<script>
import Vue from "vue";

import firebase from 'firebase/app'
import "firebase/database";

import Discipline from "./discipline.vue";
import Weapons from "./weapons.vue";
import Backpack from "./backpack.vue";
import Special from "./special.vue";
import Pouch from "./pouch.vue";
import Attribute from "./attribute.vue";
import Combat from "./combat.vue";
import { v4 as uuidv4 } from 'uuid';

const Main = Vue.extend({
  data() {
    return {
      attributes: [0, 0],
      wounds: 0,
      uid: 0,
      db: null,
    };
  },

  components: {
    Discipline,
    Weapons,
    Backpack,
    Special,
    Pouch,
    Attribute,
    Combat
  },
  
  mounted() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if ('uid' in params) {
      this.uid = params["uid"];
    } else {
      const uid = uuidv4()
      window.location = window.location + "?uid=" + uid;      
    }
    const db = firebase.database();
    this.db = db.ref('users/' + this.uid);
  },
  
  methods: {
    hello: function() {
    }
  },

  watch: {
    wounds: function(w) {
      this.db.child('wounds').set(w);
    },
    db: function(newdb) {
      if (!newdb) return;
      newdb.child('wounds').once('value').then((snap) => {
        const wounds = snap.val();
        this.wounds = wounds || 0;
      });
    }
  }
});

export default Main;
</script>

<style>
body {
    font-size: 50%;
}
  
.container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px;
    grid-auto-rows: minmax(100px, auto);
}
</style>
