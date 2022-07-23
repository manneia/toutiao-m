import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    redirect: "/home",
    component: () => import("@/views/layout"),
    children: [
      //二级路由加/会覆盖一级路由,不加/将一级路由和二级路由进行拼接
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home"),
      },
      {
        path: "/Q&A",
        name: "Q&A",
        component: () => import("@/views/Q&A"),
      },
      {
        path: "/video",
        name: "video",
        component: () => import("@/views/video"),
      },
      {
        path: "/my",
        name: "my",
        component: () => import("@/views/my"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
