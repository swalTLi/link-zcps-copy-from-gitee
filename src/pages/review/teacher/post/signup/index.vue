<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-page-header title="报名" />
    <a-form-model
      v-if="!is_ok"
      :model="form"
      :rules="rules"
      ref="ruleForm"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <!-- <a-form-model-item label="岗位" prop="gw">
        <a-select v-model="form.gw" placeholder="请选择岗位">
          <a-select-option v-for="item in gw" :key="item" :value="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="系列" prop="xl">
        <a-select v-model="form.xl" placeholder="请选择岗位系列">
          <a-select-option v-for="item in xl" :key="item" :value="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-model-item> -->
      <a-form-model-item label="岗位聘任条件" prop="performanceCriteriaId">
        <a-select
          v-model="form.performanceCriteriaId"
          placeholder="请选择岗位聘任条件"
        >
          <a-select-option
            v-for="item in performanceCriteriaId"
            :key="item.id"
            :value="item.id"
          >
            {{ item.teacherChooseName }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 13, offset: 0 }">
        <a-button
          type="primary"
          size="large"
          @click="onSubmit"
          style="float:right;"
        >
          报名
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-result v-if="is_ok" status="success" title="报名成功!">
      <template #extra>
        <a-button
          key="console"
          type="primary"
          @click="
            nextPage('/post/teacher-post-workload', {
              ...$route.query,
            })
          "
          size="large"
        >
          填报工作量
        </a-button>
      </template>
    </a-result>
  </a-card>
</template>

<script>
import XHR from "@/services/interface";
export default {
  name: "SingUp",
  i18n: require("./i18n"),
  data() {
    return {
      value: 1,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        performanceCriteriaId: undefined,
      },
      performanceCriteriaId: [],
      gw: ["校聘专业技术岗位"],
      xl: ["专任教师", "非专任教师"],
      dj: ["三级", "四级", "五级", "六级", "七级"],
      rules: {
        performanceCriteriaId: [
          { required: true, message: "请选择岗位聘任条件", trigger: "blur" },
        ],
      },
      is_ok: false,
    };
  },
  // components: { DetailList },
  computed: {
    desc() {
      return this.$t("pageDesc");
    },
  },
  mounted() {
    XHR.Axios_$$positionAppointment_apply_getRateInfo({
      positionAppointmentReviewId: this.$route.query
        .positionAppointmentReviewId,
    }).then(_ => {
      console.log(_.data.info);
      this.current = _.data.info.all - 1;
      this.info = _.data.info;
      this.loading = false;
      if (_.data.info.all <= 1) {
        this.getList();
        console.log(this.$route.query.rankReviewId);
      } else {
        this.is_ok = true;
      }
    });
  },
  methods: {
    getList() {
      XHR.Axios_$$positionAppointment_searchList({
        page: 0,
        line: 10000,
      }).then(_ => {
        console.log(_.data.info);
        this.performanceCriteriaId = _.data.info.list;
      });
    },
    nextPage(path, query) {
      this.$router.push({
        path,
        query: {
          ...query,
          performanceCriteriaId: this.form.performanceCriteriaId,
          ...this.info,
        },
      });
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          XHR.Axios_$$positionAppointment_apply({
            positionAppointmentReviewId: this.$route.query
              .positionAppointmentReviewId,
            positionAppointmentId: this.form.performanceCriteriaId,
          }).then(_ => {
            
            if (_.data.state === 1) {
              console.log(_.data.info);
              this.is_ok = true;
            }
            // if (
            //   _.data.message === "教师报名岗位聘任成功！" ||
            //   _.data.message === "不能重复报名"
            // ) {
            //   console.log(_.data.info);
            //   this.is_ok = true;
            // } else {
            //   this.$message.warn(_.data.message);
            // }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped></style>
