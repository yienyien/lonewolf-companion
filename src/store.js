import Vuex from "vuex";
import Vue from "vue";

function save(state, snapshotId) {
  if (!state.db) return;
  const s = { ...state };
  delete s["db"];
  delete s["backup"];
  let ref = state.db;
  if (snapshotId) {
    ref = ref.child(`backup/${snapshotId}`);
  }
  ref.update(s);
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
    order: {
      disciplines: 1,
      weapons: 2,
      backpack: 3,
      special: 4,
      pouch: 5,
      attributes: 6,
      combat: 7,
      backup: 8,
      options: 9,
    },
    lang: "en",
    dragSectionFrom: null,
    dragSectionTo: null,
    backup: [],
  };

  function getSetters() {
    const setters = {};
    Object.keys(state).forEach((key) => {
      setters[key] = (state, v, notSave) => {
        state[key] = v;
        if (key !== "db" && !key.startsWith("drag") && !notSave) {
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
      doBackup(state) {
        const ts = new Date().getTime();
        save(state, ts);
        const bstate = { ...state };
        delete bstate["backup"];
        Vue.set(state.backup, ts, bstate);
      },
      delBackup(state, snapshotId) {
        Vue.delete(state.backup, snapshotId);
        console.log("ici");
        state.db.child(`backup/${snapshotId}`).remove();
      },
    },
    actions: {
      load({ commit, state }, snapshotId) {
        if (state.db) {
          let ref = state.db;
          if (snapshotId) {
            ref = ref.child(`backup/${snapshotId}`);
          }

          ref.once("value").then((snap) => {
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
