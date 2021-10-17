<template>
<Section :title="$t('Pouch')" id="pouch">
  <h2>{{$t("(max. 50 gold coin)")}}</h2>
  <div class="pouch">
    <img src="pouch.png" height="40px"/>
    <input class="pouch-value" type="number" min="0" max="50" v-model.number="pouch"/>
    <button type="button" v-on:click="pouch += 1">+1</button>
    <button type="button" v-on:click="pouch += 5">+5</button>
    <button type="button" v-on:click="pouch -= 1">-1</button>
    <button type="button" v-on:click="pouch -= 5">-5</button>
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

  computed: mapStates("pouch"),

});

export default Component;
</script>

<i18n>
{
  "en": {
    "Pouch": "Pouch",
    "(max. 50 gold coin)": "(max. 50 coin)"
  },
  "fr": {
    "Pouch": "Bourse",
    "(max. 50 gold coin)": "(50 pièces max)"
  }
}
</i18n>

<style>
.pouch {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 0px;
    grid-auto-rows: minmax(40px, auto);
}

.pouch-value {
    width: 100%;
    text-align: center;
}
</style>
