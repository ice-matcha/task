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
