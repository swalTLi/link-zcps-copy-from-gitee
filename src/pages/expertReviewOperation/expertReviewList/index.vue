<template>
  <a-card>
    <a-table :data-source="dataSource">
      <a-table-column key="name" title="评审名称" data-index="name"/>
      <a-table-column key="startTime" title="开始时间" data-index="startTime"/>
      <a-table-column key="endTime" title="结束时间" data-index="endTime"/>
      <a-table-column key="id" title="操作" data-index="id">
        <template slot-scope="id">
          <span>
            <a-button type="primary" @click="startOperate(id)">开始评审</a-button>
          </span>
        </template>
      </a-table-column>
    </a-table>
  </a-card>
</template>

<script>
import Index from "./index.js";

export default Index;
</script>

<style scoped>

</style>
