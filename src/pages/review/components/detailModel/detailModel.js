import { props } from "./props";
import detail from "./detail.vue";
import XHR from "@/services/interface";
import AuthorTable from "@/pages/review/components/AuthorTable";
import moment from "moment";
import "moment/locale/zh-cn";
// console.log(props, CONFIG);
export default {
  name: "DetailModel",
  props: props,
  components: { detail, AuthorTable },
  data() {
    return {
      moment,
      confirmLoading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      resetFormBtn: true,
      form: undefined,
      rules: undefined,
      userData: undefined,
      // select 远程搜索
      selectObj: {},
      submit:undefined
    };
  },
  async created() {
    console.log(this)
    // console.log(this.submitCallback)
    // console.log(this.title)
    // console.log(this.type)
    // console.log(this.columns)
    this.userData = { ...this.record };
    if (this.userType === "zjpdgl") {
      /**
       * 职级评定列表管理
       */
      console.log(this.$props);
    } else if (this.userType === "condition") {
      /**
       * 条件管理
       */
      console.log(this.userType);
      this.userData = { ...this.record };
      /**
       * 普通增删改查弹窗
       */
      // await XHR.Axios_$$thirdPartyData_kjc_data_getList({
      //   page: 1,
      //   line: 100,
      //   type: this.userType,
      // }).then(_ => {
      //   console.log([this.listIndex]);
      //   console.log(this.record);
      //   this.record.author = _.data.info.list[this.listIndex].author;
      // });
    } else if (
      this.userType in { kycg: 1, kyxm: 1, lw: 1, yszp: 1, zl: 1, zz: 1 }
    ) {
      /**
       * 科技处
       */
    } else if (this.userType in { js: 1, dc: 1 }) {
      /**
       * 创新学院
       */
    } else if (
      this.userType in
      {
        gjxm: 1,
        jc: 1,
        jglw: 1,
        jgxm: 1,
        jxbs: 1,
        jxcg: 1,
        jxgc: 1,
        kc: 1,
        rych: 1,
      }
    ) {
      /**
       * 教务处
       */
    } else if (
      this.userType in
      {
        bk: 1,
        yjs: 1,
        lxs: 1,
      }
    ) {
      /**
       * 教学工作量
       */
    } else if (
      (this.type === "Edit" && this.userType !== 0) ||
      this.type === "Info"
    ) {
      /**
       * 普通增删改查弹窗
       */
      await XHR.Axios_$$getInfo({
        id: this.record["id"],
        type: this.userType,
      }).then(_ => {
        this.userData = { ...this.record, ..._.data.info };
      });
    }
    const form = {};
    const rules = {};
    await this.columns.forEach(_ => {
      if (_.edit_show || _.info_show) {
        form[_.dataIndex] = this.userData[_.dataIndex];
      }
      // rule
      if (_.rule) {
        rules[_.dataIndex] = _.rule;
      }
    });
    this.form = { ...form };
    this.rules = { ...rules };
  },
  methods: {
    handleCallBack(data) {
      // 成功
      if (data.state === 1) {
        this.$emit("closemodel");
        this.$emit("getList");
      }
      this.confirmLoading = false;
    },
    handleBlur(ref) {
      if (this.rules[ref]) {
        this.$refs[ref][0].onFieldBlur();
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // alert("submit!");
          console.log(this.form);
          this.confirmLoading = true;
          this.$emit("handleDetailModelSubmit", {
            type: this.type,
            form: this.form,
            submitCallback: this.submitCallback,
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    // eslint-disable-next-line no-unused-vars
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        // this.visible = false;
        this.$emit("closemodel");
        this.confirmLoading = false;
      }, 2000);
    },
    // eslint-disable-next-line no-unused-vars
    handleCancel(e) {
      // console.log("Clicked cancel button");
      this.$emit("closemodel");
    },
    // select
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleBlur2() {
      console.log("blur");
    },
    // 调用接口获取列表数据
    // async handleFocus({ selectType, Api }, val) {
    handleFocus() {
      // console.log(Api, val);
      // if (
      //   selectType &&
      //   selectType === "api" &&
      //   this.selectObj[val].length < 1
      // ) {
      //   await XHR[`Axios_$$${Api}`]({
      //     page: 1,
      //     line: 1000000,
      //   }).then(_ => {
      //     this.selectObj[val] = _.data.info.list;
      //     console.log(this.selectObj);
      //   });
      // }
      // this.$forceUpdate();
    },
    // 工具
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    // 获取默认值
    getDefaultValue(form, key, selects) {
      console.log(form, key, form[key]);
      selects.forEach(_ => {
        if (_.id === form[key]) {
          return _.name;
        }
      });
    },
    // 转换时间戳
    datatimeChange(dateString, key) {
      this.form[key] = new Date(dateString).getTime() / 1000;
    },
    // 日期转时间戳
    dateToTimestamp(dateStr) {
      if (!dateStr) {
        return "";
      }
      let date = new Date(dateStr);
      let timestamp = date.getTime();
      return timestamp;
    },
    // 时间戳转日期
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ")
          .split(" ")[0];
    },
    onChange(value, dateString) {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
    },
    onOk(value) {
      console.log("onOk: ", value);
    },
  },
};

// handleFocus({ selectType, Api }, val) {
//   console.log(Api, val, val in this.selectObj);
//   console.log("focus");
//   console.log(this.selectObj[val]);
//   if (
//     selectType &&
//     selectType === "api" &&
//     val in this.selectObj === false
//   ) {
//     XHR[`Axios_$$${Api}`]({
//       page: 1,
//       line: 1000000,
//     }).then(_ => {
//       this.selectObj[val] = _.data.info.list;
//       console.log(_.data.info.list);
//     });
//   }
//   console.log(this.selectObj);
// },
