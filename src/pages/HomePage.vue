<template>
    <div class="mx-2">
      <NewPost v-if="account.id"/>
      <Post v-for="p in posts" :key="p.id" :post="p"/>
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
