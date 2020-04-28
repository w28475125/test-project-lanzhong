import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: '/', directives: '/home' },
  { path: '/home', name: 'home', component: () => import(/* webpackChunkName: "login" */ "@/views/Home") },
  { path: "/login", name: "login", component: () => import( /* webpackChunkName: "login" */ "@/views/login") }
];



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if(localStorage.getItem('login')){
    next()
  }else{
    if(to.path === "/login"){
      next()
    }else{
      next("/login")
    }
  }
  next()
})

export default router;
