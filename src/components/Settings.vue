<template>
<Section title="Options" id="options">
  <div>Wake lock: {{wakelock}}</div>
</Section>
</template>

<script>
import Vue from "vue";
import Section from "./Section.vue";

const Settings = Vue.extend({
  components: {
    Section,
  },

  data() {
    return {
      wakelock: null,
    }
  },

  async mounted() {
    try {
      await navigator.wakeLock.request('screen');
      this.wakelock = "OK";
    } catch (err) {
      // The Wake Lock request has failed - usually system related, such as battery.
      this.wakelock = "KO";
    }
  }
});

export default Settings;
</script>
