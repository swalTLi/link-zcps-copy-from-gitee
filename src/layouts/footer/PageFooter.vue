<template>
  <div class="footer">
    <div class="links">
      <a
        target="_blank"
        :key="index"
        :href="item.link ? item.link : 'javascript: void(0)'"
        v-for="(item, index) in linkList"
      >
        <a-icon v-if="item.icon" :type="item.icon" />{{ item.name }}
      </a>
    </div>
    <div class="copyright">
      Copyright<a-icon type="copyright" />{{ copyright }}
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Cookie from "js-cookie";

export default {
  name: "PageFooter",
  props: ["copyright", "linkList"],
  created() {
    console.log(Cookie.get("type"));
    if (Cookie.get("type") === "2") {
      this.setLayout("head");
      this.setFixedSideBar(false);
    } else {
      this.setLayout("side");
    }
  },
  methods: {
    ...mapMutations("setting", [
      "setLayout",
      "setFixedSideBar",
    ]),
  },
};
</script>

<style lang="less" scoped>
.footer {
  padding: 48px 16px 24px;
  /*margin: 48px 0 24px;*/
  text-align: center;
  .copyright {
    color: @text-color-second;
    font-size: 14px;
    i {
      margin: 0 4px;
    }
  }
  .links {
    margin-bottom: 8px;
    a:not(:last-child) {
      margin-right: 40px;
    }
    a {
      color: @text-color-second;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }
  }
}
</style>
