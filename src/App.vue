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
        <div class="col-7">
          <router-view />
        </div>
        <div class="col-3">
          <!-- <Ads /> -->
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
import Pop from './utils/Pop'
import { logger } from './utils/Logger'
import { adsService } from './services/AdsService'
export default {
  name: 'App',
  setup() {
    // try {
    //   await adsService.getAds()
    // } catch (error) {
    //   Pop.toast (error.message, "error")
    //   logger.log(error)
    // }
    return {
      appState: computed(() => AppState),
      ad: computed(() => AppState)
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
