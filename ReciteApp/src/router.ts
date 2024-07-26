import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'home'
    }
  },
  {
    name: 'home',
    path: '/',
    component: () => import('@/view/home.vue'),
    meta: {
      title: 'home'
    }
  },
  {
    name: 'book',
    path: '/book',
    component: () => import('@/view/book.vue'),
    meta: {
      title: 'book'
    }
  },
  {
    name: 'card',
    path: '/card',
    component: () => import('@/view/card.vue'),
    props: true,
    meta: {
      title: 'card'
    }
  },
  {
    name: 'config',
    path: '/config',
    component: () => import('@/view/config.vue'),
    meta: {
      title: 'config'
    }
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('@/view/user/index.vue'),
    meta: {
      title: 'user'
    }
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  const title = to?.meta?.title
  if (title) {
    document.title = title as string
  }
  next()
})

export default router
