/**
 * 角色
 */
import request from '@/utils/request'

interface AllocateUserRoles {
  userId: number
  roleIdList: Array<number>
}

export interface RoleQueryParam {
  code?: string
  id?: number
  name?: string
  startCreateTime?: string
  endCreateTime?: string
  current?: number
  size?: number
}

export interface Roles {
  code: string
  id: number
  name: string
  createdBy: string
  description: string
  updatedBy: string
  createdTime: string
  updatedTime: string
}

export interface RoleForm {
  id?: number
  name?: string
  code?: string
  description?: string
}

/**
 * 获取所有角色
 */
export const getAllRole = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

/**
 * 分页获取角色信息
 * @param data
 */
export const getRolePages = (data: RoleQueryParam) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

/**
 * 给用户分配角色
 * @param data
 */
export const allocateUserRoles = (data: AllocateUserRoles) => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}

/**
 * 查询用户角色
 * @param id
 */
export const getUserRole = (id: number) => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${id}`
  })
}

/**
 * 创建或者编辑角色
 * @param data
 */
export const saveOrUpdateRole = (data: RoleForm) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

/**
 * 删除角色
 * @param id
 */
export const deleteRole = (id: string | number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}
