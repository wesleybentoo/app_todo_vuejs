import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const taskStore = defineStore('task', {
  state: () => ({}),
  getters: {},
  actions: {
    async getAll() {
      try {
        const response = await api.get('/tasks/all')

        if (response.status === 200) {
          return response?.data
        } else {
          return []
        }
      } catch (error) {
        return error
      }
    },

    async getSearch(search, status, category, order) {
      try {

        console.log("search:", search)
        console.log("status:", status)
        console.log("category:", category)
        console.log("order:", order)

        return await api.get('/tasks')
      } catch (error) {
        return error
      }
    },

    async setShow(id) {
      try {
        return await api.get('/tasks/' + id)
      } catch (error) {
        return error
      }
    },

    async setCreated(data) {
      try {
        const params = {
          "name": data.name,
          "description": data.description,
          "status_id": data.status_id.id,
          "category_id": data.category_id.id,
          "due_date": data.due_date
        }
        return await api.post('/tasks', params)
      } catch (error) {
        return error?.response?.data
      }
    },

    async setUpdated(id, data) {
      try {
        const params = {
          "name": data.name,
          "description": data.description,
          "status_id": data.status_id.id,
          "category_id": data.category_id.id,
          "due_date": data.due_date
        }
        return await api.put('/tasks/' + id, params)
      } catch (error) {
        return error
      }
    },

    async setDeleted(id) {
      try {
        return await api.delete('/tasks/' + id)
      } catch (error) {
        return error
      }
    },

    async setDeletedAll() {
      try {
        return await api.delete('/tasks')
      } catch (error) {
        return error
      }
    }
  },

});
