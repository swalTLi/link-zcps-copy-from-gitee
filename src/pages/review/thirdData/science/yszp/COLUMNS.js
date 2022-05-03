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
    title: "艺术作品id",
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
    title: "艺术作品名称",
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
        message: "请填写艺术作品名称",
        trigger: "blur",
      },
      {
        min: 3,
        max: 50,
        message: "字符长度3-50",
        trigger: "blur",
      },
    ],
    placeholder: "请填写艺术作品名称，字符长度3-50",
  },
  {
    title: "作品类型",
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
        message: "请填写作品类型",
        trigger: "blur",
      },
    ],
    placeholder: "请填写作品类型",
  },
  {
    title: "奖励类型",
    dataIndex: "level",
    scopedSlots: { customRender: "level" },
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请输入奖励类型",
        trigger: "change",
      },
    ],
    placeholder: "请输入奖励类型",
  },
  {
    title: "奖励级别",
    dataIndex: "awardRank",
    scopedSlots: { customRender: "awardRank" },
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请输入奖励级别",
        trigger: "change",
      },
    ],
    placeholder: "请输入奖励级别",
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
