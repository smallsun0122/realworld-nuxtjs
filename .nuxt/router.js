import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7bdd2026 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _013028db = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _250d3aed = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _205df7a6 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _c8e0dbc2 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _700e4669 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _52c9710c = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

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
    component: _7bdd2026,
    children: [{
      path: "",
      component: _013028db,
      name: "home"
    }, {
      path: "/login",
      component: _250d3aed,
      name: "login"
    }, {
      path: "/register",
      component: _250d3aed,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _205df7a6,
      name: "profile"
    }, {
      path: "/settings",
      component: _c8e0dbc2,
      name: "settings"
    }, {
      path: "/editor",
      component: _700e4669,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _52c9710c,
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
