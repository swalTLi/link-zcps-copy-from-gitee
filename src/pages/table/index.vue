<template>
  <a-card>
    <div>
      <a-switch
        style="margin: 10px 3px"
        checked-children="编辑模式"
        un-checked-children="浏览模式"
        default-checked
        v-model="status"
        @change="onChange"
      />
    </div>
    <!-- 共性 -->
    <editTableGenerality
      :tableData="document.generality.tableData"
      :title="document.generality.title"
      :company="document.generality.company"
      :key="status"
      :status="status"
    />
    <!-- 一半性 -->
    <!-- <editTableCommonly
      :document="document.generality.tableData"
      v-if="0"
      :status="status"
    /> -->
    <a-button
      type="primary"
      size="large"
      v-show="status"
      style="margin: 10px 0px;float: right;"
      @click="save()"
    >
      保存
    </a-button>
    <a-button
      v-show="status"
      type="primary"
      size="large"
      style="margin: 10px 10px;float: right;"
      @click="cancel()"
    >
      取消
    </a-button>
  </a-card>
</template>

<script>
import editTableGenerality from '@/components/edit-table/editTableGenerality';
// import editTableCommonly from "@/components/edit-table/editTableCommonly";
import { document } from './tableData';
import Bus from './eventBus';
export default {
  name: 'EditTable',
  components: { editTableGenerality },
  data() {
    return {
      status: true,
      document,
    };
  },
  mounted() {},
  methods: {
    onChange(checked) {
      this.status = checked;
    },
    save() {
      this.status = false;
      Bus.$emit('save_Generality', true);
      console.log(this.document);
    },
    cancel() {
      this.status = false;
      Bus.$emit('save_Generality', false);
    },
  },
};
</script>
<style scoped>
a:hover {
  text-decoration: underline !important;
}
</style>
