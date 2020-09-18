/**
 * 服务端启动入口
 */

import { createApp } from './app';

export default context => {
    const { app } = createApp();

    //服务端路由处理...

    return app;
}