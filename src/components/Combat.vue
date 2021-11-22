<template>
  <Section title="Combats" id="combat">
    <div class="live">
      <div class="dice-container" v-on:click="random">
        <div class="dice" v-bind:class="roll">
          <span>
            {{ diceValue }}
          </span>
        </div>
      </div>
      <div class="live-endurance">
        <div>
          <img class="live-endurance-icon" src="life.png" v-bind:class="beat" />
        </div>
        <div class="live-endurance-value">
          {{ endurance + enduranceModificator - wounds }}
        </div>
        <div>
          <button
            class="wound-modificator"
            type="button"
            v-on:click="addWounds(-1)"
          >
            +
          </button>
          <button
            class="wound-modificator"
            type="button"
            v-on:click="addWounds(+1)"
          >
            -
          </button>
        </div>
      </div>
    </div>
    <div class="combat-sheet">
      <h2></h2>
      <h2>{{ $t("Combat skill") }}</h2>
      <h2>{{ $t("Endurance") }}</h2>
      <h2>{{ $t("Ratio") }}</h2>
      <button type="button" v-on:click="fight">{{ $t("Round") }}</button>
      <input type="number" v-model.number="enemySkill" />
      <input type="number" v-model.number="enemyEndurance" />
      <input
        type="number"
        readonly
        :value="combatSkill + combatSkillModificator - enemySkill"
      />
    </div>
  </Section>
</template>

<script>
import Vue from "vue";
import { mapStates } from "./utils.js";
import Section from "./Section.vue";

const t = Infinity;

const woundsTable = [
  [
    [0, t],
    [0, t],
    [0, 8],
    [0, 8],
    [1, 7],
    [2, 6],
    [3, 5],
    [4, 4],
    [5, 3],
    [6, 0],
  ],
  [
    [0, t],
    [0, 8],
    [0, 7],
    [1, 7],
    [2, 6],
    [3, 6],
    [4, 5],
    [5, 4],
    [6, 3],
    [7, 0],
  ],
  [
    [0, 8],
    [0, 7],
    [1, 6],
    [2, 6],
    [3, 5],
    [4, 5],
    [5, 4],
    [6, 3],
    [7, 2],
    [8, 0],
  ],
  [
    [0, 6],
    [1, 6],
    [2, 5],
    [3, 5],
    [4, 4],
    [5, 4],
    [6, 3],
    [7, 2],
    [8, 0],
    [9, 0],
  ],
  [
    [1, 6],
    [2, 5],
    [3, 5],
    [4, 4],
    [5, 4],
    [6, 3],
    [7, 2],
    [8, 1],
    [9, 0],
    [10, 0],
  ],
  [
    [2, 5],
    [3, 5],
    [4, 4],
    [5, 4],
    [6, 3],
    [7, 2],
    [8, 2],
    [9, 1],
    [10, 0],
    [11, 0],
  ],
  [
    [3, 5],
    [4, 4],
    [5, 4],
    [6, 3],
    [7, 2],
    [8, 2],
    [9, 1],
    [10, 0],
    [11, 0],
    [12, 0],
  ],
  [
    [4, 5],
    [5, 4],
    [6, 3],
    [7, 3],
    [8, 2],
    [9, 2],
    [10, 1],
    [11, 0],
    [12, 0],
    [14, 0],
  ],
  [
    [5, 4],
    [6, 3],
    [7, 3],
    [8, 2],
    [9, 2],
    [10, 2],
    [11, 1],
    [12, 0],
    [14, 0],
    [16, 0],
  ],
  [
    [6, 4],
    [7, 3],
    [8, 3],
    [9, 2],
    [10, 2],
    [11, 1],
    [12, 0],
    [14, 0],
    [16, 0],
    [18, 0],
  ],
  [
    [7, 4],
    [8, 3],
    [9, 2],
    [10, 2],
    [11, 2],
    [12, 1],
    [14, 0],
    [16, 0],
    [18, 0],
    [t, 0],
  ],
  [
    [8, 3],
    [9, 3],
    [10, 2],
    [11, 2],
    [12, 2],
    [14, 1],
    [16, 0],
    [18, 0],
    [t, 0],
    [t, 0],
  ],
  [
    [9, 3],
    [10, 2],
    [11, 2],
    [12, 2],
    [14, 1],
    [16, 1],
    [18, 0],
    [t, 0],
    [t, 0],
    [t, 0],
  ],
];

function resolution(ratio, dice) {
  if (ratio < -11) ratio = -11;
  if (ratio > 11) ratio = 11;
  ratio = ratio / 2;
  ratio = ratio > 0 ? Math.ceil(ratio) : Math.floor(ratio);
  ratio = ratio + 6;

  dice = dice - 1;
  if (dice < 0) dice = 9;

  const wounds = woundsTable[ratio][dice];

  return wounds;
}

const Component = Vue.extend({
  components: {
    Section,
  },

  data() {
    return {
      roll: false,
      beat: false,
    };
  },

  computed: mapStates(
    "diceValue",
    "enemySkill",
    "enemyEndurance",
    "combatSkill",
    "combatSkillModificator",
    "wounds",
    "endurance",
    "enduranceModificator"
  ),

  methods: {
    random: function () {
      var audio = new Audio("dice.wav"); // path to file
      audio.play();
      this.roll = "roll";
      setTimeout(() => {
        window.navigator.vibrate(100);
        this.roll = false;
        this.diceValue = Math.floor(Math.random() * 10);
      }, 300);
    },
    addWounds: function (v) {
      this.$store.commit("addWounds", v);
      this.beat = "beat";
      setTimeout(() => {
        this.beat = false;
      }, 1000);
    },
    fight: function () {
      const [enemyWounds, wounds] = resolution(
        this.combatSkill + this.combatSkillModificator - this.enemySkill,
        this.diceValue
      );
      this.enemyEndurance = Math.max(0, this.enemyEndurance - enemyWounds);
      this.addWounds(wounds);
    },
  },
});

export default Component;
</script>

<i18n>
{
  "en": {
    "Ratio": "Ratio",
    "Combat skill": "Combat skill",
    "Endurance": "Endurance",
    "Round": "Fight"
  },
  "fr": {
    "Ratio": "Quotient",
    "Combat skill": "Habilité",
    "Endurance": "Endurance",
    "Round": "Combatre"
  }
}
</i18n>

<style>
.dice-container {
  padding-left: calc(50% - 31px);
}

.roll {
  animation: 0.1s linear 0s infinite alternate roll;
}

@keyframes roll {
  from {
    margin-left: -15%;
  }
  to {
    margin-left: 15%;
  }
}

.beat {
  animation: 0.3s ease-in-out 0s infinite alternate beat;
}

@keyframes beat {
  from {
    padding-left: 15px;
    padding-top: calc(50% + 5px);
    width: 10px;
    height: 10px;
  }
  to {
    padding-left: 0;
    padding-top: calc(50% - 10px);
    width: 40px;
    height: 40px;
  }
}

.dice {
  width: 40px;
  height: 40px;
  background-color: white;
  padding: 0px 10px 20px 10px;
  text-align: center;
  line-height: 40px;
  font-size: 3em;
  background-image: url("d10-2.svg");
}

.dice span {
  color: white;
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
  grid-template-columns: 120px 1fr;
  grid-gap: 0px;
  grid-auto-rows: minmax(15px, auto);
}

.live-endurance {
  display: grid;
  grid-template-columns: 40px 80px 1fr;
  grid-gap: 0px;
  grid-auto-rows: minmax(15px, auto);
}

.live-endurance-icon {
  padding-top: calc(50% - 10px);
  width: 40px;
  height: 40px;
}

.live-endurance-value {
  height: 40px;
  text-align: center;
  padding: 10px;
  font-size: 6em;
  line-height: 40px;
}

.wound-modificator {
  width: 50%;
  height: 100%;
}
</style>
