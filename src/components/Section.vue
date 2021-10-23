<template>
  <div :style="{order: order[id]}">
    <h1 @mousedown="dragMouseDown" @touchstart="dragMouseDown" @touchend="dragMouseUp" @mouseup="dragMouseUp" class="section-title" v-on:click="toggle" ><span class="monospace">{{ !sections[id] ? "+": "-"}}</span> {{title}}</h1>
    <div v-if="sections[id]">
      <slot></slot>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import { mapper } from "./utils.js";

const Component = Vue.extend(mapper(["sections", "order"], {
  props: ["title", "id"],

  methods: {
    toggle() {
      Vue.set(this.sections, this.id, !this.sections[this.id]);
    },
    dragMouseDown() {
      this.$store.commit("dragSectionFrom", this.id);
    },
    dragMouseUp() {
      this.$store.commit("dragSectionTo", this.id);
    }
  }


}));

export default Component;
</script>

<style>
.section-title {
    user-select: none;
}

.section-title:hover {
    background-color: lightgray;
}
</style>
