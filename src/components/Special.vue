<template>
<Section :title="$t('Special items')" id="special">
  <textarea class="backpack-text" rows="4" v-model.lazy="specialItems">
  </textarea>
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

  computed: mapStates("specialItems"),

});

export default Component;
</script>

<i18n>
{
  "en": {
    "Special items": "Special items"
  },
  "fr": {
    "Special items": "Objets spéciaux"
  }
}
</i18n>


<style>
.backpack-text {
    width: 100%;
}
</style>
