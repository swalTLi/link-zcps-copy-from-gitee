<template>
  <a-card>
    <div class="select">
    <span>
      请选择标签：
    </span>
      <a-select
          style="min-width: 350px"
          placeholder="请选择标签"
          @change="onSelectChange"
          v-model="selectSourcedefault"
      >
        <a-select-option v-for=" (info,index) in selectSource" :key="info.labelId" :value="index">
          {{ info.labelName }}
        </a-select-option>
      </a-select>
    </div>
    <a-table :data-source="teacherDataSource" :pagination="false">
      <a-table-column key="index" title="序号" data-index="index">
        <template slot-scope="index">
          {{ parseInt(index) + 1 }}
        </template>
      </a-table-column>
      <a-table-column key="teacherSid" title="工号" data-index="teacherSid" align="center"/>
      <a-table-column key="teacherName" title="姓名" data-index="teacherName" align="center"/>
      <a-table-column key="secondarySectorName" title="学院" data-index="secondarySectorName" align="center"/>
      <a-table-column key="birthday" title="出生年月" data-index="birthday" align="center">
        <template slot-scope="teacherday">
        <span>
           {{ getTeacherDay(teacherday) }}
        </span>
        </template>
    </a-table-column>
      <a-table-column key="rankName" title="现职级" data-index="rankName" align="center"/>
      <a-table-column key="postTime" title="现职级聘任时间" data-index="postTime" align="center">
      <template slot-scope="teacherday">
        <span>
           {{ getTeacherDay(teacherday) }}
        </span>
      </template>
      </a-table-column>
      <a-table-column key="comeSchoolTime" title="来校时间" data-index="comeSchoolTime" align="center">
        <template slot-scope="teacherday">
        <span>
           {{ getTeacherDay(teacherday) }}
        </span>
        </template>
      </a-table-column>
<!--      <a-table-column key="educationName" title="学历" data-index="educationName"/>-->
<!--      <a-table-column key="graduationSchool" title="毕业院校" data-index="graduationSchool"/>-->
<!--      <a-table-column key="graduationProfessional" title="毕业专业" data-index="graduationProfessional"/>-->
      <a-table-column key="performanceCriteriaTeacherChooseName" title="申请职级"
                      data-index="performanceCriteriaTeacherChooseName" align="center"/>
      <a-table-column v-if="selectLabelInfo.reviewType==1"
                      key="relationId" title="投票" data-index="relationId"  align="center">
        <template slot-scope="relationId, record">
          <div v-if="(record.agree != null && record.agree>0)
          ||  (record.disagree != null && record.disagree>0)
          ||  (record.abstention != null && record.abstention>0)">
            <div v-if="record.agree != null && record.agree>0">
              同意票
            </div>
            <div v-if="record.disagree != null && record.disagree>0">
              反对票
            </div>
            <div v-if="record.abstention != null && record.abstention>0">
              弃权票
            </div>
          </div>
          <div v-else>
            未投票
          </div>
        </template>
      </a-table-column>
      <a-table-column v-if="selectLabelInfo.reviewType==2" key="score" title="评分" data-index="score"/>
      <a-table-column key="relationId" title="操作" data-index="relationId">
        <template slot-scope="relationId">
          <div class="button">
            <a-button @click="showInputInfo(relationId)">查看</a-button>
          </div>
          <div class="button" v-if="selectLabelInfo.reviewType==1">
            <a-button type="primary" @click="submitVote(relationId,1,0,0)">同意</a-button>
          </div>
          <div class="button" v-if="selectLabelInfo.reviewType==1">
            <a-button type="danger" @click="submitVote(relationId,0,1,0)">反对</a-button>
          </div>
          <div class="button" v-if="selectLabelInfo.reviewType==1">
            <a-button @click="submitVote(relationId,0,0,1)"
                      style="background-color: #888888;
                      color: white"
            >弃权
            </a-button>
          </div>
          <div class="button" v-if="selectLabelInfo.reviewType==2">
            <a-button type="primary" @click="showScoreModel(relationId)">评分</a-button>
          </div>
        </template>
      </a-table-column>
    </a-table>
    <a-modal v-model="scoreModel.show" title="评分" @ok="submitScoreModel">
      <a-input size="large" type="number" placeholder="请输入评分" v-model="scoreModel.score"/>
    </a-modal>
  </a-card>
</template>

<script>
import Index from "./index.js";

export default Index;
</script>

<style scoped>
.select {
  margin-bottom: 10px;
}

.button {
  margin-bottom: 3px;
}
</style>
