<template>
  <div>
    <div>Chapter: <input type="number" v-model.number="chapter"/></div>
    <div>Notes:
      <input type="textarea" v-model.lazy="notes"/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapStates } from "./utils.js";

const Component = Vue.extend({
  computed: mapStates("chapter", "notes"),

});

export default Component;
</script>
