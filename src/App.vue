<template>
  <div id="app">
    <NavbarView />
    <router-view></router-view>
  </div>
</template>

<script>

import NavbarView from '../src/components/NavbarView.vue'


export default {
  components: {
    NavbarView,
  },
  
};
</script>
