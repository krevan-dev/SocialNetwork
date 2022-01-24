<template>
  <div class="row">
    <div class="card bg-dark text-white mt-2">
      <img :src="profile.coverImg" class="my-2 card-img card-img-top" alt="...">
      <div class="card-img-overlay d-flex">
        <div>
          <img :src="profile.picture" class="profilePic rounded" alt="">
        </div>
        <div class="ms-2 d-flex justify-content-between">
          <div>
            <h4 class="card-title">{{profile.name}}</h4>
            <h6 class="card-title">{{profile.email}}</h6>
            <p class="card-text">{{profile.bio}}</p>
          </div>
          <div>
            <button class="btn btn-outline-warning rounded-pill">
              <i class="mdi mdi-pencil"></i>
            </button>
          </div>
        </div>
      </div>
    <div>
      <h5>Github: </h5><span>{{profile.github}}</span>
      <h5>LinkedIn: </h5><span>{{profile.linkedin}}</span>
    </div>
    </div>
  </div>
  <NewPost v-if="account.id" />
    <div div class="d-flex justify-content-center" v-if="totalPages > 1">
      <button class="btn btn-primary m-1" v-for="p in totalPages" :key="p" @click="getPage(p)">{{ p }}</button>
    </div>
  <Post v-for="p in activePosts" :key="p.id" :post="p" />
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService';
import { useRoute } from 'vue-router';
import { onMounted, watchEffect } from '@vue/runtime-core';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
export default {
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  setup(){
    onMounted(async () => {
      try {
        await profilesService.getProfilePosts(route.params.id)
      } catch (error) {
        Pop.toast(error.message, "error")
        logger.log(error)
      }
    })
    const route = useRoute();
    watchEffect(async () => {
      if (route.name == "Profile") {
        await profilesService.getProfile(route.params.id)
      }
    })
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.activeProfile),
      activePosts: computed(() => AppState.activePosts),
      posts: computed(() => AppState.posts),
      totalPages: computed(() => AppState.totalPages),
      async getPage(page) {
        try {
          await postsService.getPage(page)
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.profilePic {
  height: 10rem;
  width: 10rem;
}

.card-img-top {
  width: 100%;
  height: 19vh;
  object-fit: cover;
}
</style>