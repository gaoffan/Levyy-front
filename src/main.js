import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import Vuetify from 'vuetify'
// index.js or main.js
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import {doAjax,isSignIn,CONFIG} from'./api'

Vue.config.productionTip = false;

Vue.use(Vuetify);
Object.defineProperty(Vue.prototype, '$doAjax', { value: doAjax });
Object.defineProperty(Vue.prototype, '$isSignIn', { value: isSignIn });
Object.defineProperty(Vue.prototype, '$CONFIG', { value: CONFIG });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
