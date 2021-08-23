<template>
<textarea class="backpack-text" v-model.lazy="specialItems">
</textarea>
</template>

<script>
import Vue from "vue";
import { mapStates } from "./utils.js";

const Component = Vue.extend({

  computed: mapStates("specialItems"),
  
});

export default Component;
</script>

<style>
</style>
