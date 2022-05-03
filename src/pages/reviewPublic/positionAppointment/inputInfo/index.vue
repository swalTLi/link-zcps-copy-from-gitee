<template>
  <a-card>
    <!--    <div>-->
    <!--      <div class="title">-->
    <!--        申请岗位：-->
    <!--        <span>{{ this.positionAppointmentTeacherChooseName }}</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="teacherInfo">-->
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
    <div class="inputInfo">
      <div class="title">
        业绩描述：
      </div>
      <table class="tableData" style="margin-top: 20px;width: 100%">
        <tr>
          <th nowrap="nowrap">序号</th>
          <th nowrap="nowrap">具体要求</th>
          <th nowrap="nowrap">详细</th>
          <th nowrap="nowrap">职能审核状态</th>
          <th nowrap="nowrap">二级审核状态</th>
        </tr>
        <tr v-for="data in tableData" :key="data.teacherInputId">
          <td :rowspan="data.rowspan" v-if="data.rowspan>0">{{ data.serialNumberName }}</td>
          <td :rowspan="data.rowspan" v-if="data.rowspan>0">{{ data.line }}</td>
          <td>
            <table style="width: 100%" class="description">
              <tr
                  v-if="data.description.type === 'description'"
              >
                <td style="width: 50%">{{ data.description.description }}</td>
                <td style="width: 50%"
                    v-if="data.description.file == null"
                >附件：未上传文件
                </td>
                <td style="width: 50%"
                    v-else
                ><a :href="data.description.file.filePath" target="_blank">附件：{{ data.description.file.fileName }}</a>
                </td>
              </tr>
              <tr v-if="data.description.type == 'choose'">
                <td style="width: 20%">{{ data.description.name }}</td>
                <td style="width: 20%">{{ data.description.level }}</td>
                <td style="width: 20%">{{ data.description.source }}</td>
                <td style="width: 20%">{{ data.description.money }}</td>
                <td style="width: 20%">{{ data.description.time }}</td>
              </tr>
            </table>
          </td>
          <td v-bind:class="[
           data.description.functionExamineType==1?'examineNote1':'',
           data.description.functionExamineType==2?'examineNote2':'',
        ]">
            <span>{{ data.description.functionExamineNote }}</span>
          </td>
          <td v-bind:class="[
           data.description.secondarySectorExamineType==1?'examineNote1':'',
           data.description.secondarySectorExamineType==2?'examineNote2':'',
        ]">
            <span>{{ data.description.secondarySectorExamineNote }}</span>
          </td>
        </tr>
      </table>
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

.teacherInfo td {
  padding-top: 5px;
  padding-bottom: 5px;
}

.teacherInfo td.head {
  font-weight: bold;
  text-align: right;
}

.teacherInfo td.info {
  padding-right: 20px;
}

.inputInfo .tableData {
  border-top: 1px solid #f0f0f0;
  border-left: 1px solid #f0f0f0;
  border-collapse: collapse; /*设置单元格的边框合并为1*/
}

.inputInfo .tableData > tr > td, .tableData > tr > th {
  text-align: center;
  color: #000000;
  border-bottom: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
  padding-left: 5px;
  padding-right: 5px;
}


.inputInfo .description td {
  text-align: center;
  border-top: 1px solid #f0f0f0;
  border-left: 1px solid #f0f0f0;
}

.inputInfo .description:first-child td {
  border-top: 0;
}

.inputInfo .description td:first-child {
  border-left: 0;
}

.examineNote1 span {
  color: #60bd90;
}

.examineNote2 span {
  color: #f43095;
}

</style>
