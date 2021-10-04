<template>
<Section title="Sac à dos" id="backpack">
  <div v-for="index in 8" :key="index" class="list">
    <span class="index">{{index}}</span>
    <input type="text" v-model.lazy="backpack[index]"/>
    <select v-model="items[index]">
      <option value="1 repas">1 repas</option>
      <option value="Poition de guérison">Potion guérison</option>
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

<style>

</style>
