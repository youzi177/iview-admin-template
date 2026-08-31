import Vue from 'vue'
import Router from 'vue-router'

import routes from './routers'
import store from '@/store'
import iView from 'view-design'

import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
import config from '@/config'

const { homeName } = config

Vue.use(Router)

// 解决重复点击当前路由时的 NavigationDuplicated
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (err.name === 'NavigationDuplicated') {
      return err
    }

    throw err
  })
}

const router = new Router({
  routes,
  mode: 'history',
})

const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) {
    next()
  } else {
    next({
      replace: true,
      name: 'error_401',
    })
  }
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()

  const token = getToken()

  if (!token && to.name !== LOGIN_PAGE_NAME) {
    next({
      name: LOGIN_PAGE_NAME,
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    next()
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    next({
      name: homeName,
    })
  } else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      store
        .dispatch('getUserInfo')
        .then((user) => {
          turnTo(to, user.access, next)
        })
        .catch(() => {
          setToken('')
          next({
            name: 'login',
          })
        })
    }
  }
})

router.afterEach((to) => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
