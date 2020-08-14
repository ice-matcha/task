import {request} from '@/plugins/request';

//获取文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}

//获取用户关注文章列表
export const getYourFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        params
    })
}

//获取文章详情
export const getArticle = slug => {
    console.log(slug);
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}

//点赞
export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    })
}

//取消点赞
export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
}

//获取评论
export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}

// 评论文章
export const addComment = (slug, body) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data: {body}
    })
}

//添加文章
export const createArticle = data => {
    return request({
        method: 'POST',
        url: '/api/articles',
        data
    })
}

//更新文章
export const updateArticle = (slug, data) => {
    return request({
        method: 'PUT',
        url: `/api/articles/${slug}`,
        data
    })
}

//删除文章
export const deleteArticle = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}`,
    })
}

//关注
export const addFollow = username => {
    return request({
        method: 'POST',
        url: `/api/profiles/${username}/follow`,
    })
}

// 取消关注
export const deleteFollow = username => {
    return request({
        method: 'DELETE',
        url: `/api/profiles/${username}/follow`,
    })
}