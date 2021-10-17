<template>
<Section title="Sac à dos" id="backpack">
  <div v-for="index in 8" :key="index" class="list">
    <span class="index">{{index}}</span>
    <input type="text" v-model.lazy="backpack[index]"/>
    <select v-model="items[index]">
      <option :value="$t('1 meal')">{{$t("1 meal")}}</option>
      <option :value="$t('Heal potion')">{{$t("Heal potion")}}</option>
    </select>
  </div>
</Section>
</template>

<script>
import Vue from "vue";
import { mapper } from "./utils";
import Section from "./Section.vue";

const Component = Vue.extend(mapper(["backpack"], {
  components: {
    Section,
  },

  data() {
    return {
      items: [null, null, null, null, null, null, null, null],
    }
  },

  watch: {
    items: function(data) {
      const i = data.findIndex((e) => e);
      if (i> 0) {
        Vue.set(this.backpack, i, data[i]);
        Vue.set(this.items, i, null);
      }
    },
  }

}));

export default Component;
</script>

<i18n>
{
  "en": {
    "Backpack": "Backpack",
    "1 meal": "1 meal",
    "Heal potion": "Heal potion"
  },
  "fr": {
    "1 meal": "1 repas",
    "Heal potion": "Potion de guérison"
  }
}
</i18n>
