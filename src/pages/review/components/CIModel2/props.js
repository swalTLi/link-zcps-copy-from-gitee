export const props = {
  // 显示隐藏
  visible: {
    type: Boolean,
    required: true,
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
  },
  // 用户数据
  record: {
    type: Object,
  },
  // listIndex
  listIndex: {
    type: Number,
    default: 0,
  },
};
