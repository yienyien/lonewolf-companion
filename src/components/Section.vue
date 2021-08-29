<template>
  <div>
    <h1 v-on:click="fold = !fold"><span class="monospace">{{ fold ? "+": "-"}}</span> {{title}}</h1>
    <div v-if="!fold">
      <slot></slot>
    </div>
  </div>
</template>


<script>
import Vue from "vue";

const Component = Vue.extend({
  props: ["db", "title"],

  data() {
    return {
      fold: true,
    }
  },
});

export default Component;
</script>

<style>
</style>

