<template>
<div>
  <div v-for="index in size" :key="index" class="list">
    <span class="index">{{index}}</span>

    <select class="discipline" v-model="disciplines[index-1]">
      <option></option>
      <option value="camouflage">Le camouflage</option>
      <option value="hunting">La chasse (dispensé de manger)</option>
      <option value="sixthsense">Le sixième sens</option>
      <option value="tracking">L'orientation</option>
      <option value="healing">La guérison (+1E / § sans combat)</option>
      <option value="weaponskill-0">La maitrise des armes - Poignard</option>
      <option value="weaponskill-1">La maitrise des armes - Lance</option>
      <option value="weaponskill-2">La maitrise des armes - Masse d'armes</option>
      <option value="weaponskill-3">La maitrise des armes - Sabre</option>
      <option value="weaponskill-4">La maitrise des armes - Marteau de guerre</option>
      <option value="weaponskill-5">La maitrise des armes - Epée</option>
      <option value="weaponskill-6">La maitrise des armes - Hache</option>
      <option value="weaponskill-7">La maitrise des armes - Epée</option>
      <option value="weaponskill-8">La maitrise des armes - Baton</option>
      <option value="weaponskill-9">La maitrise des armes - Glaive</option>
      <option value="mindshield">Le bouclier psychique</option>
      <option value="mindblast">Puissance psychique (+2H)</option>
      <option value="animalkinship">Communication animale</option>
      <option value="mindovermatter">Maitrise psychique de la matière</option>
    </select>
  </div>
  <div class="center">
    <button class="w80" type="button" v-on:click="ndisciplines+=1">+</button>
  </div>
</div>
</template>

<script>
import Vue from "vue";
import { mapState } from 'vuex';

const Component = Vue.extend({
  data() {
    return {
      ndisciplines: 0,
    }
  },

  computed: {
    ...mapState(['disciplines']),
    size: function() {
      const s = Math.max(...Object.keys(this.disciplines)) + 1 + this.ndisciplines;
      return s;
    }
  },

  watch: {
    disciplines: function(v) {
      this.$store.commit("disciplines", v);
    },
  }
});

export default Component;
</script>

<style>
.discipline {
    width: 100%
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
