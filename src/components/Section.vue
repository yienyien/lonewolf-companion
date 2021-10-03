<template>
  <div>
    <h1 v-on:click="toggle"><span class="monospace">{{ sections[0] ? "+": "-"}}</span> {{title}}</h1>
    <div v-if="sections[name]">
      <slot></slot>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import { mapper } from "./utils.js";

const Component = Vue.extend(mapper(["sections"], {
  props: ["title", "name"],

  methods: {
    toggle() {
      Vue.set(this.sections, this.name, !this.sections[this.name]);
    }
  }
}));

export default Component;
</script>

<style>
</style>

