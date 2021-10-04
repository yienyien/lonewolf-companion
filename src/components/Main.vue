<template>
<div class="container">

  <Disciplines/>
  <Weapons/>
  <Backpack/>
  <Special/>
  <Pouch/>
  <Attributes/>
  <Combat/>
  <Backup/>
  <Settings/>

</div>
</template>

<script>
import Vue from "vue";

import firebase from 'firebase/app'
import "firebase/database";

import Disciplines from "./Disciplines.vue";
import Weapons from "./Weapons.vue";
import Backpack from "./Backpack.vue";
import Special from "./Special.vue";
import Pouch from "./Pouch.vue";
import Attributes from "./Attributes.vue";
import Combat from "./Combat.vue";
import { v4 as uuidv4 } from 'uuid';

import Backup from "./Backup.vue";
import Settings from "./Settings.vue";

const Main = Vue.extend({
  components: {
    Disciplines,
    Weapons,
    Backpack,
    Special,
    Pouch,
    Attributes,
    Combat,
    Backup,
    Settings,
  },

  data() {
    return {
      truc: "hello",
    }
  },

  async mounted() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if ('uid' in params) {
      this.uid = params["uid"];
    } else {
      const uid = uuidv4()
      window.location = window.location + "?uid=" + uid;
    }
    const db = firebase.database();
    this.$store.commit("db", db.ref('users/' + this.uid));
    this.$store.dispatch("load");
  },

});

export default Main;
</script>

<style>
body {
    font-size: 50%;
}

.container {
    padding: 20px;
}

.list {
    display: grid;
    grid-template-columns: 10px auto 20px;
    grid-gap: 5px;
    grid-auto-rows: auto;
}


.index {
    padding-top: 5px;
}

.w100 {
    width: 100%;
}

.w50 {
    width: 50%;
}

.w80 {
    width: 80%;
}

.monospace{
    font-family: 'Menlo', 'Lucida Console', 'Monaco', 'Consolas', monospace;
}

html {
    /*border: 1px solid;*/
    /*background-image: url("bg.jpg");*/
    /*background-size: 100% 120%;*/
    padding: 30px;
    background-repeat: no-repeat;
}
</style>
