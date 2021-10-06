import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _bda691b4 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _d90d004a = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _48227826 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _74744d2d = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _a9552dc2 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _d544452e = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _5b3e907a = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _bda691b4,
    children: [{
      path: "",
      component: _d90d004a,
      name: "home"
    }, {
      path: "/login",
      component: _48227826,
      name: "login"
    }, {
      path: "/register",
      component: _48227826,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _74744d2d,
      name: "profile"
    }, {
      path: "/settings",
      component: _a9552dc2,
      name: "settings"
    }, {
      path: "/editor",
      component: _d544452e,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _5b3e907a,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
