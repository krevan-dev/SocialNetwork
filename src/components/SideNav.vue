<template>
  <div class="sidebar d-md-flex flex-column justify-content-between bg-dark d-none d-md-block">
    <div class="top-part ms-3 mt-3">
      <img :src="account.picture" class="rounded-circle mb-3">
      <h5>{{account.name}}</h5>
      <h5>{{account.email}}</h5>
    </div>
    <div class="bottom-part">
      <Auth />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  setup(){
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
img {
  height: 10rem;
  width: 10rem;
}
</style>