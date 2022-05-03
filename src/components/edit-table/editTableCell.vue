<template>
  <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-textarea
        :value="value"
        @change="handleChange"
        @pressEnter="check"
        :auto-size="{ minRows: 3, maxRows: 20 }"
      />
      <!-- <a-icon type="check" class="editable-cell-icon-check" @click="check" />
      <a-icon
        type="close"
        class="editable-cell-icon-check"
        style="margin-top:40px;"
        @click="close"
      /> -->
    </div>
    <div v-else class="editable-cell-text-wrapper">
      {{ value || " " }}
      <a-icon type="edit" class="editable-cell-icon" @click="edit" />
    </div>
  </div>
</template>
<script>
import Bus from "@/pages/table/eventBus";
export default {
  props: {
    text: String,
  },
  data() {
    return {
      value: this.text,
      editable: true,
    };
  },
  mounted() {
    Bus.$on("save_Generality", e => {
      console.log(e);
      if (e) {
        this.check();
      } else {
        this.close();
      }
    });
  },
  methods: {
    handleChange(e) {
      const value = e.target.value;
      this.value = value;
    },
    check() {
      this.editable = false;
      this.$emit("change", this.value);
    },
    edit() {
      this.editable = true;
    },
    close() {
      this.value = this.text;
      this.editable = false;
    },
  },
};
</script>

<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
