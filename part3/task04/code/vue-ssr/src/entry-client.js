/**
 * 客户端入口
 */
import { createApp } from './app';

// client-specific bootstrapping logic...

const { app } = createApp();

// this assumes App.vue template root element has `id="app"`
app.$mount('#app');