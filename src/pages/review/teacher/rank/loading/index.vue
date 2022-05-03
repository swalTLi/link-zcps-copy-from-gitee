<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-page-header title="总体进度" />
    <a-spin
      size="large"
      v-if="loading"
      style=" margin:auto;margin-top: 100px;  width: 100%;"
    />
    <div style="margin:50px 15%;" v-if="!loading">
      <a-steps :current="current" class="asteps">
        <a-step title="报名" @click="nextPage('/rank/teacher-rank-signup', 0)">
          <span slot="description" v-if="current === 0"
            ><a @click="nextPage('/rank/teacher-rank-signup', 0)">点击报名</a>
          </span></a-step
        >
        <a-step
          title="填报工作量条件"
          @click="nextPage('/rank/teacher-rank-workload', 1)"
        >
          <span slot="description" v-if="current === 1"
            ><a @click="nextPage('/rank/teacher-rank-workload', 1)">点击填报</a>
          </span>
          <span slot="description" v-else-if="current <= 4 && current > 1"
            ><a @click="nextPage('/rank/teacher-rank-workload', 1)">查看</a>
          </span>
        </a-step>
        <a-step
          title="填报业绩条件"
          @click="nextPage('/rank/teacher-rank-condition', 2)"
        >
          <span slot="description" v-if="current === 2"
            ><a @click="nextPage('/rank/teacher-rank-condition', 2)"
              >点击填报</a
            >
          </span>
          <span slot="description" v-else-if="current <= 4 && current > 2"
            ><a @click="nextPage('/rank/teacher-rank-condition', 1)">查看</a>
          </span>
        </a-step>
        <a-step title="审核" />
        <a-step title="审核结束" />
      </a-steps>
    </div>
    <a-page-header title="工作量进度" style="margin-top: 100px;" />
    <div style="margin:50px 15%;">
      <a-steps :current="current" @change="onChange">
        <a-step status="process" title="填报" />
        <a-step title="等待审核" />
        <a-step title="审核结束" />
      </a-steps>
    </div>
    <a-page-header title="业绩条件进度" style="margin-top: 100px;" />
    <div style="margin:50px 15%;">
      <a-steps :current="current" @change="onChange">
        <a-step status="process" title="填报" />
        <a-step title="等待审核" />
        <a-step title="审核结束" />
      </a-steps>
    </div>
  </a-card>
</template>

<script>
import XHR from "@/services/interface";
export default {
  name: "Loading",
  i18n: require("./i18n"),
  data() {
    return {
      current: 0,
      loading: true,
      info: {},
    };
  },
  computed: {
    desc() {
      return this.$t("pageDesc");
    },
  },
  activated() {
    console.log("query:", this.$route.query);
    this.getList();
  },
  mounted() {
    console.log("query:", this.$route.query);
    this.getList();
  },
  methods: {
    async getList() {
      await XHR.Axios_$$getTeacherApplyRateInfo({
        rankReviewId: this.$route.query.rankReviewId,
      }).then(_ => {
        console.log(_.data.info);
        this.current = _.data.info.all - 1;
        this.info = _.data.info;
        this.loading = false;
      });
    },
    nextPage(path) {
      console.log({ ...this.$route.query, ...this.info });
      // if (current === this.current) {
      this.$router.push({
        path,
        query: { ...this.$route.query, ...this.info },
      });
      // }
    },
    onChange(current) {
      console.log("onChange:", current);
      this.current = current;
    },
  },
};
</script>

<style scoped lang="less">
.asteps {
  .a-step {
    cursor: pointer;
  }
}
</style>
