
## Data Fetch

 - 1.SSR Server-side rendering 
    getServerSideProps仅在服务器端运行，从不在浏览器上运行。getServerSideProps只有在需要渲染在请求时获取数据的页面时使用，
    每次在刷新页面，都会达到服务端，在服务端从远程获取数据，然后渲染页面返回前端。
 - 2.SSG Static-site generation 静态站点生成
    Next.js 将在构建时使用getStaticProps。getStaticProps始终在服务器上运行，从不在客户端上运行
    提前在编译时获取静态页面，不适合动态元素较多的页面。配合getStaticPaths使用。
 - 3.CSR Client-sid rendering
    当您的页面不需要 SEO 索引、不需要预呈现数据或页面内容需要经常更新时，客户端数据获取非常有用。与服务器端呈现 API 不同，您可以在组件级别使用客户端数据获取。
    如果在页面级别完成，则在运行时获取数据，并且页面内容会随着数据的变化而更新。在组件级别使用时，在组件挂载时获取数据，随着数据的变化更新组件的内容。
    请务必注意，使用客户端数据获取会影响应用程序的性能和页面的加载速度。这是因为数据获取是在组件或页面挂载时完成的，并且没有缓存数据。
   
   ## Middleware
   - 中间件允许您在请求完成之前运行代码，然后根据传入的请求，您可以通过重写、重定向、修改请求或响应标头或直接响应来修改响应。
   - 先走src下公共_middleware.ts的文件 再走单个page文件中的middleware。

   ## Dynamic Import 动态导入
   - Next.js 支持延迟加载外部库import()和 React 组件next/dynamic。延迟加载通过减少呈现页面所需的 JavaScript 数量来帮助提高初始加载性能。组件或库仅在使用时导入并包含在 JavaScript 包中。
   - 定义loading参数：当在加载这个动态引入组件，先去请求文件时先渲染loading的组件，当文件成功请求回来后会替换掉loading的组件，替换为正常要引入的动态组件
   ```tsx
   import dynamic from 'next/dynamic';
   const Component = dynamic(() => import('../'), {
      loading: () => <div>loading....</div>
   })
   ```

   ## 错误处理
   - 服务端错误，例如404、500,可以通过src/404.js来编写页面内容。
   - 客户端错误，使用errorBoundary，在开发环境下补货，代码编写一些错误。

   ## webVitals
   