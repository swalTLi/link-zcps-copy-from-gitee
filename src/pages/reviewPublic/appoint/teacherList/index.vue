<template>
  <a-card :bordered="false">
    <div class="select">
    <span>
      请选择标签：
    </span>
      <a-select
          style="min-width: 350px"
          placeholder="请选择标签"
          @change="onChangeSelect"
      >
        <a-select-option v-for=" info in selectSource" :key="info.id" :value="info.id">
          {{ info.teacherChooseName }}
        </a-select-option>
      </a-select>
    </div>
    <a-table :data-source="tableSource" :pagination="false">
      <a-table-column align="center" key="index" title="序号" data-index="index" width="8em">
        <template slot-scope="index">
          {{ parseInt(index) + 1 }}
        </template>
      </a-table-column>
      <a-table-column align="center" key="teacherSid" title="工号" data-index="teacherSid"/>
      <a-table-column align="center" key="teacherName" title="姓名" data-index="teacherName"/>
      <a-table-column align="center" key="id" title="操作" data-index="id">
        <template slot-scope="id">
          <a-button type="primary" @click="showInputInfo(id)">
            查看
          </a-button>
        </template>
      </a-table-column>
    </a-table>
    <a-pagination
        style="margin-top: 8px;"
        @change="getTeacherList()"
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
import index from './index';

export default index
</script>

<style scoped lang="less">
@import "./index.css";
</style>
