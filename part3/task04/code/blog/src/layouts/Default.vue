<template>
  <div>
    <section class="header">
      <div style="position:absolute; top:20px; right:20px; z-index:2;">
        <el-tooltip effect="dark" :content="fullButton.full?'退出':'全屏'" placement="bottom-end">
          <el-button @click="full" :icon="fullButton.full?'el-icon-close':'el-icon-rank'" circle></el-button>
        </el-tooltip>
      </div>
      
      <h1 class="project-name">抹茶加冰</h1>
      <h2 class="project-tagline">欢迎来到渣渣程序抹茶加冰的个人博客</h2>
      <a href='https://github.com/' class="btn" target="_blank">GitHub主页</a>
      <a href="https://github.com/ice-matcha/task/tree/master/part3/task04/code/blog" class="btn" target="_blank">博客源码</a>
    </section>

    <div class="header-nav">
      <el-card shadow="never" :body-style="{ padding: '0px' }">
        <el-row>
          <el-col :span="10">
            <el-menu
              @select="selectTopbar"
              :default-active="topbar.active"
              mode="horizontal"
              menu-trigger="click"
            >
              <el-submenu index="#more">
                <template slot="title"
                  >了解博主</template
                >
                <el-menu-item index="#githubHome">github主页</el-menu-item>
                <el-menu-item index="#blog">其他博客</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
          <el-col :span="4" :offset="8" style="text-align: right;">
            <div class="header-nav-author-name">
              <b>抹茶加冰</b>
            </div>
            <div style="color:#606266;">
              <i class="el-icon-location"></i>&nbsp;
              广东深圳
              <br />
            </div>
          </el-col>
          <el-col :span="2" style="text-align: center;">
            <img src='/img/face.jpg' class="header-nav-author-face"/>
            <el-popover
              ref="bigAvatar"
              placement="top-start"
              title="test"
              width="200"
              trigger="hover"
            >
              <i class="el-icon-star-on"></i>&emsp;Little Doubi
              <br />
              <i class="el-icon-location"></i>&emsp;https://bing.com
              <br />
              <img src='/img/face.jpg' style="width: 200px;height: 200px;" />
            </el-popover>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <section class="main-content">
      <el-row>
        <el-col :span="6" style="padding-right:10px">
          <el-card shadow="never">
          <el-menu>
            <g-link
              class="nav-link"
              :to="item.path"
              v-for="item in routerMap"
              :key="item.id"
            >
              <el-menu-item :class="{ 'is-active': path === item.path }">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </g-link>
          </el-menu>
        </el-card>
        </el-col>
        <el-col :span="18" style="padding-left:10px">
          <section>
              <slot />
          </section>
        </el-col>
      </el-row>
    </section>

    <!-- footer -->
    <section class="foot">
      <div style="border-top: 1px #e1e4e8 solid !important;padding: 45px 0px 45px 0px;">
        <el-row>
          <el-col :span="10">
            <div>
              © 2020 ice cream&emsp;&emsp;
              <a href="https://github.com/ice-matcha" target="_blank">Profile</a>&emsp;&emsp;
              <a href="https://github.com/ice-matcha/task/tree/master/part3/task04/code/blog" target="_blank">VBlog</a>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="text-align: center;font-size: 18px">
              <i class="el-icon-location-outline"></i>
            </div>
          </el-col>
          <el-col :span="10">
            <div style="float: right;">
              <a href="https://developer.github.com" target="_blank">GitHub-API</a>&emsp;&emsp;
              <a href="https://cn.vuejs.org/" target="_blank">Vue.js</a>&emsp;&emsp;
              <a href="http://element.eleme.io/" target="_blank">Element</a>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>
<static-query>
</static-query>
<script>
  // import axios from "axios";
  import "./default.css";
  export default {
    name: "Default",
    data() {
      return {
        fullButton: {
          full: false,
        },
        topbar: {
          active: "",
        },
        randomIcon: [],
        routerMap: [
          {
            id: 0,
            path: "/",
            name: "最新动态",
            icon: "el-icon-star-off",
          },
          {
            id: 1,
            path: "/social",
            name: "社交圈",
            icon: "el-icon-mobile-phone",
          },
          {
            id: 2,
            path: "/blog",
            name: "博客列表",
            icon: "el-icon-edit-outline",
          },
          {
            id: 3,
            path: "/project",
            name: "开源项目",
            icon: "el-icon-service",
          },
        ],
      };
    },
    mounted() {
      let width = window.innerWidth;
      for (let i = 0; i < 12; i++) {
        let temp = {};
        let left = this.randomInt(10, width - 310);
        if (left > width / 2 - 150) {
          left += 300;
        }
        temp["left"] = left;
        temp["top"] = this.randomInt(20, 300);
        temp["size"] = this.randomInt(20, 40);
        this.randomIcon.push(temp);
      }
    },
    computed: {
      path() {
        return this.$route.path;
      },
    },
    methods: {
      //s<=r<e
      randomInt(s, e) {
        let d = e - s;
        if (d < 0) {
          return s;
        }
        let r = Math.random() * d + s;
        r = parseInt(r, 10);
        return r;
      },
      selectTopbar(index) {
        //取消菜单选中状态
        this.topbar.active = this.topbar.active == "" ? " " : ""
        switch (index) {
            case "#githubHome":
                window.open('https://github.com/ice-matcha');
                break;
            case "#blog":
                window.open('http://spring_feng.gitee.io/blog/index.html');
              break;
            default:
                break;
        }
      },
              
      moveIcon(index) {
        let width = window.innerWidth;
        this.randomIcon[index]["top"] = this.randomInt(20, 300);
        let left = this.randomInt(10, width - 310);
        if (left > width / 2 - 150) {
          left += 300;
        }
        this.randomIcon[index]["left"] = left;
      },
      full() {
          if (!this.fullButton.full) {
              this.fullScreen()
              this.fullButton.full = true
          } else {
              this.fullExit()
              this.fullButton.full = false
          }
      },
      fullScreen() {
          var element = document.documentElement
          if (window.ActiveXObject) {
              var WsShell = new ActiveXObject('WScript.Shell')
              WsShell.SendKeys('{F11}')
          } else if (element.requestFullScreen) {
              element.requestFullScreen()
          } else if (element.msRequestFullscreen) {
              element.msRequestFullscreen()
          } else if (element.webkitRequestFullScreen) {
              element.webkitRequestFullScreen()
          } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen()
          }
      },
      fullExit() {
          var element = document.documentElement
          if (window.ActiveXObject) {
              var WsShell = new ActiveXObject('WScript.Shell')
              WsShell.SendKeys('{F11}')
          } else if (element.requestFullScreen) {
              document.exitFullscreen()
          } else if (element.msRequestFullscreen) {
              document.msExitFullscreen()
          } else if (element.webkitRequestFullScreen) {
              document.webkitCancelFullScreen()
          } else if (element.mozRequestFullScreen) {
              document.mozCancelFullScreen()
          }
      },
    },
  };
</script>

<style>
</style>