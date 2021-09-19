<template>
  <div id="app">
    <Main v-resize="onResize"/>
    <Background :height="height"/>
  </div>
</template>

<script>
import Main from './components/Main.vue'
import Background from './components/Background.vue'



export default {
  name: 'App',
  components: {
    Main,
    Background,
  },
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    this.height = 0;
  },
  methods: {
    onResize({height}) {
      this.height = height;
    }
  }

}
</script>


<style>
html {
    padding: 0;
}
</style>
