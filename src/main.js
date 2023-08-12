import { createApp } from 'vue';
import stores from './store';
import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './config/router.config';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import 'highlight.js/styles/stackoverflow-light.css';
import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import VueClipboard from 'vue3-clipboard';

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
});

hljs.registerLanguage('sql', sql);

createApp(App)
  .use(stores)
  .use(router)
  .use(Antd)
  .use(hljsVuePlugin)
  .use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
  })
  .mount('#app');
