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
    title: "教材id",
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
    ellipsis: false,
    
    formType: "ldq-input",
    // 查看详情时是否显示
    info_show: true,
    
    edit_show: true,
    
    is_Editable: false,
    
    add_show: false,
  },
  {
    title: "名称",
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
        message: "请填写共建教材名称",
        trigger: "blur",
      },
    ],
    placeholder: "请填写共建教材名称",
  },
  {
    title: "等级",
    dataIndex: "level",
    scopedSlots: { customRender: "level" },
    
    
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写等级",
        trigger: "blur",
      },
    ],
    placeholder: "请填写等级",
  },
  {
    title: "字数（万字）",
    dataIndex: "wordCount",
    scopedSlots: { customRender: "wordCount" },
    
    
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写总字数",
        trigger: "blur",
      },
    ],
    placeholder: "请填写总字数",
  },
  {
    title: "教材类型",
    dataIndex: "type",
    scopedSlots: { customRender: "type" },
    
    
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写教材类型",
        trigger: "blur",
      },
    ],
    placeholder: "请填写教材类型",
  },
  {
    title: "工作量",
    dataIndex: "workload",
    scopedSlots: { customRender: "workload" },
    
    
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写工作量",
        trigger: "blur",
      },
    ],
    placeholder: "请填写工作量",
  },
  {
    title: "参与者",
    dataIndex: "author",
    scopedSlots: { customRender: "author" },
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
    info_show: true,
    edit_show: false,
    add_show: false,
    is_Editable: true,
    formType: "ldq-list",
    childrens: [
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
        info_show: true,
        edit_show: true,
        add_show: false,
        is_Editable: false,
        rule: [
          {
            required: true,
            message: "请输入id",
            trigger: "blur",
          },
        ],
        placeholder: "请输入id",
      },
      {
        title: "排名",
        dataIndex: "rank",
        scopedSlots: { customRender: "rank" },
        
        ellipsis: false,
        
        formType: "ldq-input",
        info_show: true,
        edit_show: true,
        add_show: true,
        is_Editable: true,
        rule: [
          {
            required: true,
            message: "请输入排名",
            trigger: "blur",
          },
        ],
        placeholder: "请输入排名",
      },
      {
        title: "工号",
        dataIndex: "sid",
        scopedSlots: { customRender: "sid" },
        ellipsis: false,
        
        formType: "ldq-input",
        
        info_show: true,
        edit_show: true,
        add_show: true,
        is_Editable: true,
        rule: [
          {
            required: true,
            message: "请输入工号",
            trigger: "blur",
          },
        ],
        placeholder: "请输入工号",
      },
      {
        title: "姓名",
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
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        placeholder: "请输入姓名",
      },
      {
        title: "操作",
        dataIndex: "operation",
        scopedSlots: { customRender: "operation" },
        // 是否在详情页展示
        info_show: false,
        // 是否在编辑页展示
        edit_show: false,
        add_show: false,
      },
    ],
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
