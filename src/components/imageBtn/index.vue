<template>
  <div @click="handleClick" id="svg-btn">
    <span style="display: flex; justify-content: space-between; align-items: center">
      <a-icon :component="src" :style="{ fontSize: fontSize ? fontSize : `20px` }" />
      <span>{{ text }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "IInput",
  model: {
    prop: "value",
    event: "change.value",
  },
  props: ["src", "text", "fontSize"],
  data() {
    return {};
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>
<style lang="less" scoped>
#svg-btn {
  cursor: pointer;
  border: 1px solid rgb(217 217 217);
  padding: 3.5px 15px;
  border-radius: 3.5px;
  transition: 0.5;
}
#svg-btn:hover {
  border: 1px solid #1890ff;
}
</style>
