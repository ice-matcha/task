import Vue from 'vue'
//import Router from 'vue-router'
//import Router from '@/vuerouter/history'
import Router from '@/vuerouter/hash'
//import HelloWorld from '@/components/HelloWorld'
import Index from '@/views/Index'
import Blog from '@/views/Blog'
import Photo from '@/views/Photo'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/blog',
    name: 'Blog',
    //component: import("@/views/Blog")
    component: Blog
  },
  {
    path: '/photo',
    name: 'Photo',
    //component: import("@/views/Photo")
    component: Photo
  }
];

const router = new Router({
  mode: 'history',
  base: '127.0.0.1:8080',
  routes
});

export default router;
/*
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/blog',
      name: 'Blog',
      //component: import("@/views/Blog")
      component: Blog
    },
    {
      path: '/photo',
      name: 'Photo',
      //component: import("@/views/Photo")
      component: Photo
    }
  ]
})
*/