/* eslint-disable no-unused-vars */
import BlankView from "@/layouts/BlankView";
import PageView from "@/layouts/PageView";
// import TabsView from "@/layouts/tabs/TabsView";

/**
 * 教师
 */
// 教师 职级评审
const teacherRank = [
  {
    path: "teacher-rank-loading",
    name: "职级评定（专技岗）",
    meta: {
      authority: "teacher",
    },
    component: () => import("@/pages/review/teacher/rank/loading"),
  },
  {
    path: "teacher-rank-signup",
    name: "报名",
    meta: {
      invisible: true,
      authority: "teacher",
    },
    component: () => import("@/pages/review/teacher/rank/signup"),
  },
  {
    path: "teacher-rank-workload",
    name: "工作量要求",
    meta: {
      invisible: true,
      authority: "teacher",
    },
    component: () => import("@/pages/review/teacher/rank/workload"),
  },
  {
    path: "teacher-rank-condition",
    name: "工作业绩条件要求",
    meta: {
      invisible: true,
      authority: "teacher",
    },
    component: () => import("@/pages/review/teacher/rank/condition"),
  },
];
// 教师 岗位评聘
const teacherEmploy = [
  {
    path: "teacher-employ-loading",
    name: "岗位评聘（管理岗、机关非教师专技）",
    meta: {
      authority: "teacher",
    },
    component: () => import("@/pages/review/teacher/employ/loading"),
  },
  {
    path: "teacher-employ-signup",
    name: "报名",
    meta: {
      invisible: true,
      authority: "teacher",
    },
    component: () => import("@/pages/review/teacher/employ/signup"),
  },
  {
    path: "teacher-employ-workload",
    name: "条件自检",
    meta: {
      invisible: true,
      authority: "teacher",
    },
    component: () => import("@/pages/review/teacher/employ/workload"),
  },
  {
    path: "teacher-employ-condition",
    name: "具体条件要求",
    meta: {
      invisible: true,
      authority: "teacher",
    },
    component: () => import("@/pages/review/teacher/employ/condition"),
  },
];
// 教师 岗位聘任
const teacherPost = [
  {
    path: "teacher-post-loading",
    name: "岗位评聘（专技岗）",
    meta: {
      authority: "teacher",
    },
    component: () => import("@/pages/review/teacher/post/loading"),
  },
  {
    path: "teacher-post-signup",
    name: "报名",
    meta: {
      invisible: true,
      authority: "teacher",
    },
    component: () => import("@/pages/review/teacher/post/signup"),
  },
  {
    path: "teacher-post-workload",
    name: "科研型工作量要求",
    meta: {
      invisible: true,
      authority: "teacher",
    },
    component: () => import("@/pages/review/teacher/post/workload"),
  },

  {
    path: "teacher-post-condition",
    name: "工作业绩强度绩点要求",
    meta: {
      invisible: true,
      authority: "teacher",
    },
    component: () => import("@/pages/review/teacher/post/condition"),
  },
];
// 教师路由
const teacherRoute = [
  {
    path: "rank",
    name: "职级评审",
    meta: {
      icon: "solution",
      invisible: true,
      page: {
        cacheAble: true,
      },
      authority: "teacher",
    },
    component: PageView,
    children: [
      ...teacherRank,
      {
        path: "user-403",
        name: "403",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/exception/403"),
      },
      {
        path: "trank-condition",
        name: "职级评定（专技岗）条件列表",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/review/teacher/condition/rank.vue"),
      },
      {
        path: "rank-info",
        name: "职级评定（专技岗）填报列表",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/review/teacher/rank"),
      },
      {
        path: "employ-condition",
        name: "职级评聘（管理岗、机关非教师专技）条件列表",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/review/teacher/condition/employ.vue"),
      },
      {
        path: "employ-info",
        name: "职级评聘（管理岗、机关非教师专技）填报列表",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/review/teacher/employ"),
      },
      {
        path: "post-condition",
        name: "职级评聘（专技岗）条件列表",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/review/teacher/condition/post.vue"),
      },
      {
        path: "post-info",
        name: "职级评聘（专技岗）条件列表",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/review/teacher/post"),
      },
    ],
  },
  {
    path: "employ",
    name: "岗位评聘",
    meta: {
      icon: "solution",
      invisible: true,
      page: {
        cacheAble: true,
      },
      authority: "teacher",
    },
    component: PageView,
    children: [
      ...teacherEmploy,
      {
        path: "user-403",
        name: "403",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/exception/403"),
      },
    ],
  },
  {
    path: "post",
    name: "岗位聘任",
    meta: {
      icon: "solution",
      invisible: true,
      page: {
        cacheAble: true,
      },
      authority: "teacher",
    },
    component: PageView,
    children: [
      ...teacherPost,
      {
        path: "user-403",
        name: "403",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/exception/403"),
      },
    ],
  },
];
/**
 * 管理员
 */
// 基础数据管理
const basicData = [
  {
    path: "basic-data-management",
    name: "基础数据管理",
    meta: {
      authority: "admin",
    },
    redirect: "/",
    component: PageView,
    children: [
      {
        path: "basicData-Faculty",
        name: "二级部门管理√",
        meta: {
          // authority: "admin",
        },
        component: () => import("@/pages/review/basicData/faculty"),
      },
      {
        path: "basicData-Function",
        name: "职能部门管理√",
        meta: {
          // authority: "admin",
        },
        component: () => import("@/pages/review/basicData/function"),
      },
      {
        path: "basicData-position",
        name: "岗位管理√",
        meta: {
          // authority: "teacher",
          // invisible: true,
        },
        component: () => import("@/pages/review/basicData/position"),
      },
      {
        path: "basicData-series",
        name: "系列管理√",
        meta: {
          // authority: "teacher",
          // invisible: true,
        },
        component: () => import("@/pages/review/basicData/series"),
      },
      {
        path: "basicData-grade",
        name: "等级管理√",
        meta: {
          // authority: "teacher",
          // invisible: true,
        },
        component: () => import("@/pages/review/basicData/grade"),
      },
      {
        path: "basicData-type",
        name: "类型管理√",
        meta: {
          // authority: "teacher",
          // invisible: true,
        },
        component: () => import("@/pages/review/basicData/type"),
      },
    ],
  },
];
// 账户管理
const accountManage = [
  {
    path: "account-management",
    name: "账户管理",
    meta: {
      authority: "admin",
    },
    redirect: "/",
    component: PageView,
    children: [
      {
        path: "account-mamage-admin",
        name: "管理员账号√",
        component: () => import("@/pages/review/account/admin"),
      },
      {
        path: "account-mamage-teacher",
        name: "教师账号√",
        component: () => import("@/pages/review/account/teacher"),
      },
      {
        path: "account-mamage-func",
        name: "职能部门管理员账号√",
        component: () => import("@/pages/review/account/func"),
      },
      {
        path: "account-mamage-sector",
        name: "二级部门管理员账号√",
        component: () => import("@/pages/review/account/sector"),
      },
      {
        path: "account-mamage-expert",
        name: "评审专家账号√",
        component: () => import("@/pages/review/account/expert/index.vue"),
      },
    ],
  },
];
// 第三方数据管理
const thirdData = [
  {
    path: "thirdData-management",
    name: "第三方数据管理",
    meta: {
      authority: "admin",
    },
    redirect: "/",
    component: PageView,
    children: [
      {
        path: "science-data",
        name: "科技处数据",
        meta: {
          authority: "admin",
        },
        redirect: "/",
        component: BlankView,
        children: [
          {
            path: "kycg",
            name: "科研成果",
            component: () => import("@/pages/review/thirdData/science/kycg"),
          },
          {
            path: "kyxm",
            name: "科研项目",
            component: () => import("@/pages/review/thirdData/science/kyxm"),
          },
          {
            path: "paper",
            name: "论文",
            component: () => import("@/pages/review/thirdData/science/paper"),
          },
          {
            path: "yszp",
            name: "艺术作品",
            component: () => import("@/pages/review/thirdData/science/yszp"),
          },
          {
            path: "zl",
            name: "专利",
            component: () => import("@/pages/review/thirdData/science/zl"),
          },
          {
            path: "zz",
            name: "著作",
            component: () => import("@/pages/review/thirdData/science/zz"),
          },
        ],
      },
      {
        path: "cxxy-data",
        name: "创新学院数据",
        meta: {
          authority: "admin",
        },
        redirect: "/",
        component: BlankView,
        children: [
          {
            path: "s1",
            name: "竞赛",
            component: () => import("@/pages/review/thirdData/cxxy/js"),
          },
          {
            path: "s2",
            name: "大创",
            component: () => import("@/pages/review/thirdData/cxxy/dc"),
          },
        ],
      },
      {
        path: "deans-office-data",
        name: "教务处数据",
        meta: {
          authority: "admin",
        },
        redirect: "/",
        component: BlankView,
        children: [
          {
            path: "gjxm",
            name: "共建项目",
            component: () => import("@/pages/review/thirdData/office/gjxm"),
          },
          {
            path: "jc",
            name: "教材",
            component: () => import("@/pages/review/thirdData/office/jc"),
          },
          {
            path: "jglw",
            name: "教改论文",
            component: () => import("@/pages/review/thirdData/office/jglw"),
          },
          {
            path: "jgxm",
            name: "教改项目",
            component: () => import("@/pages/review/thirdData/office/jgxm"),
          },
          {
            path: "jxbs",
            name: "教学比赛",
            component: () => import("@/pages/review/thirdData/office/jxbs"),
          },
          {
            path: "jxcg",
            name: "教学成果",
            component: () => import("@/pages/review/thirdData/office/jxcg"),
          },
          {
            path: "jxgc",
            name: "教学工程",
            component: () => import("@/pages/review/thirdData/office/jxgc"),
          },
          {
            path: "kc",
            name: "课程",
            component: () => import("@/pages/review/thirdData/office/kc"),
          },
          {
            path: "rych",
            name: "荣誉称号",
            component: () => import("@/pages/review/thirdData/office/rych"),
          },
        ],
      },
      {
        path: "teaching-data",
        name: "教学工作量数据",
        meta: {
          authority: "admin",
        },
        redirect: "/",
        component: BlankView,
        children: [
          {
            path: "bk",
            name: "本科生工作量",
            component: () => import("@/pages/review/thirdData/teaching/bk"),
          },
          {
            path: "yjs",
            name: "研究生工作量",
            component: () => import("@/pages/review/thirdData/teaching/yjs"),
          },
          {
            path: "lxs",
            name: "留学生工作量",
            component: () => import("@/pages/review/thirdData/teaching/lxs"),
          },
        ],
      },
    ],
  },
];
// 职级评定管理
const rankEvaluationManagement = [
  {
    path: "rank-evaluation-rank-management",
    name: "职级评定管理",
    meta: {
      authority: "admin",
    },
    redirect: "/",
    component: PageView,
    children: [
      {
        path: "manage",
        name: "职级评定列表",
        component: () => import("@/pages/review/rank/rank/manage"),
      },
      {
        path: "signUp",
        name: "报名列表（职级评定）",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/review/rank/rank/signUp"),
      },
      {
        path: "list",
        name: "职级评定条件列表",
        component: () => import("@/pages/review/rank/rank/condition"),
      },
    ],
  },
];
// 岗位评聘管理
const PostEvaluationAndEmploymentManagement = [
  {
    path: "rank-evaluation-employ-management",
    name: "职级评定管理（管理岗、机关非教师专技）",
    meta: {
      authority: "admin",
    },
    redirect: "/",
    component: PageView,
    children: [
      {
        path: "manage",
        name: "职级评定列表（管理岗、机关非教师专技）",
        component: () => import("@/pages/review/rank/employ/manage"),
      },
      {
        path: "rule",
        name: "职级评定条件管理（管理岗、机关非教师专技）",
        component: () => import("@/pages/review/rank/employ/rule"),
      },
      {
        path: "signUp",
        name: "报名列表（管理岗、机关非教师专技）",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/review/rank/employ/signUp"),
      },
    ],
  },
];

// 岗位聘任管理
const PostAppointmentManagement = [
  {
    path: "rank-evaluation-appointment-management",
    name: "岗位聘任管理",
    meta: {
      authority: "admin",
    },
    redirect: "/",
    component: PageView,
    children: [
      {
        path: "manage",
        name: "岗位聘任列表",
        component: () => import("@/pages/review/rank/appointment/manage"),
      },
      {
        path: "signUp",
        name: "报名列表（岗位聘任）",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/review/rank/appointment/signUp"),
      },
      {
        path: "list",
        name: "岗位聘任条件列表",
        component: () => import("@/pages/review/rank/appointment/condition"),
      },
    ],
  },
];

// 审核
const trial = [
  {
    path: "welcome-a",
    name: "评审",
    meta: {
      authority: "admin",
    },
    component: () => import("@/pages/review/trial/welcome"),
  },
  {
    path: "welcome-f",
    name: "评审",
    meta: {
      authority: "functions",
    },
    component: () => import("@/pages/review/trial/welcome"),
  },
  {
    path: "welcome-s",
    name: "评审",
    meta: {
      authority: "sector",
    },
    component: () => import("@/pages/review/trial/welcome"),
  },
  {
    path: "trial",
    name: "审核",
    redirect: "/",
    meta: {
      invisible: true,
    },
    component: PageView,
    children: [
      {
        path: "rank-condition",
        name: "职级评定（专技岗）条件列表",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/review/trial/condition/rank.vue"),
      },
      {
        path: "post-condition",
        name: "职级评聘（专技岗）条件列表",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/review/trial/condition/post.vue"),
      },
      {
        path: "employ-condition",
        name: "职级评聘（管理岗、机关非教师专技）条件列表",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/review/trial/condition/employ.vue"),
      },
      {
        path: "rank-info",
        name: "职级评定（专技岗）填报列表",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/review/trial/rank/index.vue"),
      },
      {
        path: "employ-info",
        name: "职级评聘（管理岗、机关非教师专技）填报列表",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/review/trial/employ"),
      },
      {
        path: "post-info",
        name: "职级评聘（专技岗）填报列表",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/review/trial/post/index.vue"),
      },
      // {
      //   path: "teacher-info",
      //   name: "教师信息",
      //   component: () => import("@/pages/review/trial/welcome"),
      // },
    ],
  },
];
const condition = [
  {
    path: "condition",
    name: "专家评审管理",
    meta: {
      authority: "admin",
    },
    redirect: "/",
    component: PageView,
    children: [
      {
        path: "review",
        name: "评审管理",
        meta: {
          // authority: "admin",
        },
        component: () => import("@/pages/expertreview/review/review/index"),
      },
      {
        path: "project",
        name: "评审管理",
        meta: {
          invisible: true,
        },
        component: () => import("@/pages/expertreview/review/project-review/index"),
      },
    ]
  }
];
const achievement=[
  {
    path: "achievement",
    name: "新增业绩",
    meta: {
      invisible: true,
      hidden:true,
    },
    component: () => import("@/pages/review/rank/rank/achievement"),
  },
]
export default [
  ...teacherRoute,
  ...basicData,
  ...accountManage,
  ...thirdData,
  ...rankEvaluationManagement,
  ...PostEvaluationAndEmploymentManagement,
  ...PostAppointmentManagement,
  ...trial,
  ...condition,
  ...achievement,
];

