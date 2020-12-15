/**
 * 课程管理
 */
import request from '@/utils/request'

export type CourseQuery = {
  currentPage?: number
  pageSize?: number
  courseName?: string
  status?: string
}

export interface Course {
  id: number
  teacherId: number
  totalCourseTime: number
  actualSales: number
  shareTitle: string
  shareDescription: string
  shareImageTitle: string
  lastOperatorId: number
  createTime: string
  updateTime: string
  isDel: boolean
  totalDuration: string | null
  seoDescription: string | null
  seoKeywords: string | null
  seoTitle: string | null
  h5Url: string | null
  tag: string | null
  status: number
  brokerageRate: string | null
  joinDistribution: string | null
  lastNoticeTime: string | null
  distributionPosterImage: string | null
  distributionCopywriter: string | null
  isGray: boolean | null
  sectionDTOS: string | null
  courseUrl: string | null
  topNCourseLesson: string | null
  isBuy: boolean
  lessonUpdateCount: string | null
  compareTime: string | null
  lastLearnLessonName: string | null
  activityTime: string | null
}

export const getCoursesPages = (data: CourseQuery) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

export const changeCourseState = (courseId: number, status: number) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params: { courseId, status }
  })
}

export const saveOrUpdateCourse = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

export const getCourseById = (courseId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}

export const uploadCourseImage = (data: any, onUploadProgress: (progressEvent: ProgressEvent) => void) => {
  // 该接口要求的请求数据类型是：multipart/form-data
  // 所以需要提交 FormData 数据对象
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    // HTML5 新增的上传响应事件：progress
    onUploadProgress
  })
}
