<template>
  <a-card :bordered="false">
    <div class="rankReview reviewList">
      <div class="title">
        <span>职级评定（专技岗）</span>
      </div>
      <div class="line"></div>
      <div class="reviewInfoNone" v-if="rankReviewList.length==0">
        <div class="name">
          <div class="line1">暂无评审</div>
          <div class="line2">校聘专业技术岗</div>
        </div>
      </div>
      <div v-else>
        <div class="reviewInfo"
             v-for="line in rankReviewList"
             :key="line.id"
             @click="selectRankReview(line.id)">
          <div class="name">
            <div class="line1">{{ line.name }}</div>
            <div class="line2">校聘专业技术岗</div>
          </div>
        </div>
      </div>
    </div>
    <div class="appointReview reviewList">
      <div class="title">
        <span>职级评聘（管理岗、机关非教师专技）</span>
      </div>
      <div class="line"></div>
      <div class="reviewInfoNone" v-if="appointReviewList.length==0">
        <div class="name">
          <div class="line1">暂无评审</div>
          <div class="line2">普通管理岗</div>
        </div>
      </div>
      <div v-else>
        <div class="reviewInfo"
             v-for="line in appointReviewList"
             :key="line.id"
             @click="selectAppointReview(line.id)">
          <div class="name">
            <div class="line1">{{ line.name }}</div>
            <div class="line2">校聘专业技术岗</div>
          </div>
        </div>
      </div>
    </div>
    <div class="positionAppointmentReview reviewList">
      <div class="title">
        <span>职级评聘（专技岗）</span>
      </div>
      <div class="line"></div>
      <div class="reviewInfoNone" v-if="positionAppointmentReviewList.length==0">
        <div class="name">
          <div class="line1">暂无评审</div>
          <div class="line2">普通管理岗</div>
        </div>
      </div>
      <div v-else>
        <div class="reviewInfo"
             v-for="line in positionAppointmentReviewList"
             :key="line.id"
             @click="selectPositionAppointmentReview(line.id)">
          <div class="name">
            <div class="line1">{{ line.name }}</div>
            <div class="line2">校聘专业技术岗</div>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
import index from './index';

export default index
</script>

<style scoped lang="less">
@import "./index.css";
</style>
