import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'wordlist'
    }
  },
  {
    name: 'wordlist',
    path: '/wordlist',
    component: () => import('@/view/wordlist.vue'),
    meta: {
      title: 'wordlist'
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
