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
    title: "专利id",
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
    title: "专利名称",
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
        message: "请填写专利名称",
        trigger: "blur",
      },
      {
        min: 3,
        max: 50,
        message: "字符长度3-50",
        trigger: "blur",
      },
    ],
    placeholder: "请填写专利名称，字符长度3-50",
  },
  {
    title: "专利分类",
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
        message: "请填写专利分类",
        trigger: "blur",
      },
    ],
    placeholder: "请填写专利分类",
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
    title: "申请编号",
    dataIndex: "applySid",
    scopedSlots: { customRender: "applySid" },
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请输入申请编号",
        trigger: "change",
      },
    ],
    placeholder: "请输入申请编号",
  },
  {
    title: "授权编号",
    dataIndex: "authorizeSid",
    scopedSlots: { customRender: "authorizeSid" },
    
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请选择授权编号",
        trigger: "blur",
      },
    ],
    placeholder: "请请选择授权编号",
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
