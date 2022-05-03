<template>
  <a-card :bordered="false">
    <div style="font-size:30px;color: black;margin: 20px 0;">
      {{ $route.query.name }}
    </div>
    <a-space class="operator" align="baseline">
      <label style="font-size: 16px;font-weight: bold;">二级部门审核状态：</label>
      <a-select style="width: 120px" v-model="secondarySectorExamineType">
        <a-select-option :value="-1">
          全部
        </a-select-option>
        <a-select-option :value="0">
          未审核
        </a-select-option>
        <a-select-option :value="1">
          通过
        </a-select-option>
        <a-select-option :value="2">
          退回
        </a-select-option>
      </a-select>
      <label style="margin-left: 20px;font-size: 16px;font-weight: bold;">职能部门审核状态：</label>
      <a-select style="width: 120px" v-model="functionExamineType">
        <a-select-option :value="-1">
          全部
        </a-select-option>
        <a-select-option :value="0">
          未审核
        </a-select-option>
        <a-select-option :value="1">
          通过
        </a-select-option>
        <a-select-option :value="2">
          退回
        </a-select-option>
      </a-select>
      <label style="margin-left: 20px;font-size: 16px;font-weight: bold;">教师姓名：</label>
      <a-input v-model="keyWord" @change="getList()"
               allow-clear
               placeholder="请输入教师姓名"/>
    </a-space>
    <table class="tableData" style="margin-top: 20px;width: 100%">
      <tr>
        <th nowrap="nowrap">编号</th>
        <th nowrap="nowrap">教师姓名</th>
        <th nowrap="nowrap">教师工号</th>
        <th nowrap="nowrap">职级</th>
        <th nowrap="nowrap">职级获得时间</th>
        <th nowrap="nowrap">序号</th>
        <th nowrap="nowrap">具体要求</th>
        <th nowrap="nowrap">详细</th>
        <th nowrap="nowrap">职能审核状态</th>
        <th nowrap="nowrap">二级审核状态</th>
        <th nowrap="nowrap">操作</th>
      </tr>
      <tr v-for="data in tableData" :key="data.teacherInputId">
        <td :rowspan="data.rowspan" v-if="data.rowspan>0">{{ parseInt(data.index) + 1 }}</td>
        <td :rowspan="data.rowspan" v-if="data.rowspan>0">{{ data.teacherName }}</td>
        <td :rowspan="data.rowspan" v-if="data.rowspan>0">{{ data.teacherSid }}</td>
        <td :rowspan="data.rowspan" v-if="data.rowspan>0">{{ data.teacherTitle }}</td>
        <td :rowspan="data.rowspan" v-if="data.rowspan>0">{{ data.teacherTitleTime }}</td>
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
        <td nowrap="nowrap" class="operation">
          <div class="button">
            <a-popconfirm
                title="是否确认通过?"
                ok-text="是"
                cancel-text="否"
                @confirm="setExamineType(data.description,1)">
              <a-button type="primary">通过</a-button>
            </a-popconfirm>
          </div>
          <div class="button">
            <a-button type="danger" @click="showExamineNote(data.description,2)">退回</a-button>
          </div>
        </td>
      </tr>
      <a-modal
          v-model="examineNote.show"
          ok-text="确认"
          cancel-text="取消"
          @ok="setExamineTypeFromExamineNote"
      >
        <template slot="title">
          <span style="font-size: 1em;">
            审核详情
          </span>
        </template>

        <a-textarea
            style="width: 100%;height:300px;font-size: 2em;"
            v-model="examineNote.note"
            placeholder="请填写审核原因"
        />
      </a-modal>
    </table>

    <a-pagination
        style="margin-top: 8px;"
        @change="getList()"
        v-model="pagination.page"
        :total="pagination.lineCount"
        :page-size="pagination.pageSize"
        show-size-changer
        :page-size-options="pagination.pageSizeOptions"
        @showSizeChange="onShowSizeChange"
    >
    </a-pagination>
  </a-card>
</template>

<script>
import Index from "./index.js";

export default Index;
</script>

<style scoped>
@import "./index.css";
</style>
