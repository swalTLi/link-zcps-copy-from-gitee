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
    scopedSlots: { customRender: "id" },
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
    
    ellipsis: false,
    
    formType: "ldq-input",
    // 查看详情时是否显示
    info_show: true,
    
    edit_show: true,
    
    is_Editable: false,
    
    add_show: false,
  },
  {
    title: "登录名",
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
        message: "请填写登录名",
        trigger: "blur",
      },
      {
        min: 3,
        max: 20,
        message: "字符长度3-20",
        trigger: "blur",
      },
    ],
    placeholder: "请填写登录名，字符长度3-20",
  },
  {
    title: "密码",
    dataIndex: "password",
    scopedSlots: { customRender: "password" },
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
    
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: false,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写密码",
        trigger: "blur",
      },
      {
        min: 3,
        max: 20,
        message: "字符长度3-20",
        trigger: "blur",
      },
    ],
    placeholder: "请填写密码，字符长度3-20",
  },
  {
    title: "二级部门",
    dataIndex: "secondarySectorId",
    scopedSlots: { customRender: "secondarySectorId" },
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
    ellipsis: false,
    
    formType: "ldq-select",
    info_show: false,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请选择二级部门",
        trigger: "blur",
      },
    ],
    placeholder: "请选择二级部门",
    selectType: "api",
    Api: "searchSecondarySectorDepartmentList",
    selects: [],
  },
  {
    title: "二级部门名称",
    dataIndex: "secondarySectorName",
    scopedSlots: { customRender: "secondarySectorName" },
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: false,
    add_show: false,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请选择二级部门名称",
        trigger: "blur",
      },
    ],
    placeholder: "请选择二级部门名称",
    selectType: "api",
    Api: "searchSecondarySectorDepartmentList",
    selects: [],
  },
  {
    title: "允许登陆",
    dataIndex: "allowLogin",
    scopedSlots: { customRender: "allowLogin" },

    ellipsis: false,
    
    formType: "ldq-radio",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请设置是否允许用户登陆",
        trigger: "change",
      },
    ],
    placeholder: "请设置是否允许用户登陆",
    radios: [
      {
        label: "允许",
        value: 1,
      },
      {
        label: "不允许",
        value: 0,
      },
    ],
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    scopedSlots: { customRender: "updateTime" },
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
    ellipsis: false,
    
    info_show: false,
    edit_show: false,
    add_show: false,
    is_Editable: false,
  },
  {
    title: "操作",
    dataIndex: "caozuo",
    scopedSlots: { customRender: "action" },
    // fixed: "right",
    // 是否在详情页展示
    info_show: false,
    // 是否在编辑页展示
    edit_show: false,
    add_show: false,
  },
];
