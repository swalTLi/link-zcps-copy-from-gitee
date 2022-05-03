<template>
  <a-card :bordered="false">
    <div class="result-success" :bordered="false">
      <div class="line">
        <span>职级评定（专技岗）</span>
        <span>职级评聘（管理岗、机关非教师专技）</span>
        <span>职级评聘（专技岗）</span>
      </div>
      <a-divider />
      <div class="box">
        <div
          class="welcome-link"
          @click="goto('/trial/rank-condition', item, 'rankReviewId', 1)"
          v-for="item in zjpdList"
          :key="item.id"
          v-if="item.open === 1"
        >
          <div class="box">
            <div class="d1">
              <span>{{ item.name }}</span>
            </div>
            <div class="d2"><span>校聘专业技术岗</span></div>
          </div>
          <a-icon
            style="font-size:50px;"
            :component="svg_unlock"
            v-if="item.open === 1"
          />
          <a-icon
            style="font-size:50px;"
            :component="svg_lock"
            v-if="!item.open"
          />
        </div>
        <div v-if="zjpdList === undefined" style="margin-top: 210px;">
          <img
            width="200px"
            src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg"
            alt=""
          />
          <div style="width:100%;color:grey;margin-top:20px;font-size:30px;">
            暂无评审
          </div>
        </div>
      </div>
      <div class="box">
        <div
          class="welcome-link"
          @click="goto('/trial/employ-condition', item, 'appointReviewId', 2)"
          v-for="item in gwppList"
          :key="item.id"
          v-if="item.open"
        >
          <div class="box">
            <div class="d1">
              <span>{{ item.name }}</span>
            </div>
            <div class="d2"><span>普通管理岗</span></div>
          </div>
          <a-icon
            style="font-size:50px;"
            :component="svg_unlock"
            v-if="item.open"
          />
          <a-icon
            style="font-size:50px;"
            :component="svg_lock"
            v-if="!item.open"
          />
        </div>
        <div v-if="gwppList === undefined">
          <img
            width="200px"
            src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg"
            alt=""
          />
          <div style="width:100%;color:grey;margin-top:20px;font-size:30px;">
            暂无评审
          </div>
        </div>
      </div>
      <div class="box">
        <div
          class="welcome-link"
          @click="
            goto(
              '/trial/post-condition',
              item,
              'positionAppointmentReviewId',
              3
            )
          "
          v-for="item in gwprList"
          :key="item.id"
          v-if="item.open"
        >
          <div class="box">
            <div class="d1">
              <span>{{ item.name }}</span>
            </div>
            <div class="d2"><span>校聘专业技术岗</span></div>
          </div>

          <a-icon
            style="font-size:50px;"
            :component="svg_unlock"
            v-if="item.open"
          />
          <a-icon
            style="font-size:50px;"
            :component="svg_lock"
            v-if="!item.open"
          />
        </div>
        <div v-if="gwprList === undefined">
          <img
            width="200px"
            src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg"
            alt=""
          />
          <div style="width:100%;color:grey;margin-top:20px;font-size:30px;">
            暂无评审
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
import svg_unlock from '@/assets/svg/unlock.svg';
import svg_lock from '@/assets/svg/lock.svg';
import XHR from '@/services/interface';
import Cookie from 'js-cookie';

const SVG_LIST = {
  svg_unlock,
  svg_lock,
};
export default {
  name: 'Success',
  data() {
    return {
      zjpdList: [],
      gwppList: [],
      gwprList: [],
      Cookie,
      ...SVG_LIST,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      XHR.Axios_$$rankReview_getRankReviewList().then(_ => {
        this.zjpdList = _.data.info.list;
        console.log(this.zjpdList);
      });
      XHR.Axios_$$appointReview_getList().then(_ => {
        this.gwppList = _.data.info.list;
        console.log(this.gwppList);
      });
      XHR.Axios_$$positionAppointmentReview_getPositionAppointmentReviewList().then(
        _ => {
          this.gwprList = _.data.info.list;
        }
      );
    },
    async goto(path, query, key, pageType) {

        if (!query.open) {
          this.$message.info(query.name + '已关闭！');
        } else {
          if (pageType === 2) {
            if (Cookie.get('type') === '3') {
              return this.$message.warning('无权限');
            }
          }
          this.$router.push({
            path,
            query: { ...query, [key]: query.id, pageType },
          });
        }
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
