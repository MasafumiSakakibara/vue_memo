import Vue from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyAUvzjdTOG0SEMKZzjaI8-vN0FjOhOspIk',
  authDomain: 'vue-memo-d4956.firebaseapp.com',
  databaseURL: 'https://vue-memo-d4956.firebaseio.com',
  projectId: 'vue-memo-d4956',
  storageBucket: 'vue-memo-d4956.appspot.com',
  messagingSenderId: '297572987908',
  appId: '1:297572987908:web:22d3e340bbecbadf073151',
  measurementId: 'G-1JKMF0T56B',
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
