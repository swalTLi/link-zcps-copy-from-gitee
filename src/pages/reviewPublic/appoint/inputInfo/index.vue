<template>
  <a-card>
    <!--    <div>-->
    <!--      <div class="title">-->
    <!--        申请岗位：-->
    <!--        <span>{{ this.ruleTeacherChooseName }}</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div>-->
    <!--      <div class="title">-->
    <!--        教师信息：-->
    <!--      </div>-->
    <!--      <table>-->
    <!--        <tr>-->
    <!--          <td class="head">姓名：</td>-->
    <!--          <td class="info">{{ teacherInfo.teacherName }}</td>-->
    <!--          <td class="head">工号：</td>-->
    <!--          <td class="info">{{ teacherSid }}</td>-->
    <!--          <td class="head">学院：</td>-->
    <!--          <td class="info">{{ teacherInfo.secondarySectorName }}</td>-->
    <!--          <td class="head">生日：</td>-->
    <!--          <td class="info">{{ teacherInfo.birthday }}</td>-->
    <!--          <td class="head">来校时间：</td>-->
    <!--          <td class="info">{{ teacherInfo.comeSchoolTime }}</td>-->
    <!--        </tr>-->
    <!--        <tr>-->
    <!--          <td class="head">毕业学校：</td>-->
    <!--          <td class="info">{{ teacherInfo.graduationSchool }}</td>-->
    <!--          <td class="head">毕业专业：</td>-->
    <!--          <td class="info">{{ teacherInfo.graduationProfessional }}</td>-->
    <!--          <td class="head">毕业时间：</td>-->
    <!--          <td class="info">{{ teacherInfo.graduationTime }}</td>-->
    <!--          <td class="head">学历：</td>-->
    <!--          <td class="info">{{ teacherInfo.educationName }}</td>-->
    <!--          <td></td>-->
    <!--          <td></td>-->
    <!--        </tr>-->
    <!--        <tr>-->
    <!--          <td class="head">现岗位：</td>-->
    <!--          <td class="info">{{ teacherInfo.postSeriesName }}</td>-->
    <!--          <td class="head">岗位等级：</td>-->
    <!--          <td class="info">{{ teacherInfo.postGradeName }}</td>-->
    <!--          <td class="head">聘任时间：</td>-->
    <!--          <td class="info">{{ teacherInfo.postTime }}</td>-->
    <!--          <td></td>-->
    <!--          <td></td>-->
    <!--          <td></td>-->
    <!--          <td></td>-->
    <!--        </tr>-->
    <!--      </table>-->
    <!--    </div>-->
    <div>
      <div class="title">
        业绩描述：
      </div>
      <a-table :data-source="dataSource">
        <a-table-column key="description" title="描述" data-index="description"/>
        <a-table-column key="file" title="附件" data-index="file">
          <template slot-scope="file">
            <span v-if="file == null">附件：未上传文件</span>
            <a v-else
               :href="file.filePath"
               target="_blank">附件：{{ file.fileName }}</a>
          </template>
        </a-table-column>
        <a-table-column width="100px" key="secondarySectorExamineType" title="审核状态"
                        data-index="secondarySectorExamineType">
          <template slot-scope="type">
            <div v-bind:class="[
                   type==1?'examineNote1':'',
                   type==2?'examineNote2':'',
            ]">
            <span v-if="type == 0">
              未审核
            </span>
              <span v-else-if="type == 1">
              审核通过
            </span>
              <span v-else-if="type == 2">
              审核退回
            </span>
              <span v-else>
              审核状态:type={{ type }}
            </span>
            </div>
          </template>
        </a-table-column>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import Index from "./index.js";

export default Index;
</script>

<style scoped>
.title {
  font-weight: bolder;
  font-size: large;
  margin-top: 5px;
  margin-bottom: 5px;
}

td {
  padding-top: 5px;
  padding-bottom: 5px;
}

td.head {
  font-weight: bold;
  text-align: right;
}

td.info {
  padding-right: 20px;
}


.examineNote1 span {
  color: #60bd90;
}

.examineNote2 span {
  color: #f43095;
}

</style>
