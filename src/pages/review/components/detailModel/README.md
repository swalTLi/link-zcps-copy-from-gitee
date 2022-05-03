# 动态 modal 弹窗组件

## 目录


## 参数配置

### 组件接受参数

```js
const props = {
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
};
```

#### 数据配置 columns

```js
const columns = [
  {
    title: "用户名",
    dataIndex: "name",
    scopedSlots: { customRender: "description" },
    
    fixed: "left",
    ellipsis: false,
    // 是否在详情页展示
    info_show: true,
    // 是否可编辑
    edit_show: true,
    // 校验规则
    rule: [
      {
        required: true,
        message: "请填写用户名",
        trigger: "blur",
      },
      {
        min: 3,
        max: 10,
        message: "字符长度3-10",
        trigger: "blur",
      },
    ],
    // 输入框类型
    formType: "a-input",
    //
  },
];
```

#### 数据配置 record

```js
const record = {
  id: 1,
  name: "sadmin",
  secondarySectorId: 1,
  secondarySectorName: "二级学院a",
  updateTime: 1642837141,
},
```
