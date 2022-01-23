<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-7">
        <NewPost v-if="account.id"/>
        <Post v-for="p in posts" :key="p.id" :post="p"/>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import {postsService} from '../services/PostsService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await postsService.getPosts();
      } catch (error) {
        Pop.toast(error.message, "error")
        logger.log(error)
      }
    })
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
    }
  }
}
</script>

<style scoped lang="scss">

</style>
