<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-page-header title="总体进度" />
    <div style="margin:50px 15%;">
      <a-steps :current="current" @change="onChange" class="asteps">
        <a-step
          status="process"
          title="报名"
          @click="nextPage('/post/teacher-post-signup')"
        >
          <span slot="description" v-if="current === 0"
            ><a @click="nextPage('/post/teacher-post-signup', 0)">点击报名</a>
          </span>
        </a-step>
        <a-step
          status="wait"
          title="填报工作量条件"
          @click="nextPage('/post/teacher-post-workload')"
        />
        <a-step
          status="wait"
          title="填报业绩条件"
          @click="nextPage('/post/teacher-post-condition')"
        />
        <a-step status="wait" title="审核" />
        <a-step status="wait" title="审核结束" />
      </a-steps>
    </div>
    <a-page-header title="工作条件进度" style="margin-top: 100px;" />
    <div style="margin:50px 15%;">
      <a-steps :current="current" @change="onChange">
        <a-step status="process" title="填报" />
        <a-step status="wait" title="等待审核" />
        <a-step status="wait" title="审核技术" />
      </a-steps>
    </div>
    <a-page-header title="业绩条件进度" style="margin-top: 100px;" />
    <div style="margin:50px 15%;">
      <a-steps :current="current" @change="onChange">
        <a-step status="process" title="填报" />
        <a-step status="wait" title="等待审核" />
        <a-step status="wait" title="审核技术" />
      </a-steps>
    </div>
  </a-card>
</template>

<script>
export default {
  name: "Loading",
  i18n: require("./i18n"),
  data() {
    return {
      current: -1,
    };
  },
  computed: {
    desc() {
      return this.$t("pageDesc");
    },
  },
  mounted() {
    console.log("query:", this.$route.query);
    this.getList();
  },
  methods: {
    async getList() {},
    nextPage(path) {
      this.$router.push({ path });
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
