import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import createStoreIntstance from '../store';

import Routes, { routesConfig } from './routes';

const express = require('express');

const app = express();

const port = process.env.port || '3000';
app.use(express.static('dist/public'));

app.get('*', (req, res) => {
  // store 注水
  const store = createStoreIntstance();
  console.log(store, '11');
  const promise = routesConfig.map(route => {
    const component = route.component;
    if (route.path === req.url && component.getInitialData) {
      return component.getInitialData(store);
    } else {
      return null;
    }
  });
  Promise.all(promise).then(() => {
    const preloadState = store.getState();
    const content = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <Routes />
        </StaticRouter>
      </Provider>
    );
    const helmet = Helmet.renderStatic();
    const html = `
      <html>
        <head>
          ${helmet.title.toString()}
        </head>
        <body>
          <div id='root'>${content}</div>
          <script>
            window.__PRELOAD_STATE__ = ${JSON.stringify(preloadState)}
          </script>
          <script src='bundle_client.js'></script>
        </body>
      </html>
    `;
    // 200状态码下的编码格式（设置响应头）
    res.writeHead(200, {
      'content-type': 'text/html;charset=utf8'
    });
    res.end(html);
  })
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost: ${port}`);
})