import { request } from '@/plugins/request';

// 文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 用户关注列表
export const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

// 发表文章
export const addArticles = params => {
  console.log('params-->', params)
  return request({
    method: 'POST',
    url: `/api/articles`,
    data: params
  })
}

// 用户点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消用户点赞
export const delteFavorite = slug => {
    return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticleDetail = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 添加文章评论
export const addComments = (slug, params) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data: params
  })
}

// 删除文章评论
export const deleteComments = (slug, id) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
  })
}
