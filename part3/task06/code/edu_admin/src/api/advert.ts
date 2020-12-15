/**
 * 广告
 */
import request from '@/utils/request'

export interface Ad {
  id: number
  name: string
  spaceId: number
  keyword: string
  htmlContent: string
  text: string
  img: string
  link: string
  startTime: string
  endTime: string
  createTime: string
  updateTime: string
  status: number
  priority: number
  startTimeFormatString: string
  endTimeFormatString: string
}

export interface AdSpace {
  id: number
  name: string
  spaceKey: string
  createTime: string
  updateTime: string
  isDel: number
  adDTOList: Ad[]
}

export type AdParamForm = Partial<Ad>
export interface AdSpaceForm {
  id?: number
  name: string
}

/**
 * 获取所有广告列表
 */
export const getAdList = () => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList'
  })
}

/**
 * 获取所有的广告位
 */
export const getSpace = () => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}

/**
 * 修改状态
 * @param id
 */
export const updateStatus = (id: number | string, status: number) => {
  return request({
    method: 'GET',
    url: '/front/ad/updateStatus',
    params: { id }
  })
}

/**
 * 创建或更新广告
 * @param data
 */
export const createOrUpdateAd = (data: AdParamForm) => {
  return request({
    method: 'POST',
    url: '/front/ad/saveOrUpdate',
    data
  })
}

/**
 * 创建或更新广告位
 * @param data
 */
export const createOrUpdateAdSpace = (data: AdSpaceForm) => {
  return request({
    method: 'POST',
    url: '/front/ad/space/saveOrUpdate',
    data
  })
}
