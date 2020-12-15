/**
 * 资源相关请求模块
 */
import request from '@/utils/request'

export type ResourceQueryParam = {
  id?: number
  name?: string
  startCreateTime?: string
  url?: string
  categoryId?: number
  endCreateTime?: string
  current?: number
  size?: number
}

export type Resource = {
  name: string
  categoryId: number
  id: number
  createdBy: string
  url: string
  description: string
  updatedBy: string
  createdTime: string
  selected: boolean
  updatedTime: string
}

export type ResourceCategory = {
  id: number
  createdBy: string
  updatedBy: string
  createdTime: string
  updatedTime: string
  name: string
  sort: number
  selected: boolean
  resourceList?: Resource[]
}

export type ResourceUpdateForm = {
  id?: number
  name: string
  categoryId: number
  url: string
  description?: string
}

export type CategoryUpdateForm = {
  id?: number
  name: string
  sort: number
}

/**
 * 按条件分页查询资源
 * @param data
 */
export const getResourcePages = (data: ResourceQueryParam) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

/**
 * 获取所有资源
 */
export const getAllResource = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}

/**
 * 获取所有资源分类列表
 */
export const getAllCategory = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

/**
 * 修改或编辑资源
 * @param data
 */
export const saveOrUpdateResource = (data: ResourceUpdateForm) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

/**
 * 删除资源
 * @param id
 */
export const deleteResource = (id: string | number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}

/**
 * 获取角色拥有的资源列表
 * @param roleId
 */
export const getRoleResources = (roleId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: { roleId }
  })
}

export const allocateRoleResources = (
  roleId: number | string,
  resourceIdList: number[]
) => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data: {
      roleId,
      resourceIdList
    }
  })
}

/**
 * 添加或更新类别
 * @param data
 */
export const saveOrderUpdateCategory = (data: CategoryUpdateForm) => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}

/**
 * 删除类别
 * @param id
 */
export const deleteCategory = (id: string | number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/category/${id}`
  })
}
