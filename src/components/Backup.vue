<template>
<div class="backup-container">
  <h2>Chapter:</h2>
  <h2>Notes</h2>
  <input class="chapter" type="number" v-model.number="chapter"/>
  <textarea v-model.lazy="notes"/>
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

<style>
.backup-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px;
    grid-auto-rows: minmax(30px, auto);
}

.chapter {
    text-align: center;
}


.backup-container input {
    width: 100%;
    height: 40px;
}
</style>
