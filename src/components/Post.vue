<template>
  <div class="row ">
    <div class="card my-2" style="min-width: 600px;">
      <div class="row">
        <div class="col-md-3">
          <img :src="post.creator.picture" class="ms-2 mt-3 creatorImg rounded-circle selectable" @click="goToProfile()" alt="...">
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">{{post.creator.name}}</h5>
            <p class="card-text">{{post.body}}</p>
            <img :src="post.imgUrl" class="img-fluid">
            <p class="card-text pt-2"><small class="text-muted">{{post.createdAt}}</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { useRouter } from 'vue-router'
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
        goToProfile(){ 
          router.push({
            name: "Profile",
            params: { id: props.post.creator.id }
          })
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