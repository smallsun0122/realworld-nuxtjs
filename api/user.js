import { request } from '@/plugins/request';

// 用户登录
export const login = params => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data: params
  })
}

// 用户注册
export const register = params => {
  return request({
    method: 'POST',
    url: '/api/users',
    data: params
  })
}


// 用户信息
export const getProfiles = username => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}

// 更新用户信息
export const updateUser = params => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data: params
  })
}

// 查询用户信息
export const getUser = params => {
  return request({
    method: 'GET',
    url: '/api/user'
  })
}

// 用户关注
export const getFollowProfiles = username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })
}