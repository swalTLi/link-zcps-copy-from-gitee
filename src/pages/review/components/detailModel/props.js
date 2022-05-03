export const CONFIG = [
  {
    title: "用户名",
    dataIndex: "name",
    scopedSlots: { customRender: "description" },

    fixed: "left",
    ellipsis: false,
  },
];
export const props = {
  // 显示隐藏
  visible: {
    type: Boolean,
    required: true,
    default: false,
  },
  // 类型  编辑、详情
  type: {
    type: String,
    required: true,
  },
  // 用户类型
  userType: {
    type: [String, Number],
    required: true,
    default: 0,
  },
  // 宽度
  width: {
    type: Number,
    required: true,
    default: 1000,
  },
  // 标题
  title: {
    type: String,
    required: true,
  },
  // 数据配置
  columns: {
    type: Array,
    default: function() {
      return CONFIG;
    },
  },
  // 用户数据
  record: {
    type: Object,
    default: function() {
      return {};
    },
  },
  // listIndex
  listIndex: {
    type: Number,
    // required: true,
    default: 0,
  },
  //submit回调
  submitCallback: {
    type: String,
    required: true,
  },
};
