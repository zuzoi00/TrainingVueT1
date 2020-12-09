import About from '@/view/About.vue';
import Home from '@/view/Home.vue';

export default [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About,
    // beforeEnter: (to, from, next) => {
    //   let user = localStorage.getItem('user')
    //   let password = localStorage.getItem('password')
    //   if (user && password) {
    //     next();
    //   } else {
    //     next('/');
    //   }
    //   return;
    // }
  },
]
