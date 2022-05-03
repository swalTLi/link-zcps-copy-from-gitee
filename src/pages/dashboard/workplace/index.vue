<template>
  <page-layout :avatar="currUser.avatar">
    <div slot="headerContent">
      <div class="title">
        {{ currUser.name }}
      </div>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
import {mapState} from "vuex";

export default {
  components: {PageLayout},
  data() {
    return {
      projects: [],
      loading: true,
      activities: [],
      teams: [],
      welcome: {
        timeFix: "",
        message: "",
      },
    };
  },
  computed: {
    ...mapState("account", {currUser: "user"}),
  },
  mounted: function () {

  },
  created() {

  },
};
</script>

<style lang="less">
</style>
