import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class PostsService {
  async getPosts(query = '') {
    const res = await api.get('api/posts' + query)
    AppState.posts = res.data.posts
  }

  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    AppState.posts.unshift(res.data)
  }

  // async editPost(updatedPost) {
  //   const res = await api.put('api/posts/' + updatedPost.id, updatedPost)
  //   logger.log(res.data)
  // }

  async likePost(post) {
    const res = await api.post('api/posts/' + post.id + '/like')
    logger.log(res.data)
    AppState.likes = res.data.likes
    Pop.toast('Post Liked!')
  }

  async deletePost(postToDelete) {
    const remove = await Pop.confirm('Are you sure you want to delete your post?')
    if (!remove) {
      return
    }
    await api.delete('api/posts/' + postToDelete.id)
    const pIndex = AppState.posts.findIndex(p => p.id == postToDelete.id)
    AppState.posts.splice(pIndex, 1)
    Pop.toast('Post Deleted Successfully!')
  }

}

export const postsService = new PostsService()