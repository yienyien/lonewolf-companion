import Vuex from "vuex";

function save(state) {
  if (!state.db) return;
  const s = { ...state };
  delete s["db"];
  state.db.update(s);
}

function newStore() {
  const state = {
    db: null,
    combatSkill: 0,
    endurance: 0,
    disciplines: [null, null, null, null, null],
    wounds: 0,
    backpack: [null, null, null, null, null, null, null, null],
    diceValue: 0,
    enemySkill: 0,
    enemyEndurance: 0,
    pouch: 0,
    specialItems: "",
    weapons: [null, null],
    chapter: 0,
    notes: "",
    sections: {},
    lang: "en",
  };

  function getSetters() {
    const setters = {};
    Object.keys(state).forEach((key) => {
      setters[key] = (state, v, notSave) => {
        state[key] = v;
        if (key !== "db" && !notSave) {
          save(state);
        }
      };
    });
    return setters;
  }

  return new Vuex.Store({
    state: state,

    mutations: {
      ...getSetters(),
      addWounds(state, value) {
        state.wounds = state.wounds + value;
        if (state.wounds > state.endurance) {
          state.wounds = state.endurance;
        } else if (state.wounds < 0) {
          state.wounds = 0;
        }
        save(state);
      },
    },
    actions: {
      load({ commit, state }) {
        if (state.db) {
          state.db.once("value").then((snap) => {
            const val = snap.val();
            if (val) {
              Object.entries(val).forEach(([key, value]) => {
                commit(key, value, true);
              });
            }
          });
        }
      },
    },
  });
}

export default newStore;
