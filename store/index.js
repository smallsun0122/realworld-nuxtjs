// 运行在服务端
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    // 用户信息
    user: null
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

export const actions = {
  // nuxtServerInit 是一个特殊的 action 方法
  // 这个 action 会在服务端渲染期间自动调用
  // 作用：初始化容器数据，传递数据给客户端使用
  nuxtServerInit({ commit }, { req }) {
    let user = null;

    if (req.headers.cookie) {
      // 使用 cookieparser 把 cookie 字符串转为 JavaScript 对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        console.log(err)
      }
    }

    // 存储到 store 中
    commit('setUser', user);
  }
}