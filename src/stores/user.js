import { defineStore } from "pinia";
import { api } from "boot/axios";
import { router } from "src/router";

export const userStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  getters: {},
  actions: {
    async loginUser(email, password) {
      try {
        const response = await api.post("/login", { email, password });

        if (response.status === 200) {
          this.user = response.data.user;
          localStorage.setItem('app_toDo_token', `Bearer ${response.data.token}`)
          router.push({ name: 'TaskPage' });
        } else {
          return response
        }
      } catch (error) {
        return error;
      }
    },

    async register(name, email, password) {
      try {
        const response = await api.post("/register", { name, email, password });
        this.user = response.data.user;
        return response.data
      } catch (error) {
        return error;
      }
    },



    async getUser() {
      try {
        const response = await api.get("/profile");
        this.user = response.data.result.user;
      } catch (error) {
        return error;
      }
    },

    logOut() {
      const token = localStorage.getItem("app_toDo_token");
      if (token) {
        localStorage.removeItem('app_toDo_token')
      }
      router.push({ name: "LoginPage" });
      this.user = null;
    },
  },
});
