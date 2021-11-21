<template>
  <Section title="Attributs" id="attributes">
    <div class="attributes">
      <div class="attribute">
        <h2>{{ $t("Combat skill") }}</h2>
        <input type="number" v-model.number="combatSkill" />
      </div>
      <div class="attribute">
        <h2>{{ $t("Endurance") }}</h2>
        <input type="number" v-model.number="endurance" />
      </div>
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

  computed: mapStates("combatSkill", "endurance"),
});

export default Component;
</script>

<i18n>
{
  "en": {
    "Combat skill": "Combat skill",
    "Endurance": "Endurance"
  },
  "fr": {
    "Combat skill": "Habileté",
    "Endurance": "Endurance"
  }
}
</i18n>

<style>
.attribute input {
  outline: none;
  border: 0;
  width: 40px;
  height: 40px;
  font-size: 20px;
}

.attribute div {
  font-size: 20px;
}

.attribute {
  text-align: center;
  border: 1px solid;
}
.attributes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  grid-auto-rows: minmax(40px, auto);
}
</style>
