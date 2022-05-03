import TabsView from "@/layouts/tabs/TabsView";
// import PageView from "@/layouts/PageView";
import rank from "./rank";
import ExpertReviewOperation from "./config/ExpertReviewOperation";
import ReviewPublic from "./config/ReviewPublic";
// 路由配置
const options = {
  routes: [
    {
      path: "/login",
      name: "登录页",
      component: () => import("@/pages/login"),
    },
    {
      path: "*",
      name: "404",
      component: () => import("@/pages/exception/404"),
    },
    {
      path: "/403",
      name: "403",
      component: () => import("@/pages/exception/403"),
    },
    {
      path: "/",
      name: "首页",
      component: TabsView,
      redirect: "/dashboard/workplace",
      children: [
        {
          path: "dashboard/workplace",
          name: "主页",
          component: () => import("@/pages/dashboard/workplace"),
        // children: [
        //  {
        //      path: "teacher-welcome",
        //      name: "报名首页🌊",
        //      meta: {
        //        authority: "teacher",
        //      },
        //      component: () => import("@/pages/review/teacher/welcome"),
        //    },
        //      {
        //       path: "workplace",
        //       name: "工作台",
        //       meta: {
        //          page: {
        //            closable: false,
        //          },
        //     },
        //        component: () => import("@/pages/dashboard/workplace"),
        //      },
        //      {
        //        path: "analysis",
        //        name: "分析页",
        //        component: () => import("@/pages/dashboard/analysis"),
        //      },
        //    ],
        },
        {
          path: "teacher-home",
          name: "报名首页🌊",
          meta: {
            // invisible: true,
            authority: "teacher",
          },
          component: () => import("@/pages/review/teacher/welcome"),
        },
        {
          path: "teacher-info",
          name: "个人信息",
          meta: {
            invisible: true,
          },
          component: () => import("@/pages/review/teacher/info"),
        },
        ...rank,
        ...ExpertReviewOperation,
        ...ReviewPublic,
        // {
        //   path: "/svg",
        //   name: "svg",
        //   meta: {
        //     icon: "usb",
        //   },
        //   component: PageView,
        //   children: [
        //     {
        //       path: "/svg",
        //       name: "svg",
        //       component: () => import("@/pages/review/svg"),
        //     },
        //   ],
        // },
        // ...reviewTitle,
        // ...defRouter,
      ],
    },
  ],
};
export default options;
