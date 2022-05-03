export const COLUMNS = [
  {
    title: "标签ID",
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
    title: "分组",
    dataIndex: "labelId",
    scopedSlots: { customRender: "labelId" },

    ellipsis: false,

    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
  },
  {
    title: "姓名",
    dataIndex: "teacherName",
    scopedSlots: { customRender: "teacherName" },

    ellipsis: false,

    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
  },
  {
    title: "工号",
    dataIndex: "teacherSid",
    scopedSlots: { customRender: "teacherSid" },

    ellipsis: false,

    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
  },
  {
    title: "教师所属二级部门（学院）名称",
    dataIndex: "secondarySectorName",
    scopedSlots: { customRender: "secondarySectorName" },

    ellipsis: false,

    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
  },
  // {
  //   title: "标签名",
  //   dataIndex: "labelName",
  //   scopedSlots: { customRender: "labelName" },
  //
  //   ellipsis: false,
  //
  //   formType: "ldq-input",
  //   info_show: true,
  //   edit_show: true,
  //   add_show: true,
  //   is_Editable: true,
  //   rule: [
  //     {
  //       required: true,
  //       message: "请填写用户名",
  //       trigger: "blur",
  //     },
  //     {
  //       min: 3,
  //       max: 20,
  //       message: "字符长度3-20",
  //       trigger: "blur",
  //     },
  //   ],
  //   placeholder: "请填写用户名，字符长度3-20",
  // },
  // {
  //   title: "参与评审的业绩条件id",
  //   dataIndex: "performanceCriteriaId",
  //   scopedSlots: { customRender: "performanceCriteriaId" },
  //
  //   ellipsis: false,
  //
  //   formType: "ldq-input",
  //   info_show: true,
  //   edit_show: true,
  //   add_show: true,
  //   is_Editable: true,
  // },
  // {
  //   title: "参与评审的业绩条件名",
  //   dataIndex: "performanceCriteriaName",
  //   scopedSlots: { customRender: "performanceCriteriaName" },
  //
  //   ellipsis: false,
  //
  //   formType: "ldq-input",
  //   info_show: true,
  //   edit_show: true,
  //   add_show: true,
  //   is_Editable: true,
  // },
  {
    title: "申请职级",
    dataIndex: "performanceCriteriaTeacherChooseName",
    scopedSlots: { customRender: "performanceCriteriaTeacherChooseName" },

    ellipsis: false,

    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
  },
  {
    title: "教师ID",
    dataIndex: "teacherId",
    scopedSlots: { customRender: "teacherId" },

    ellipsis: false,

    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
  },


  {
    title: "教师所属二级部门（学院）id",
    dataIndex: "secondarySectorId",
    scopedSlots: { customRender: "secondarySectorId" },

    ellipsis: false,

    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
  },
  {
    title: "",
    dataIndex: "expertList",
    scopedSlots: { customRender: "expertList" },
    colSpan: 2,
    ellipsis: false,
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
  },
  {
    title: "教师所属二级部门（学院）id",
    dataIndex: "secondarySectorId",
    scopedSlots: { customRender: "secondarySectorId" },

    ellipsis: false,

    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
  },
  {
    title: "操作",
    dataIndex: "caozuo",
    scopedSlots: { customRender: "caozuo" },

    ellipsis: false,

    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
  },

]
