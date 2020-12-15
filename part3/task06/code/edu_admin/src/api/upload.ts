/**
 * 上传资源
 */

import request from '@/utils/request'

export const ImageTypes: string[] = ['bmp', 'jpg', 'jpeg', 'png', 'gif']
export const VideoTypes: string[] = ['mp4', 'mov', 'wmv', 'avi', 'flv']
export const buildAcceptStr = (types: string[]): string => types.map(t => `.${t.toLowerCase()}`).join(', ')

/**
 * 上传图片资源
 * @param data
 * @param onUploadProgress
 */
export const uploadImage = (
  data: FormData,
  onUploadProgress?: (progressEvent: ProgressEvent) => void
) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    onUploadProgress
  })
}
