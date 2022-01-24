<template>
  <div class="row">
    <div class="card my-2" style="min-width: 540px;">
      <div class="row">
        <div class="col-md-2">
          <img :src="post.creator.picture" class="ms-2 mt-3 creatorImg img-fluid rounded-circle selectable" @click="goToProfile()" alt="...">
        </div>
        <div class="col-md-10">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="card-title">{{post.creator.name}}</h5>
              <div v-if="post.creator.id == account.id">
                <!-- <small class="mx-1 selectable" ><i class="mdi mdi-pencil"></i></small> -->
                <small class="mx-1 selectable" @click="deletePost()"><i class="text-danger mdi mdi-trash-can-outline"></i></small>
              </div>
            </div>
            <p class="card-text">{{post.body}}</p>
            <img :src="post.imgUrl" class="img-fluid">
            <div class="d-flex justify-content-between align-items-end">
              <div v-if="account.id">
                <i class="selectable mdi mdi-thumb-up-outline" @click="likePost(post.id)"></i><span> - {{post.likes.length}}</span>
              </div>
              <div>
                <p class="card-text pt-4 text-muted"><small>Post updated: {{new Date(post.updatedAt).toLocaleString()}}</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router'
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props){
    const router = useRouter();
    return {
      account: computed(() => AppState.account),
      likes: computed(() => AppState.likes),
        goToProfile(){ 
          router.push({
            name: "Profile",
            params: { id: props.post.creator.id }
          })
        },
        async editPost(){
          try {
            await postsService.editPost({id: props.post.id})
          } catch (error) {
            Pop.toast(error.message, "error")
            logger.log(error)
          }
        },
        async likePost() {
          try {
            await postsService.likePost({id: props.post.id})
          } catch (error) {
            Pop.toast(error.message, "error")
            logger.log(error)
          }
        },
        async deletePost(){
          try {
            await postsService.deletePost({id: props.post.id})
          } catch (error) {
            Pop.toast(error.message, "error")
            logger.log(error)
          }
        },
        get Time() {
          return moment(this.createdAt).startOf('hour').fromNow()
        },
      router
    }
  }
}
</script>


<style lang="scss" scoped>
.creatorImg {
  height: 10rem;
  width: 10rem;
}
</style>