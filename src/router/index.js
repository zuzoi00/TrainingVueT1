import Login from '@/views/auth/Login.vue';
import User from '@/views/user/User.vue';

export default [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/user",
    name: "user",
    component: User,
    beforeEnter: (to, from, next) => {
      let user = localStorage.getItem('user')
      let password = localStorage.getItem('password')
      if (user && password) {
        next();
      } else {
        next('/');
      }
      return;
    }
  },
]
