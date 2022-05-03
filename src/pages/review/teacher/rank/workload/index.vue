<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-page-header title="工作量信息"/>
    <a-steps :current="currentStep">
      <a-step title="教学工作量"/>
      <a-step title="科研工作量"/>
      <a-step title="教研工作量"/>
      <a-step title="创新工作量"/>
      <a-step title="总计"/>
    </a-steps>
    <div>
      <a-card style="width:50%;margin:auto;margin-top:50px;margin-bottom:50px;">
        <div
            style="width:50%;margin:auto;font-size:20px;"
            v-if="currentStep === 0 && stepData['jxgzl']"
        >
          <div class="info">
            <label>本科生:</label><label>{{ stepData["jxgzl"]["bk"] }}</label>
          </div>
          <div class="info">
            <label>研究生:</label><label>{{ stepData["jxgzl"]["yjs"] }}</label>
          </div>
          <div class="info">
            <label>留学生:</label><label>{{ stepData["jxgzl"]["lxs"] }}</label>
          </div>
          <div class="" style="font-size: small;color: red;text-align: center">
            <div>
              本科教学工作量&lt;=120时
            </div>
            <div>
              工作量合计为本科生+研究生*0.75
            </div>
            <div>
              年均工作量向下取整数
            </div>
          </div>
          <a-divider/>
          <div class="info">
            <label>合计:</label><label>{{ Math.floor(stepData["jxgzl"]["count"]) }}</label>
          </div>
          <div class="info">
            <label>年均:</label><label>{{ Math.floor(stepData["jxgzl"]["count"] / 3) }}</label>
          </div>
        </div>
        <div
            style="width:50%;margin:auto;font-size:20px;"
            v-if="currentStep === 1 && stepData['kygzl']"
        >
          <div class="info">
            <label>科技处:</label><label>{{ stepData["kygzl"]["kjc"] }}</label>
          </div>
          <div class="" style="font-size: small;color: red;text-align: center">
            <div>
              年均工作量向下取整数
            </div>
          </div>
          <a-divider/>
          <div class="info">
            <label>合计:</label><label>{{ Math.floor(stepData["kygzl"]["count"]) }}</label>
          </div>
          <div class="info">
            <label>年均:</label><label>{{ Math.floor(stepData["kygzl"]["count"] / 3) }}</label>
          </div>
        </div>
        <div
            style="width:50%;margin:auto;font-size:20px;"
            v-if="currentStep === 2 && stepData['jygzl']"
        >
          <H1 style="text-align: center">
            本科生
          </H1>
          <div class="info">
            <label>共建项目:</label
            ><label>{{ stepData["jygzl"]["bk"]["gjxm"] }}</label>
          </div>
          <div class="info">
            <label>教材:</label
            ><label>{{ stepData["jygzl"]["bk"]["jc"] }}</label>
          </div>
          <div class="info">
            <label>教改论文:</label
            ><label>{{ stepData["jygzl"]["bk"]["jglw"] }}</label>
          </div>
          <div class="info">
            <label>教改项目:</label
            ><label>{{ stepData["jygzl"]["bk"]["jgxm"] }}</label>
          </div>
          <div class="info">
            <label>教学比赛:</label
            ><label>{{ stepData["jygzl"]["bk"]["jxbs"] }}</label>
          </div>
          <div class="info">
            <label>教学成果:</label
            ><label>{{ stepData["jygzl"]["bk"]["jxcg"] }}</label>
          </div>
          <div class="info">
            <label>教学工程:</label
            ><label>{{ stepData["jygzl"]["bk"]["jxgc"] }}</label>
          </div>
          <div class="info">
            <label>课程:</label
            ><label>{{ stepData["jygzl"]["bk"]["kc"] }}</label>
          </div>
          <!--          <div class="info">-->
          <!--            <label>荣誉称号:</label-->
          <!--            ><label>{{ stepData["jygzl"]["bk"]["rych"] }}</label>-->
          <!--          </div>-->
          <a-divider/>
          <H1 style="text-align: center">
            研究生
          </H1>
          <div class="info">
            <label>教改项目:</label
            ><label>{{ stepData["jygzl"]["yjs"]["yjsjgxm"] }}</label>
          </div>
          <div class="info">
            <label>教学比赛:</label
            ><label>{{ stepData["jygzl"]["yjs"]["yjsjxbs"] }}</label>
          </div>
          <div class="info">
            <label>教学工程:</label
            ><label>{{ stepData["jygzl"]["yjs"]["yjsjxgc"] }}</label>
          </div>
          <!--          <div class="info">-->
          <!--            <label>本科生:</label-->
          <!--            ><label>{{ stepData["jygzl"]["bk"]["count"] }}</label>-->
          <!--          </div><div class="info">-->
          <!--            <label>研究生:</label-->
          <!--            ><label>{{ stepData["jygzl"]["yjs"]["count"] }}</label>-->
          <!--          </div>-->
          <div class="" style="font-size: small;color: red;text-align: center">
            <div>
              年均工作量向下取整数
            </div>
          </div>
          <a-divider/>
          <div class="info">
            <label>合计:</label><label>{{ Math.floor(stepData["jygzl"]["count"]) }}</label>
          </div>
          <div class="info">
            <label>年均:</label><label>{{ Math.floor(stepData["jygzl"]["count"] / 3) }}</label>
          </div>
        </div>
        <div
            style="width:50%;margin:auto;font-size:20px;"
            v-if="currentStep === 3 && stepData['cxgzl']"
        >
          <div class="info">
            <label>竞赛:</label><label>{{ stepData["cxgzl"]["js"] }}</label>
          </div>
          <div class="info">
            <label>大创:</label><label>{{ stepData["cxgzl"]["dc"] }}</label>
          </div>
          <div class="" style="font-size: small;color: red;text-align: center">
            <div>
              年均工作量向下取整数
            </div>
          </div>
          <a-divider/>
          <div class="info">
            <label>合计:</label><label>{{ Math.floor(stepData["cxgzl"]["count"]) }}</label>
          </div>
          <div class="info">
            <label>年均:</label><label>{{ Math.floor(stepData["cxgzl"]["count"] / 3) }}</label>
          </div>
        </div>
        <div
            style="width:50%;margin:auto;font-size:20px;"
            v-if="currentStep === 4"
        >
          <a-divider v-if="currentStep !== 4"/>
          <div class="" style="font-size: small;color: red;text-align: center">
            <div>
              年均工作量向下取整数
            </div>
          </div>
          <div class="info">
            <label>工作量合计:</label><label>{{ Math.floor(stepData["count"]) }}</label>
          </div>
          <div class="info">
            <label>工作量年均:</label><label>{{ Math.floor(stepData["count"] / 3) }}</label>
          </div>
        </div>
      </a-card>
      <div
          v-if="stepData.length !== 0"
          style="margin:auto;width:200px;display:flex;justify-content:space-around;"
      >
        <a-button
            type="primary"
            size="large"
            @click="currentStep -= 1"
            v-if="currentStep <= 4 && currentStep > 0"
        >上一步
        </a-button
        >
        <a-button
            type="primary"
            size="large"
            @click="currentStep += 1"
            v-if="currentStep < 4"
        >下一步
        </a-button
        >
        <a-button
            type="primary"
            size="large"
            @click="setTeacherRankWorkload()"
            v-if="currentStep === 4 && !is_ok"
        >提交工作量
        </a-button
        >
        <a-button
            type="primary"
            size="large"
            @click="goto('/rank/teacher-rank-condition', { ...$route.query })"
            v-if="currentStep === 4 && is_ok"
        >填报业绩
        </a-button
        >
        <!-- 填报业绩条件 -->
      </div>
    </div>
  </a-card>
</template>

<script>
// import DetailList from "@/components/tool/DetailList";
import XHR from "@/services/interface";

export default {
  name: "SingUp",
  i18n: require("./i18n"),
  data() {
    return {
      form: {
        gzl: 1,
        desc: "text",
        pdf: "",
      },
      labelCol: {span: 4},
      wrapperCol: {span: 20},
      gw: ["校聘专业技术岗位"],
      xl: ["专任教师", "非专任教师"],
      dj: ["三级", "四级", "五级", "六级", "七级"],
      rules: {
        gzl: [{required: true, message: "请输入工作量", trigger: "blur"}],
        desc: [{required: true, message: "请填写描述", trigger: "blur"}],
        pdf: [{required: true, message: "请填写描述", trigger: "blur"}],
      },
      current: 1,
      // 工作量进度
      currentStep: 0,
      stepData: [],
      is_ok: false,
      is_upload: false,
    };
  },
  // components: { DetailList },
  computed: {
    desc() {
      return this.$t("pageDesc");
    },
  },
  async mounted() {
    await this.getList();
  },
  methods: {
    async getList() {
      await XHR.Axios_$$getTeacherApplyRateInfo({
        rankReviewId: this.$route.query.rankReviewId,
      }).then(_ => {
        console.log(_.data.info);
        // this.current = _.data.info.all - 1;
        this.info = _.data.info;
      });
      await XHR.Axios_$$getTeacherRankWorkload({
        rankReviewId: this.$route.query.rankReviewId,
      }).then(_ => {
        console.log(_.data.info);
        if (_.data.info.length === 0) {
          XHR.Axios_$$gatherTeacherRankWorkload({
            rankReviewId: this.$route.query.rankReviewId,
          }).then(__ => {
            this.stepData = __.data.info;
          });
        } else {
          this.stepData = _.data.info;
          this.currentStep = 4;
          this.is_ok = true;
        }
      });
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.is_upload) {
            console.log(this.form);
            this.is_ok = true;
          } else {
            this.$message.error(`请上传附件！！`);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.is_upload = true;
        this.$message.success(`${info.file.name} 文件上传成功.`);
        this.form.pdf = info.file.name;
      } else if (status === "error") {
        this.$message.error(`${info.file.name} 文件上传失败.`);
      }
    },
    setTeacherRankWorkload() {
      XHR.Axios_$$setTeacherRankWorkload({
        rankReviewId: this.$route.query.rankReviewId,
      }).then(_ => {
        console.log(_);
        this.is_ok = true;
      });
    },
    goto(path, query) {
      this.$router.push({path, query: {...query, ...this.info}});
    },
  },
};
</script>

<style scoped lang="less">
.info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}
</style>
