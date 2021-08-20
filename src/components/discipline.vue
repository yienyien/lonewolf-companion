<template>
  <div>
    <h1>Disciplines Kaï</h1>
    <div v-for="index in 5" :key="index">
      <select class="discipline" v-model="disciplines[index-1]">
        <option></option>
        <option value="camouflage">Le camouflage</option>
        <option value="hunting">La chasse</option>
        <option value="sixthsense">Le sixième sens</option>
        <option value="tracking">L'orientation</option>
        <option value="healing">La guérison</option>
        <option value="weponskill">La maitrise des armes</option>
        <option value="mindshield">Le bouclier psychique</option>
        <option value="mindblast">Puissance psychique</option>
        <option value="animalkinship">Communication animale</option>
        <option value="mindovermatter">Maitrise psychique de la matière</option>
      </select>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

const Component = Vue.extend({
  props: ["db"],
  
  data() {
    return {
      disciplines: [
        null,
        null,
        null,
        null,
        null,
      ]
    }
  },
  watch: {
    disciplines: function() {
      this.db.child('disciplines').set(this.disciplines);
    },
    db: function(newdb) {
      newdb.child('disciplines').once('value').then((snap) => {
        const disciplines = snap.val();
        if (disciplines) {
          this.disciplines = disciplines;
        }
      });
    }
  }
});

export default Component;
</script>

<style>
.discipline {
    width: 100%
}
</style>
