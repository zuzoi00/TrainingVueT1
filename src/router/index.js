import Login from '@/views/auth/Login.vue';
import User from '@/views/user/User.vue';

export default [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/User",
    name: "User",
    component: User
  },
]
