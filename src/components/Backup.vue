<template>
<Section :title="$t('Backup and notes')" id="backup">
  <div class="backup-container">
    <h2>{{$t("Chapter")}}:</h2>
    <h2>{{$t("Notes")}}</h2>
    <input class="chapter" type="number" v-model.number="chapter"/>
    <textarea v-model.lazy="notes"/>
  </div>
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

  computed: mapStates("chapter", "notes"),

});

export default Component;
</script>

<i18n>
{
  "en": {
    "Backup and notes": "Backup and notes",
    "Chapter": "Chapter",
    "Notes": "Notes"
  },
  "fr": {
    "Backup and notes": "Notes & sauvegardes",
    "Chapter": "Chapitre",
    "Notes": "Notes"
  }
}
</i18n>

<style>
.backup-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px;
    grid-auto-rows: minmax(30px, auto);
}

.chapter {
    text-align: center;
}


.backup-container input {
    width: 100%;
    height: 40px;
}
</style>
