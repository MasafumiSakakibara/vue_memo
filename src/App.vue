<template>
  <div id="grobal_container">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header';
export default {
  components: {
    Header,
  },
};
</script>

<style>
#grobal_container {
  margin: 0;
  font-family: 'Oswald', sans-serif;
}
</style>
