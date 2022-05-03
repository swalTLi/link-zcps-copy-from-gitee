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
    title: "用户id",
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
    title: "教师账号登录名",
    dataIndex: "name",
    scopedSlots: { customRender: "description" },
    
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写教师账号登录名",
        trigger: "blur",
      },
      {
        min: 3,
        max: 20,
        message: "字符长度3-20",
        trigger: "blur",
      },
    ],
    placeholder: "请填写教师账号登录名，字符长度3-20",
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
    title: "教师姓名",
    dataIndex: "teacherName",
    scopedSlots: { customRender: "description" },
    
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写教师姓名",
        trigger: "blur",
      },
      {
        min: 2,
        max: 10,
        message: "字符长度2-10",
        trigger: "blur",
      },
    ],
    placeholder: "请填写教师姓名，字符长度3-20",
  },
  {
    title: "岗位",
    dataIndex: "jobId",
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
    
    ellipsis: false,
    
    formType: "ldq-select",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请选择岗位",
        trigger: "blur",
      },
    ],
    placeholder: "请选择岗位",
    selectType: "api",
    Api: "searchJobList",
    selects: [],
  },
  {
    title: "岗位系列",
    dataIndex: "postSeriesId",
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
    
    ellipsis: false,
    
    formType: "ldq-select",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请选择岗位系列",
        trigger: "blur",
      },
    ],
    placeholder: "请选择岗位系列",
    selectType: "api",
    Api: "searchPostSeriesList",
    selects: [],
  },
  {
    title: "岗位等级",
    dataIndex: "postGradeId",
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
    
    ellipsis: false,
    
    formType: "ldq-select",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写岗位等级",
        trigger: "blur",
      },
    ],
    placeholder: "请填写岗位等级，字符长度3-20",
    selectType: "api",
    Api: "searchPostGradeList",
    selects: [],
  },
  {
    title: "岗位类型",
    dataIndex: "postTypeId",
    scopedSlots: { customRender: "postTypeId" },
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
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    // rule: [
    //   {
    //     required: true,
    //     message: "请填写岗位类型",
    //     trigger: "blur",
    //   },
    // ],
    placeholder: "请填写岗位类型",
    selectType: "api",
    Api: "searchPostTypeList",
    selects: [],
  },
  {
    title: "职称",
    dataIndex: "titleId",
    scopedSlots: { customRender: "titleId" },
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
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写职称",
        trigger: "blur",
      },
    ],
    placeholder: "请填写职称",
    selectType: "api",
    Api: "searchTitleList",
    selects: [],
  },
  
  {
    title: "职称获取时间",
    dataIndex: "titleTime",
    scopedSlots: { customRender: "titleTime" },
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
    
    formType: "ldq-datatime",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    // rule: [
    //   {
    //     required: true,
    //     message: "请填写职称获取时间",
    //     trigger: "blur",
    //   },
    // ],
    placeholder: "请填写职称获取时间",
  },
  {
    title: "学历",
    dataIndex: "educationId",
    scopedSlots: { customRender: "educationId" },
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
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    // rule: [
    //   {
    //     required: true,
    //     message: "请填写学历",
    //     trigger: "blur",
    //   },
    // ],
    placeholder: "请填写学历",
    selectType: "api",
    Api: "searchEducationList",
    selects: [],
  },
  
  {
    title: "二级部门",
    dataIndex: "secondarySectorId",
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
    
    ellipsis: false,
    
    formType: "ldq-select",
    info_show: true,
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
    title: "岗位聘任时间",
    dataIndex: "postTime",
    scopedSlots: { customRender: "postTime" },
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
    
    formType: "ldq-datatime",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请选择岗位聘任时间",
        trigger: "blur",
      },
    ],
    placeholder: "请选择岗位聘任时间",
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
    // 是否在详情页展示
    info_show: false,
    // 是否在编辑页展示
    edit_show: false,
    add_show: false,
  },
];
