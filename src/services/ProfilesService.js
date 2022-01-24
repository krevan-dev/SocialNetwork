import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService {
  async getProfile(id) {
    const res = await api.get(`api/profiles/${id}`)
    AppState.activeProfile = res.data
  }

  async getProfilePosts(id) {
    const res = await api.get(`api/profiles/${id}/posts`)
    logger.log(res.data.posts)
    AppState.activePosts = res.data.posts
    AppState.totalPages = res.data.totalPages
  }
}

export const profilesService = new ProfilesService()