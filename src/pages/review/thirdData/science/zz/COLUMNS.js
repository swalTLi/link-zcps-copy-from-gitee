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
    title: "著作id",
    dataIndex: "id",
    scopedSlots: { customRender: "description" },
    ellipsis: false,
    
    formType: "ldq-input",
    // 查看详情时是否显示
    info_show: true,
    
    edit_show: true,
    
    is_Editable: false,
    
    add_show: false,
  },
  {
    title: "著作名称",
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
        message: "请填写著作",
        trigger: "blur",
      },
      {
        min: 3,
        max: 50,
        message: "字符长度3-50",
        trigger: "blur",
      },
    ],
    placeholder: "请填写著作，字符长度3-50",
  },
  {
    title: "学科分类",
    dataIndex: "subject",
    scopedSlots: { customRender: "subject" },
    
    
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写学科分类",
        trigger: "blur",
      },
      {
        min: 3,
        max: 20,
        message: "字符长度3-20",
        trigger: "blur",
      },
    ],
    placeholder: "请填写学科分类，字符长度3-20",
  },
  {
    title: "发表范围",
    dataIndex: "scope",
    scopedSlots: { customRender: "scope" },
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请输入发表范围",
        trigger: "change",
      },
    ],
    placeholder: "请输入发表范围",
  },
  {
    title: "字数（万字）",
    dataIndex: "wordCount",
    scopedSlots: { customRender: "wordCount" },
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请输入字数（万字）",
        trigger: "change",
      },
    ],
    placeholder: "请输入字数（万字）",
  },
  {
    title: "著作类型",
    dataIndex: "type",
    scopedSlots: { customRender: "type" },
    
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请选择著作类型",
        trigger: "blur",
      },
    ],
    placeholder: "请请选择著作类型",
  },
  {
    title: "出版社",
    dataIndex: "press",
    scopedSlots: { customRender: "press" },
    
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请选择出版社",
        trigger: "blur",
      },
    ],
    placeholder: "请请选择出版社",
  },
  {
    title: "来源",
    dataIndex: "source",
    scopedSlots: { customRender: "source" },
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
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请输入总参与单位数量",
        trigger: "blur",
      },
    ],
    placeholder: "请输入总参与单位数量",
  },
  {
    title: "总参与单位数量",
    dataIndex: "participatingUnitsNumber",
    scopedSlots: { customRender: "participatingUnitsNumber" },
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
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请输入总参与单位数量",
        trigger: "blur",
      },
    ],
    placeholder: "请输入总参与单位数量",
  },
  {
    title: "所在单位排名",
    dataIndex: "participatingUnitsRank",
    scopedSlots: { customRender: "participatingUnitsRank" },
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
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请输入所在单位排名",
        trigger: "blur",
      },
    ],
    placeholder: "请输入所在单位排名",
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
