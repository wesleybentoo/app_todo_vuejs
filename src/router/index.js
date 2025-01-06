import { route } from "quasar/wrappers";
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { userStore } from 'src/stores/user'

/*export default defineRouter(function (/!* { store, ssrContext } *!/) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  router.beforeEach((to, from, next) => {
    /!*const authStore = useAuthStore();
    const isAuthenticated = !!authStore.token;*!/
    const isAuthenticated = false

    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  });

  return router
})*/
const createHistory = process.env.SERVER
  ? createMemoryHistory
  : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createHistory(process.env.VUE_ROUTER_BASE),
});

export default route(function({ store /*, ssrContext */ }) {
  router.beforeEach(async (to, from, next)=>{

    const token = localStorage.getItem('app_toDo_token')

    if (to.matched.some((record) => record.meta.requireAuth)) {
      if (!token) {
        next('/login')
      } else {
        const user_store = userStore(store)
        await user_store.getUser()
      }
    }

    next()
  });

  router.afterEach((to, from) => {
    console.log("to.path", to.path)
    console.log("from.path", from.path)
  });

  return router;
});

export { router }

