<template>
<Section title="Objets spéciaux" id="special">
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

<style>
.backpack-text {
    width: 100%;
}
</style>
