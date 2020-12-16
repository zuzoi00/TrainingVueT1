import login from '@/views/auth/Login.vue';
import user from '@/views/user/User.vue';

export const routes = [
  {
    path: "/",
    name: "login",
    component: login,
  //     beforeEnter: (to, from, next) => {
  //       let user = {userName:localStorage.username,password:localStorage.password};
  //       if ( (user.userName!="" && user.password!="")){
  //   next({name:"List"})
  // }else {next()}
  //     }
  },
  {
    path: "/user",
    name: "user",
    component: user,
    beforeEnter: (to, from, next) => {
      let user = localStorage.getItem('user')
      let password = localStorage.getItem('password')
      if (user == "Hiweb" && password == "123456") {
        next();
      } else {
        next('/')
      }
    },
    // beforeEach: ((to, from, next) => {
    //   let user = localStorage.getItem('user')
    //   let password = localStorage.getItem('password')
    //   if (user == "Hiweb" && password == "123456") {
    //     next('/user')
    //   } 
    // })
  },
  
]


