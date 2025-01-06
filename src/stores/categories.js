import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const categoriesStore = defineStore('categories', {
  state: () => ({}),
  getters: {},
  actions: {
    async getAll() {
      try {
        const response = await api.get('/categories/all')

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
        return await api.get('/categories/' + id)
      } catch (error) {
        return error
      }
    },

    async setCreated(data) {
      try {
        return await api.post('/categories', data)
      } catch (error) {
        return error
      }
    },

    async setUpdated(id, data) {
      try {
        return await api.put('/categories/' + id, data)
      } catch (error) {
        return error
      }
    },

    async setDeleted(id) {
      try {
        return await api.delete('/categories/' + id)
      } catch (error) {
        return error
      }
    },

    async setDeletedAll() {
      try {
        return await api.delete('/categories')
      } catch (error) {
        return error
      }
    }
  },

});
