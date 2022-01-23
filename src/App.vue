<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2">
          <SideNav/>
        </div>
        <div class="col-8">
          <router-view />
        </div>
        <div class="col-2">
          <!-- ads here -->
        </div>
      </div>
    </div>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 🩸💦😭 by <a href="https://www.github.com/krevan88" target="_blank">@Krevan88</a> 
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.sidebar {
  height: 95vh;
}
</style>
