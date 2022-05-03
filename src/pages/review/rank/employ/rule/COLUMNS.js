export const COLUMNS = [
  {
    title: "序号",
    dataIndex: "index",
    scopedSlots: { customRender: "index" },
    ellipsis: false,
    
    info_show: false,
    // 是否在编辑页展示
    edit_show: false,
    is_Editable: false,
    add_show: false,
  },
  {
    title: "id",
    dataIndex: "id",
    scopedSlots: { customRender: "description" },
    colSpan: 0,
    customRender: value => {
      const obj = {
        children: value,
        attrs: {
          colSpan: 0,
        },
      };
      return obj;
    },
    
    
    formType: "ldq-input",
    // 查看详情时是否显示
    info_show: true,
    
    edit_show: true,
    
    is_Editable: false,
    
    add_show: false,
  },
  {
    title: "业绩条件名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" },
    
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写业绩条件名称",
        trigger: "blur",
      },
    ],
    placeholder: "请填写业绩条件名称",
  },
  {
    title: "业绩条件显示给教师时的名称",
    dataIndex: "teacherChooseName",
    scopedSlots: { customRender: "teacherChooseName" },
    
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写业绩条件显示给教师时的名称",
        trigger: "blur",
      },
    ],
    placeholder: "请填写业绩条件显示给教师时的名称",
  },
  {
    title: "操作",
    dataIndex: "caozuo",
    scopedSlots: { customRender: "action" },
    // 是否在详情页展示
    info_show: false,
    // 是否在编辑页展示
    edit_show: false,
    add_show: false,
  },
];
