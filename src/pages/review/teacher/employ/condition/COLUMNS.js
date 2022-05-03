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
    title: "业绩描述",
    dataIndex: "description",
    scopedSlots: { customRender: "description" },
    ellipsis: false,
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: false,
    rule: [
      {
        required: true,
        message: "描述不超过800字",
        trigger: "change",
      },
    ],
    placeholder: "描述不超过800字",
    radios: [
      {
        label: "开启",
        value: 1,
      },
      {
        label: "不开启",
        value: 0,
      },
    ],
  },
  {
    title: "文件名",
    dataIndex: "fileName",
    scopedSlots: { customRender: "fileName" },
    customRender: (value, row) => {
      const obj = {
        children: ( <span>
            <span style="font-size:16px;font-weight:bold;">附件：</span>
      <a target="_blank" href={row.filePath}>
          {value ? value : "-"}
          </ a>
          </span>

        ),
        attrs: {},
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
        message: "请选择开始时间",
        trigger: "blur",
      },
    ],
    placeholder: "请选择开始时间",
  },
  {
    title: "提交时间",
    dataIndex: "updateTime",
    scopedSlots: { customRender: "updateTime" },
    customRender: value => {
      function getLocalTime(nS) {
        if (nS) {
          return new Date(parseInt(nS) * 1000)
            .toLocaleString()
            .replace(/:\d{1,2}$/, " ")
            .split(" ")[0];
        } else {
          return "无数据";
        }
      }
      const obj = {
        children: getLocalTime(value),
        attrs: {},
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
        message: "请填写具体要求",
        trigger: "blur",
      },
    ],
    placeholder: "请填写具体要求",
  },
  // {
  //   title: "文件地址",
  //   dataIndex: "filePath",
  //   scopedSlots: { customRender: "filePath" },
  //   colSpan: 0,
  //   ellipsis: false,
  //   formType: "ldq-href",
  //   info_show: true,
  //   edit_show: true,
  //   add_show: true,
  //   is_Editable: false,
  //   rule: [
  //     {
  //       required: true,
  //       message: "请选择开始时间",
  //       trigger: "blur",
  //     },
  //   ],
  //   placeholder: "请选择开始时间",
  // },
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
export const rules = {
  researchInfoId: [
    { required: true, message: "请填写完整", trigger: "change" },
  ],
  requireLine: [{ required: true, message: "请填写完整", trigger: "change" }],
  requireId: [{ required: true, message: "请填写完整", trigger: "change" }],
  requireInfo: [{ required: true, message: "请填写完整", trigger: "change" }],
  serialNumberId: [
    { required: true, message: "请填写完整", trigger: "change" },
  ],
  money: [{ required: true, message: "请填写完整", trigger: "blur" }],
  description: [{ required: true, message: "请填写完整", trigger: "blur" }],
  file: [{ required: true, message: "请填写完整", trigger: "blur" }],
  researchInfo: [{ required: true, message: "请填写完整", trigger: "change" }],
  competition: [{ required: true, message: "请填写完整", trigger: "change" }],
  competitionId: [{ required: true, message: "请填写完整", trigger: "change" }],
  competitionInfo: [
    { required: true, message: "请填写完整", trigger: "change" },
  ],
};
