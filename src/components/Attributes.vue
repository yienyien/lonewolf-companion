<template>
  <Section title="Attributs" id="attributes">
    <div class="attributes">
      <div class="attribute">
        <h2>{{ $t("Combat skill") }}</h2>
        <input type="number" v-model.number="combatSkill" />
        <span class="modificator">
          ({{ combatSkillModificator > 0 ? "+" : null
          }}<input type="number" v-model.number="combatSkillModificator" />)
        </span>
      </div>
      <div class="attribute">
        <h2>{{ $t("Endurance") }}</h2>
        <div class="attribute-number">
          <input type="number" v-model.number="endurance" />
          <span class="modificator">
            ({{ enduranceModificator > 0 ? "+" : null
            }}<input type="number" v-model.number="enduranceModificator" />)
          </span>
        </div>
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

  computed: mapStates(
    "combatSkill",
    "combatSkillModificator",
    "endurance",
    "enduranceModificator"
  ),
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
  width: 25px;
  height: 40px;
  font-size: 20px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
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
.modificator {
  font-size: 10px;
  width: 40px;
}

.modificator input {
  font-size: 10px;
  width: 11px;
}
</style>
