import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const statusStore = defineStore('status', {
  state: () => ({}),
  getters: {},
  actions: {
    async getAll() {
      try {
        const response =  await api.get('/statuses/all')
        
        if (response.status === 200) {
          return response.data
        } else {
          return []
        }
      } catch (error) {
        return error
      }
    },

    async setShow(id) {
      try {
        return await api.get('/statuses/' + id)
      } catch (error) {
        return error
      }
    },

    async setCreated(data) {
      try {
        return await api.post('/statuses', data)
      } catch (error) {
        return error
      }
    },

    async setUpdated(id, data) {
      try {
        return await api.put('/statuses/' + id, data)
      } catch (error) {
        return error
      }
    },

    async setDeleted(id) {
      try {
        return await api.delete('/statuses/' + id)
      } catch (error) {
        return error
      }
    },

    async setDeletedAll() {
      try {
        return await api.delete('/statuses')
      } catch (error) {
        return error
      }
    }
  },

});
