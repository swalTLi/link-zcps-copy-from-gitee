export const props = {
  // 数据配置
  columns: {
    type: Array,
    required: true,
  },
  // 类型
  formType: {
    type: String,
    required: true,
  },
  // 数据
  records: {
    type: Object,
    required: true,
  },
  // 操作
  option: {
    type: Boolean,
    required: true,
  },
  // id
  id: {
    type: [String, Number],
    required: true,
  },
  // 数据类型
  userType: {
    type: [String, Number],
    required: true,
  },
  // 当前数据第几行
  listIndex: {
    type: [String, Number],
    required: true,
  },
};
