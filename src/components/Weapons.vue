<template>
  <Section :title="$t('Weapons')" id="weapons">
    <div v-for="index in 2" :key="index" class="list">
      <span class="index">{{ index }}</span>
      <input type="text" v-model.lazy="weapons[index]" />
      <select v-model="propositions[index]">
        <option v-for="w in weaponList" :value="w" :key="w">{{ $t(w) }}</option>
      </select>
    </div>
  </Section>
</template>

<i18n>
{
  "en": {
    "Weapons": "Weapons",
    "weapon-0":"Dagger",
    "weapon-1":"Spear",
    "weapon-2":"Mace",
    "weapon-3":"Sabre",
    "weapon-4":"Warhammer",
    "weapon-5":"Sword",
    "weapon-6":"Axe",
    "weapon-7":"Broadsword",
    "weapon-8":"Quarterstaff",
    "weapon-9":"Short Sword"
  },
  "fr": {
    "Weapons": "Armes",
    "weapon-0":"Poignard",
    "weapon-1":"Lance",
    "weapon-2":"Masse d'armes",
    "weapon-3":"Sabre",
    "weapon-4":"Marteau de guerre",
    "weapon-5":"Epée",
    "weapon-6":"Hache",
    "weapon-7":"Epée",
    "weapon-8":"Baton",
    "weapon-9":"Glaive"
  }
}
</i18n>

<script>
import Vue from "vue";
import { mapper } from "./utils.js";
import Section from "./Section.vue";

const Component = Vue.extend(
  mapper(["weapons"], {
    components: {
      Section,
    },

    created() {
      this.weaponList = [...Array(9).keys()].map((i) => `weapon-${i}`);
    },

    data() {
      return {
        propositions: [null, null],
      };
    },

    watch: {
      propositions: function (data) {
        const i = data.findIndex((e) => e);
        if (i > 0) {
          Vue.set(this.weapons, i, this.$t(data[i]));
          Vue.set(this.propositions, i, null);
        }
      },
    },
  })
);

export default Component;
</script>

<style></style>
