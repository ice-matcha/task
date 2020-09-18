const Vue = require('vue');
const express = require('express');
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');
const setupDevServer = require('./build/setup-dev-server');

//判断环境变量
const isPord = process.env.NODE_ENV === "production";

const server = express();

server.use('./dist',express.static('./dist'));

let renderer;
let onReady;
if(isPord){
	const serverBundle = require('./dist/vue-ssr-server-bundle.json');
	const clientManifest = require('./dist/vue-ssr-client-manifest.json');
	const template = fs.readFileSync('./index.template.html', 'utf-8');
	renderer = createBundleRenderer(serverBundle, {
		template: template,
		clientManifest
	});
}else{
	//开发模式
	onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
		renderer = createBundleRenderer(serverBundle, {
			template,
			clientManifest
		});
	})
}



const render = (req, res) => {
	renderer.renderToString({
		title: 'ice-cream',
		meta: `<meta name="viewport" content="width=decive-width, initial-scale=1.0">`
	}, (err, html) => {
		if(err) return res.status(500).end('Internal Server Error.');

		res.setHeader('Content-Type', 'text/html; charset=utf8');
		res.end(html);
	})
}

server.get('/', isPord ? render : async(req, res) => {
	await onReady;
	render(req, res);
})

server.listen(3000, 'localhost', () => {
	console.log('server running at port 3000.');
})
