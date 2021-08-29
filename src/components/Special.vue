<template>
<textarea class="backpack-text" rows="4" v-model.lazy="specialItems">
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
.backpack-text {
    width: 100%;
}
</style>
