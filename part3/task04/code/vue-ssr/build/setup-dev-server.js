const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const webpack = require("webpack");
const devMiddleware = require("webpack-dev-middleware");

const resolve = file => path.resolve(__dirname, file);

module.exports = (server, callback) => {
    let ready;
    const onReady = new Promise(r =>  ready = r);

    let template;
    let serverBundle;
    let clientManifest;

    const update = () => {
        if(template && serverBundle && clientManifest){
            ready();
            callback(serverBundle, template, clientManifest);
        }
    }

    //监视构建(模板)
    const templatePath = path.resolve(__dirname, '../index.template.html');
    template = fs.readFileSync(templatePath, 'utf-8');
    update();
    chokidar.watch(templatePath).on('change',() => {
        template = fs.readFileSync(templatePath, 'utf-8');
        update();
    })

    //监视构建(服务端)
    const serverConfig = require("./webpack.server.config");
    const serverCompiler = webpack(serverConfig);
    const serverDevMiddleware = devMiddleware(serverCompiler, {
        logLevel: 'silent'  //关闭日志输出
    });
    serverCompiler.hooks.done.tap('server', () => {
        serverBundle = JSON.parse(
            serverDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
        );
        update();
    })
    /*
    serverCompiler.watch({},(err,stats) => {
        if(err) throw err;
        if(stats.hasErrors()) return;
        serverBundle = JSON.parse(fs.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8'));
        update();
    })
    */

    //监视构建(客户端)
    const clientConfig = require("./webpack.client.config");
    const clientCompiler = webpack(clientConfig);
    const clientDevMiddleware = devMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        logLevel: 'silent'  //关闭日志输出
    });
    clientCompiler.hooks.done.tap('server', () => {
        clientBundle = JSON.parse(
            serverDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-client-bundle.json'), 'utf-8')
        );
        update();
    })

    return onReady;
}