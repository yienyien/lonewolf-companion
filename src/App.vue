<template>
  <div id="app">
    <Main v-resize="onResize" />
    <Background :height="height" />
  </div>
</template>

<script>
import Main from "./components/Main.vue";
import Background from "./components/Background.vue";

export default {
  name: "App",
  components: {
    Main,
    Background,
  },
  data() {
    return {
      height: 0,
    };
  },

  created: function () {
    window.addEventListener("beforeunload", this.beforeWindowUnload);
  },

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.beforeWindowUnload);
  },

  mounted() {
    this.height = 0;
  },
  methods: {
    onResize({ height }) {
      this.height = height;
    },
    beforeWindowUnload: () => {
      return (event.returnValue = "Foobar");
    },
  },
};
</script>

<style>
html {
  padding: 0;
}
</style>
