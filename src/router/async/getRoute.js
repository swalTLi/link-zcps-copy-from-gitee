const rank = [
  {
    router: "condition",
    path: "condition",
    name: "条件管理",
    icon: "file-excel",
    authority: "admin",
  },
  {
    router: "rank",
    children: ["manage", "userInfo", "approve",""],
  },
];
export default [
  {
    router: "root",
    children: [
      {
        router: "dashboard",
        children: ["workplace", "analysis"],
      },
      {
        router: "form",
        children: ["basicForm", "stepForm", "advanceForm"],
      },
      {
        router: "basicForm",
        name: "验权表单",
        icon: "file-excel",
        authority: "admin",
      },
      {
        router: "antdv",
        path: "antdv",
        name: "Ant Design Vue",
        icon: "ant-design",
        link: "https://www.antdv.com/docs/vue/introduce-cn/",
      },
      {
        router: "document",
        path: "document",
        name: "使用文档",
        icon: "file-word",
        link: "https://iczer.gitee.io/vue-antd-admin-docs/",
      },
      ...rank,
    ],
  },
];
