<template>
<div class="background" v-bind:style="{height: height + 'px'}">
  <div class="row rtop">
    <div class="bgtile xfixed yfixed bg1"/>
    <div class="bgtile xstresh yfixed bg2"/>
    <div class="bgtile xfixed yfixed bg3"/>
  </div>
  <div class="row rmiddle">
    <div class="bgtile xfixed ystresh bg4"/>
    <div class="bgtile xstresh ystresh bg5"/>
    <div class="bgtile xfixed ystresh bg6"/>
  </div>
  <div class="row rbottom">
    <div class="bgtile xfixed yfixed bg7"/>
    <div class="bgtile xstresh yfixed bg8"/>
    <div class="bgtile xfixed yfixed bg9"/>
  </div>
</div>
</template>
<script>
import Vue from "vue";
const Background = Vue.extend({
  props: ['height'],

  
});

export default Background;
</script>
<style>

.background {
    width: 100%;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
}

.row {
    display: grid;    
    grid-template-columns: 150px 1fr 150px;
}

.rtop, .rbottom {
    height: 100px;
}

.rmiddle {
    height: calc(100vh - 200px);
    min-height: calc(100% - 200px);
}

.xfixed {
    background-size: 100%;
}

.xstresh {
    background-repeat: repeat-x;
}


@media (min-width: 450px) {
    .xstresh {
        background-size: contain;
    }
}

@media (max-width: 450px) {
    .xstresh {
        background-size: cover;
    }
}

.bg1 {
    background-image: url("top-left.png");
}

.bg2 {
    background-image: url("xstresh-top2.jpg");
}

.bg3 {
    background-image: url("top-right.png");
}

.bg4 {
    background-image: url("ystresh-left2.jpg");
}

.bg6 {
    background-image: url("ystresh-right2.jpg");    
}

.bg7 {
    background-image: url("bottom-left.png");    
}

.bg8 {
    background-image: url("xstresh-bottom2.jpg");        
}

.bg9 {
    background-image: url("bottom-right.png");
}
  
</style>
