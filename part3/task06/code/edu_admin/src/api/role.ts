/**
 * 角色
 */
import request from '@/utils/request'

interface AllocateUserRoles {
  userId: number
  roleIdList: Array<number>
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
