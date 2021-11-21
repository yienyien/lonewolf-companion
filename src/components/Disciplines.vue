<template>
  <Section :title="$t('disciplines')" id="disciplines">
    <div v-for="index in size" :key="index" class="list">
      <span class="index">{{ index }}</span>

      <select class="discipline" v-model="disciplines[index - 1]">
        <option></option>
        <option
          v-for="discipline in disciplineNames"
          :key="discipline"
          :value="discipline"
        >
          {{ $t(discipline) }}
        </option>
      </select>
    </div>
    <div class="center">
      <button class="w80" type="button" v-on:click="ndisciplines += 1">
        +
      </button>
    </div>
  </Section>
</template>

<script>
import Vue from "vue";
import { mapper } from "./utils";
import Section from "./Section.vue";

const Component = Vue.extend(
  mapper(["disciplines"], {
    components: {
      Section,
    },

    created() {
      this.disciplineNames = [
        "camouflage",
        "hunting",
        "sixthsense",
        "tracking",
        "healing",
        "weaponskill-0",
        "weaponskill-1",
        "weaponskill-2",
        "weaponskill-3",
        "weaponskill-4",
        "weaponskill-5",
        "weaponskill-6",
        "weaponskill-7",
        "weaponskill-8",
        "weaponskill-9",
        "mindshield",
        "mindblast",
        "animalkinship",
        "mindovermatter",
      ];
    },

    data() {
      return {
        ndisciplines: 0,
      };
    },

    computed: {
      size: function () {
        const s =
          Math.max(...Object.keys(this.disciplines)) + 1 + this.ndisciplines;
        return s;
      },
    },
  })
);

export default Component;
</script>

<i18n>
{
  "en": {
    "disciplines": "Magnakai disciplines",
    "camouflage":"Camouflage",
    "hunting":"Hunting (not consuming meal)",
    "sixthsense":"Sith sense",
    "tracking":"Tracking",
    "healing":"Healing (+1E / § no combat)",
    "weaponskill-0":"Weapon skill - Dagger",
    "weaponskill-1":"Weapon skill - Spear",
    "weaponskill-2":"Weapon skill - Mace",
    "weaponskill-3":"Weapon skill - Sabre",
    "weaponskill-4":"Weapon skill - Warhammer",
    "weaponskill-5":"Weapon skill - Sword",
    "weaponskill-6":"Weapon skill - Axe",
    "weaponskill-7":"Weapon skill - Broadsword",
    "weaponskill-8":"Weapon skill - Quarterstaff",
    "weaponskill-9":"Weapon skill - Short Sword",
    "mindshield":"Mindshield",
    "mindblast":"Mindblast (+2H)",
    "animalkinship":"Animal Kinship",
    "mindovermatter":"Mind Over Matter"
  },
  "fr": {
    "disciplines": "Disciplines Kaï",
    "camouflage":"Le camouflage",
    "hunting":"La chasse (dispensé de manger)",
    "sixthsense":"Le sixième sens",
    "tracking":"L'orientation",
    "healing":"La guérison (+1E / § sans combat)",
    "weaponskill-0":"La maitrise des armes - Poignard",
    "weaponskill-1":"La maitrise des armes - Lance",
    "weaponskill-2":"La maitrise des armes - Masse d'armes",
    "weaponskill-3":"La maitrise des armes - Sabre",
    "weaponskill-4":"La maitrise des armes - Marteau de guerre",
    "weaponskill-5":"La maitrise des armes - Epée",
    "weaponskill-6":"La maitrise des armes - Hache",
    "weaponskill-7":"La maitrise des armes - Epée",
    "weaponskill-8":"La maitrise des armes - Baton",
    "weaponskill-9":"La maitrise des armes - Glaive",
    "mindshield":"Le bouclier psychique",
    "mindblast":"Puissance psychique (+2H)",
    "animalkinship":"Communication animale",
    "mindovermatter":"Maitrise psychique de la matière"
  }
}
</i18n>

<style>
.discipline {
  width: 100%;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
