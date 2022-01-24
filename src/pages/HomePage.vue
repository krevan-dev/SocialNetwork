<template>
    <div class="mx-2">
      <form @submit.prevent="searchPosts()">
      <input type="text" class="form-control mt-2" placeholder="Search..." v-model="editable">
      </form>
      <NewPost v-if="account.id"/>
      <div class="d-flex justify-content-center" v-if="totalPages > 1">
        <button class="btn btn-primary m-1" v-for="p in totalPages" :key="p" @click="getPage(p)">{{ p }}</button>
      </div>
      <Post v-for="p in posts" :key="p.id" :post="p"/>
    </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { postsService } from '../services/PostsService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const editable = ref("");
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
      totalPages: computed(() => AppState.totalPages),
      async getPage(page) {
        try {
          await postsService.getPage(page)
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error)
        }
      },
      async searchPosts() {
        try {
          await postsService.searchPosts(editable.value);
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error)
        }
      },
      editable,
    }
  }
}
</script>

<style scoped lang="scss">

</style>
