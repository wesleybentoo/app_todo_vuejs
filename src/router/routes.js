const routes = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: "Home",
        component: () => import('src/pages/IndexPage.vue'),
        meta: {
          title: "Home",
          requireAuth: true
        },
      }
    ]
  },
  {
    path: '/tasks',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: "TaskPage",
        component: () => import('src/pages/task/TaskPage.vue'),
        meta: {
          title: "Home",
          requireAuth: true
        },
      }
    ]
  },
  {
    path: "/login",
    component: () => import("src/layouts/LoginLayout.vue"),
    children: [
      {
        name: "LoginPage",
        path: "",
        component: () => import("src/pages/auth/LoginPage.vue"),
        meta: {
          title: "Login",
        },
      },
    ],
  },
  {
    path: "/register",
    component: () => import("src/layouts/LoginLayout.vue"),
    children: [
      {
        name: "RegisterPage",
        path: "",
        component: () => import("src/pages/auth/RegisterPage.vue"),
        meta: {
          title: "Register",
        }
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue')
  }
]

export default routes
