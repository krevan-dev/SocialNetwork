<template>
  <div class="component">
    <div class="card mb-3 mt-3" style="min-width: 540px;">
      <div class="row g-0">
        <div class="col-md-12">
          <div class="card-body">
            <h5 class="card-title">Create New Post</h5>
              <form @submit.prevent="createPost()">
                <div class="form-group mt-2">
                  <textarea type="text" class="form-control" placeholder="Post Body..." v-model="editable.body" required></textarea>
                </div>
                <div class="form-group mt-2">
                  <input type="url" placeholder="http://imgURL.com" class="form-control" name="imgUrl" id="imgUrl" v-model="editable.imgUrl" required>
                </div>
                <div class="form-group mt-2 d-flex justify-content-end">
                  <button class="btn btn-danger me-1">Cancel</button>
                  <button class="btn btn-success">Submit</button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from '@vue/reactivity';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  setup(){
    const editable = ref({})
    return {
      editable,
      async createPost() {
        try {
          await postsService.createPost(editable.value);
          editable.value = {};
          Pop.toast("Post Successful!")
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

</style>