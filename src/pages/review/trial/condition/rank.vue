<template>
  <a-card :bordered="false">
    <div style="font-size:30px;color: black;margin: 20px 0;">
      {{ $route.query.name }}
    </div>
    <a-list
      size="large"
      bordered
      :data-source="dataList"
      style="max-height:800px; overflow:auto;"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <div style="font-size: 20px;">
          {{ `${index + 1}.  ${item.name}` }}
        </div>
        <div>
          <a-button
            type="primary"
            @click="goto('/trial/rank-info', item, 'performanceCriteriaId')"
          >
            进入
          </a-button>
        </div>
      </a-list-item>
      <!-- <div slot="footer">
        Footer
      </div> -->
    </a-list>
  </a-card>
</template>

<script>
import svg_unlock from '@/assets/svg/unlock.svg';
import svg_lock from '@/assets/svg/lock.svg';
import XHR from '@/services/interface';
const SVG_LIST = {
  svg_unlock,
  svg_lock,
};
export default {
  name: 'Success',
  data() {
    return {
      dataList: [],
      zjpdList: [],
      gwppList: [],
      gwprList: [],
      ...SVG_LIST,
    };
  },
  activated() {
    this.getList();
  },
  mounted() {
    this.getList();
  },
  destroyed() {
    this.dataList.length = 0;
  },
  methods: {
    async getList() {
      console.log(this.$route.query.pageType);
      if (
        this.$route.query.pageType === '1' ||
        this.$route.query.pageType === 1
      ) {
        this.dataList.length = await 0;
        await XHR.Axios_$$searchPerformanceCriteriaList({
          page: 1,
          line: 100000,
        }).then(_ => {
          this.dataList = _.data.info.list;
        });
      }
    },
    async goto(path, query, key) {
      this.$router.push({
        path,
        query: { ...this.$route.query, ...query, [key]: query.id },
      });
    },
  },
};
</script>

<style scoped lang="less">
.result-success {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  // height: 300px;
  // background-color: green;
  padding-top: 30px;
  .line {
    width: 100%;
    background-color: white;
    align-items: center;
    font-size: 30px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .box {
    cursor: pointer;
    width: 30%;
    // background-color: red;
    left: 1057px;
    top: 146px;
    // height: 158px;
    line-height: 20px;
    border-radius: 3px;
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: center;
    // align-items: start;
    .welcome-link {
      margin-top: 20px;
      width: 100%;
      height: 150px;
      background-color: rgba(255, 255, 255, 100);
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.14);
      border: 1px solid rgba(233, 233, 233, 100);
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .box {
        width: 60%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
    }
    .d1 {
      width: 100%;
      span {
        left: 430px;
        top: 177px;
        width: 64px;
        height: 24px;
        color: rgba(16, 16, 16, 100);
        font-size: 16px;
        text-align: left;
        font-family: SourceHanSansSC-regular;
      }
    }
    .d2 {
      width: 100%;
      span {
        left: 799px;
        top: 213px;
        height: 22px;
        color: rgba(136, 137, 138, 100);
        font-size: 14px;
        text-align: center;
        font-family: SourceHanSansSC-regular;
      }
    }
  }
  .action:not(:first-child) {
    margin-left: 8px;
  }
  .project-name {
    font-size: 16px;
    color: @title-color;
    font-weight: 500;
    margin-bottom: 20px;
  }
}
a:hover {
  text-decoration: underline !important;
}
</style>
