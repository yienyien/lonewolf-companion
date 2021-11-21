import Vue from "vue";
import Vuex from "vuex";
import VueResizeObserver from "vue-resize-observer";

import App from "./App.vue";
import newStore from "./store.js";

import firebase from "firebase/app";
import i18n from "./i18n";

const firebaseConfig = {
  apiKey: "AIzaSyB20KqyJblsycEV7LBkQKNFggP8y9ElO8o",
  authDomain: "ldveh-cc79c.firebaseapp.com",
  databaseURL:
    "https://ldveh-cc79c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ldveh-cc79c",
  storageBucket: "ldveh-cc79c.appspot.com",
  messagingSenderId: "268021855047",
  appId: "1:268021855047:web:664192ca28e5a8433c5262",
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueResizeObserver);

new Vue({
  render: (h) => h(App),
  i18n,
  store: newStore,
}).$mount("#app");
