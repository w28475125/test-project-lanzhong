import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Home"),
    children: [
      {
        path: "management/news/type",
        component: () =>
          import(
            /* webpackChunkName: "type" */ "@/views/management/news/type/index"
          )
      },
      {
        path: "management/news/release",
        component: () =>
          import(
            /* webpackChunkName: "release" */ "@/views/management/news/release/index"
          )
      },
      {
        path: "management/news/report",
        component: () =>
          import(
            /* webpackChunkName: "report" */ "@/views/management/news/report/index"
          )
      },
      {
        path: "management/news/content",
        component: () =>
          import(
            /* webpackChunkName: "content" */ "@/views/management/news/content/index"
          )
      },
      {
        path: "management/news/content/detail",
        component: () =>
          import(
            /* webpackChunkName: "report" */ "@/views/management/news/content/detail"
          )
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/login")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line
  console.log(to);
  if (to.path === "/login") {
    next();
  } else {
    if (localStorage.getItem("login") && localStorage.getItem("menuList")) {
      next();
    } else {
      next("/login");
    }
  }
  next();
});

export default router;
