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
    title: "竞赛id",
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
    title: "比赛名称",
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
        message: "请填写比赛名称",
        trigger: "blur",
      },
    ],
    placeholder: "请填写比赛名称",
  },
  {
    title: "作品名称",
    dataIndex: "worksName",
    scopedSlots: { customRender: "worksName" },
    
    
    
    formType: "ldq-input",
    info_show: false,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写作品名称",
        trigger: "blur",
      },
    ],
    placeholder: "请填写作品名称",
  },
  {
    title: "比赛级别",
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
        message: "请输入比赛级别",
        trigger: "change",
      },
    ],
    placeholder: "请输入比赛级别",
  },
  {
    title: "获奖等级",
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
        message: "请输入获奖等级",
        trigger: "change",
      },
    ],
    placeholder: "请输入获奖等级",
    message: "请输入获奖等级",
  },
  {
    title: "是否官方",
    dataIndex: "official",
    scopedSlots: { customRender: "official" },
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请输是否官方",
        trigger: "change",
      },
    ],
    placeholder: "请输是否官方",
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
