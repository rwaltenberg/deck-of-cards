<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  get title (): string {
    return this.$route.meta.title
  }
}
</script>

<template>
  <div id="app">
    <header>
      <h1>{{ title }}</h1>
    </header>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<style lang="scss">
html {
  font-size: 16px;
}

body {
  background-color: #E1F2F6;
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

#app {
  color: #2E2E2E;

  header {
    background: #457d0f;
    background: linear-gradient(to right, #457d0f 0%,#366109 100%);
    color: #F1E622;
    padding: rem(50px) 0 rem(40px);
    text-align: center;

    h1 {
      margin: 0;
      font-size: rem(46px);
      line-height: 1;
      letter-spacing: rem(2px);
    }
  }
}
</style>
