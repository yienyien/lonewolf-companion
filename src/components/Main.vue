<template>
  <div class="container">
    <Disciplines />
    <Weapons />
    <Backpack />
    <Special />
    <Pouch />
    <Attributes />
    <Combat />
    <Backup />
    <Settings />
  </div>
</template>

<script>
import Vue from "vue";

import firebase from "firebase/app";
import "firebase/database";

import Disciplines from "./Disciplines.vue";
import Weapons from "./Weapons.vue";
import Backpack from "./Backpack.vue";
import Special from "./Special.vue";
import Pouch from "./Pouch.vue";
import Attributes from "./Attributes.vue";
import Combat from "./Combat.vue";
import { v4 as uuidv4 } from "uuid";

import Backup from "./Backup.vue";
import Settings from "./Settings.vue";

import { mapper } from "./utils";

const Main = Vue.extend(
  mapper(["order"], {
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

    async mounted() {
      const params = new URLSearchParams(window.location.search);

      if (params.get("uid")) {
        this.uid = params.get("uid");
      } else {
        const uid = uuidv4();
        params.append("uid", uid);
        window.location.search = params.toString();
      }
      const db = firebase.database();
      this.$store.commit("db", db.ref("users/" + this.uid));
      this.$store.dispatch("load");

      this.$store.subscribe((mutation, state) => {
        if (mutation.type === "dragSectionTo") {
          const { dragSectionFrom: from, dragSectionTo: to } = state;
          if (from !== to) {
            this.drag(from, to);
          }
        }
      });
    },

    methods: {
      drag: function (from, to) {
        const fromOrder = this.order[from];
        const toOrder = this.order[to];

        Vue.set(this.order, from, toOrder);
        Vue.set(this.order, to, fromOrder);
      },
    },
  })
);

export default Main;
</script>

<style>
body {
  font-size: 50%;
}

.container {
  display: grid;
  padding: 20px;
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    grid-column-gap: 20px;
  }
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}

.list {
  display: grid;
  grid-template-columns: 10px auto 20px 20px;
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

.monospace {
  font-family: "Menlo", "Lucida Console", "Monaco", "Consolas", monospace;
}

html {
  /*border: 1px solid;*/
  /*background-image: url("bg.jpg");*/
  /*background-size: 100% 120%;*/
  padding: 30px;
  background-repeat: no-repeat;
}
</style>
