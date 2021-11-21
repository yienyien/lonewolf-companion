<template>
  <Section title="Options" id="options">
    <div>Wake lock: {{ wakelock }}</div>
    <select v-model="lang">
      <option value="fr">Français</option>
      <option value="en">English</option>
    </select>
  </Section>
</template>

<script>
import Vue from "vue";
import Section from "./Section.vue";
import { mapper } from "./utils.js";

const Settings = Vue.extend(
  mapper(["lang"], {
    components: {
      Section,
    },

    data() {
      return {
        wakelock: null,
      };
    },

    async mounted() {
      try {
        await navigator.wakeLock.request("screen");
        this.wakelock = "OK";
      } catch (err) {
        // The Wake Lock request has failed - usually system related, such as battery.
        this.wakelock = "KO";
      }
    },

    watch: {
      lang: function (lang) {
        this.$i18n.locale = lang;
      },
    },
  })
);

export default Settings;
</script>
