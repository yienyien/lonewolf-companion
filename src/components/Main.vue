<template>
<div class="container">
  <Section title="Disciplines Kaï">
    <Discipline/>
  </Section>
  <Section title="Armes">
    <Weapons/>
  </Section>
  <Section title="Sac à dos">
    <Backpack/>
  </Section>
  <Section title="Objets spéciaux">
    <Special/>
  </Section>
  <Section title="Bourse">
    <Pouch/>
  </Section>
  <Section title="Attributs">
    <Attribute/>
  </Section>
  <Section title="Combats">
    <Combat/>
  </Section>
  <Section title="Notes & Sauvegarde">
    <Backup/>
  </Section>
  <Section title="Debug">
    <div>
      <div>Wake lock: {{wakelock}}</div>
    </div>
  </Section>
</div>    
</template>

<script>
import Vue from "vue";

import firebase from 'firebase/app'
import "firebase/database";

import Discipline from "./Disciplines.vue";
import Weapons from "./Weapons.vue";
import Backpack from "./Backpack.vue";
import Special from "./Special.vue";
import Pouch from "./Pouch.vue";
import Attribute from "./Attributes.vue";
import Combat from "./Combat.vue";
import { v4 as uuidv4 } from 'uuid';
import Section from "./Section.vue";
import Backup from "./Backup.vue";

const Main = Vue.extend({
  components: {
    Section,
    Discipline,
    Weapons,
    Backpack,
    Special,
    Pouch,
    Attribute,
    Combat,
    Backup,
  },

  data() {
    return {
      wakelock: null,
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

    try {
      await navigator.wakeLock.request('screen');

      this.wakelock = "OK";
    } catch (err) {
      // The Wake Lock request has failed - usually system related, such as battery.
      this.wakelock = "KO";
    }
    
  },
  
});

export default Main;
</script>

<style>
body {
    font-size: 50%;
}
  
.container {
    /*
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px;
    grid-auto-rows: minmax(100px, auto);
   */
}
</style>
