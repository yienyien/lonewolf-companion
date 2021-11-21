<template>
  <Section :title="$t('Backup and notes')" id="backup">
    <div class="backup-container">
      <h2>{{ $t("Chapter") }}:</h2>
      <h2>{{ $t("Notes") }}</h2>
      <input class="chapter" type="number" v-model.number="chapter" />
      <textarea v-model.lazy="notes" />
    </div>
    <div
      v-for="[ts, data] in Object.entries($store.state.backup)"
      :key="ts"
      class="backup-container-history"
      @click="() => restore(ts)"
    >
      <input class="chapter" type="number" :value="data.chapter" readonly />
      <textarea :value="data.notes" readonly />
      <button @click="() => remove(ts)">X</button>
    </div>

    <button @click="backup">{{ $t("Backup") }}</button>
  </Section>
</template>

<script>
import Vue from "vue";
import { mapStates } from "./utils.js";
import Section from "./Section.vue";

const Component = Vue.extend({
  components: {
    Section,
  },

  methods: {
    backup: function () {
      this.$store.commit("doBackup");
    },
    restore: function (ts) {
      this.$store.dispatch("load", ts);
    },
    remove: function (ts) {
      this.$store.commit("delBackup", ts);
    },
  },

  computed: mapStates("chapter", "notes"),
});

export default Component;
</script>

<i18n>
{
  "en": {
    "Backup and notes": "Backup and notes",
    "Chapter": "Chapter",
    "Notes": "Notes",
    "Backup": "Backup"
  },
  "fr": {
    "Backup and notes": "Notes & sauvegardes",
    "Chapter": "Chapitre",
    "Notes": "Notes",
    "Backup": "Sauvegarde"
  }
}
</i18n>

<style>
.backup-container {
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-gap: 5px;
  grid-auto-rows: minmax(30px, auto);
}

.backup-container-history {
  display: grid;
  grid-template-columns: 50px 1fr 40px;
  grid-gap: 5px;
  grid-auto-rows: minmax(30px, auto);
}

.chapter {
  text-align: center;
}

.backup-container input {
  height: 40px;
}

.backup-container-history input {
  height: 40px;
}
</style>
