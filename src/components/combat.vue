<template>
  <div>
    <h1>Combat</h1>
    <div class="live">
      <div class="dice" v-on:click="random">
        {{ diceValue }}
      </div>
      <div class="live-endurance">
        <div class="live-endurance-value">
          {{ endurance - wounds }}
        </div>
        <div>>
          <button type="button" v-on:click="wounds -=1">+</button>
          <button type="button" v-on:click="wounds +=1">-</button>
        </div>
      </div>
    </div>
    <div class="combat-sheet">
      <h2>PLop</h2>
      <h2>Habileté</h2>
      <h2>Endurance</h2>
      <h2>Quotient</h2>
      <button type="button" v-on:click="fight">Appliquer</button>
      <input type="number" v-model.number="enemySkill"/>
      <input type="number" v-model.number="enemyEndurance"/>
      <input type="number" readonly :value="combatSkill - enemySkill"/>      
    </div>
  </div>
</template>

<script>
import Vue from "vue";

const t = Infinity;

const woundsTable = [
  [[0, t], [0, t], [0, 8], [0, 8], [1, 7], [2, 6], [3, 5], [4, 4], [5, 3], [6, 0]],
  [[0, t], [0, 8], [0, 7], [1, 7], [2, 6], [3, 6], [4, 5], [5, 4], [6, 3], [7, 0]],
  [[0, 8], [0, 7], [1, 6], [2, 6], [3, 5], [4, 5], [5, 4], [6, 3], [7, 2], [8, 0]],
  [[0, 6], [1, 6], [2, 5], [3, 5], [4, 4], [5, 4], [6, 3], [7, 2], [8, 0], [9, 0]],
  [[1, 6], [2, 5], [3, 5], [4, 4], [5, 4], [6, 3], [7, 2], [8, 1], [9, 0], [10, 0]],
  [[2, 5], [3, 5], [4, 4], [5, 4], [6, 3], [7, 2], [8, 2], [9, 1], [10, 0], [11, 0]],
  [[3, 5], [4, 4], [5, 4], [6, 3], [7, 2], [8, 2], [9, 1], [10, 0], [11, 0], [12, 0]],
  [[4, 5], [5, 4], [6, 3], [7, 3], [8, 2], [9, 2], [10, 1], [11, 0], [12, 0], [14, 0]],
  [[5, 4], [6, 3], [7, 3], [8, 2], [9, 2], [10, 2], [11, 1], [12, 0], [14, 0], [16, 0]],
  [[6, 4], [7, 3], [8, 3], [9, 2], [10, 2], [11, 1], [12, 0], [14, 0], [16, 0], [18, 0]],
  [[7, 4], [8, 3], [9, 2], [10, 2], [11, 2], [12, 1], [14, 0], [16, 0], [18, 0], [t, 0]],
  [[8, 3], [9, 3], [10, 2], [11, 2], [12, 2], [14, 1], [16, 0], [18, 0], [t, 0], [t, 0]],
  [[9, 3], [10, 2], [11, 2], [12, 2], [14, 1], [16, 1], [18, 0], [t, 0], [t, 0], [t, 0]]
];
    

function resolution(ratio, dice) {
  if (ratio < -11) ratio = -11;
  if (ratio > 11) ratio = 11;
  ratio = ratio / 2;
  ratio = (ratio > 0)? Math.ceil(ratio) : Math.floor(ratio);
  ratio = ratio + 6;

  dice = (dice -1)
  if (dice < 0) dice = 9;
  
  const wounds = woundsTable[ratio][dice]

  
  return wounds;
}


const Component = Vue.extend({
  props: [ "db", "combatSkill", "endurance" ],
  
  data() {
    return {
      diceValue: 0,
      enemySkill: 0,
      enemyEndurance: 0,
      wounds: 0,
    }
  },
  
  methods: {
    random: function() {
      this.diceValue = Math.floor(Math.random() * 10);
    },
    fight: function() {
      const [enemyWounds, wounds] = resolution(this.combatSkill - this.enemySkill, this.diceValue);
      this.enemyEndurance -= enemyWounds;
      this.wounds += wounds;
      this.$emit('input', this.wounds);
    },
  },

  watch: {
    diceValue: function(v) {
      this.db.update({"combat/diceValue": v});
    },
    enemySkill: function(v) {
      this.db.update({"combat/enemySkill": v});
    },
    enemyEndurance: function(v) {
      this.db.update({"combat/enemyEndurance": v});
    },
    wounds: function(v) {
      this.db.update({"combat/wounds": v});
    },

    db: function(newdb) {
      newdb.child('combat').once('value').then((snap) => {
        const combat = snap.val();
        if (combat) {
          this.diceValue = combat.diceValue || 0;
          this.enemySkill = combat.enemySkill || 0;
          this.enemyEndurance = combat.enemyEndurance || 0;
          this.wounds = combat.wounds || 0;
        }
      });
    }
  }
});

export default Component;
</script>

<style>
.dice {
    width: 100%;
    height: 40px;
    background-color: WhiteSmoke;
    text-align: center;
    line-height: 40px;
    font-size: 6em;
}

.combat-sheet h2 {
    text-align: center;
}
.combat-sheet input {
    text-align: center;
    border: 0;
    width: 100%;
}

.combat-sheet {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5px;
    grid-auto-rows: minmax(15px, auto);    
}

.live {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0px;
    grid-auto-rows: minmax(15px, auto);        
}

.live-endurance {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0px;
    grid-auto-rows: minmax(15px, auto);        
}

.live-endurance-value {
    height: 40px;    
    text-align: center;
    font-size: 6em;
    line-height: 40px;    
}
</style>
