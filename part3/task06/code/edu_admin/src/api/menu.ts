/**
 * 菜单相关请求模块
 */
import request from '@/utils/request'

export interface QueryParam {
  code?: string
  id?: number
  name?: string
  startCreateTime?: string
  endCreateTime?: string
  current?: number
  size?: number
}

export interface Menu {
  id: number
  name: string
  createdBy: string
  createdTime: string
  description: string
  href: string
  icon: string
  level: number
  orderNum: number
  parentId: number
  selected: boolean
  shown: boolean
  subMenuList: Menu[]
  updatedBy: string
  updatedTime: string
}

export interface MenusForm {
  id?: number
  parentId: number
  name: string
  href: string
  icon?: string
  orderNum?: number
  description?: string
  shown?: boolean
}

/**
 * 获取菜单列表
 * @param data
 */
export const getMenuPages = (data: QueryParam) => {
  return request({
    method: 'POST',
    url: '/boss/menu/getMenuPages',
    data
  })
}

/**
 * 添加或更新菜单
 * @param data
 */
export const createOrUpdateMenu = (data: MenusForm) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

/**
 * 获取编辑菜单页面信息
 * @param id
 */
export const getEditMenuInfo = (id = '-1') => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: { id }
  })
}

/**
 * 删除菜单
 * @param id
 */
export const deleteMenu = (id: string | number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

/**
 * 获取角色拥有的菜单列表
 * @param roleId
 */
export const getRoleMenus = (roleId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: { roleId }
  })
}

/**
 * 获取所有菜单并按层级展示
 */
export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

/**
 * 给角色分配菜单
 * @param data
 */
export const allocateRoleMenus = (
  roleId: number | string,
  menuIdList: number[]
) => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data: {
      roleId,
      menuIdList
    }
  })
}
