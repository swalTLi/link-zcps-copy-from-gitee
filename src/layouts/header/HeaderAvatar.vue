<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" :src="user.avatar" />
      <!-- <span class="name">{{ user.name }}</span> -->
      <span class="name">{{ window.localStorage.getItem("teacherName") }}</span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <a-menu-item @click="open">
        <a-icon type="user" />
        <span>个人信息</span>
      </a-menu-item>
      <a-menu-item @click="changePassword">
        <a-icon type="setting" />
        <span>修改密码</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapGetters } from "vuex";
// import {logout} from '@/services/user'
// import { Axios_$$logout } from "@/services/interface";
// import { notification } from "ant-design-vue";
import XHR from "@/services/interface";
import Bus from "@/pages/table/eventBus";
// import Cookie from "js-cookie";
export default {
  name: "HeaderAvatar",
  data() {
    return { window: window };
  },
  computed: {
    ...mapGetters("account", ["user"]),
  },
  mounted() {
    // if (window.localStorage.getItem("isChangePassword") === "0") {
    //   notification.warning({
    //     description: "初次登录请修改密码",
    //     message: "提示",
    //     duration: 5000,
    //   });
    //   // console.log(window.localStorage.getItem("isChangePassword"));
    //   // window.localStorage.setItem("changePWD", true);
    //   // if (this.$route.fullPath === "/teacher-info") {
    //   //   Bus.$emit("changePWD", true);
    //   // } else {
    //   //   setTimeout(() => {
    //   //     this.$router.push("/teacher-info");
    //   //   });
    //   // }
    // }
  },
  methods: {
    async open() {
      this.$router.push("/teacher-info");
    },
    changePassword() {
      window.localStorage.setItem("changePWD", true);
      if (this.$route.fullPath === "/teacher-info") {
        Bus.$emit("changePWD", true);
      } else {
        setTimeout(() => {
          this.$router.push("/teacher-info");
        });
      }
    },
    logout() {
      XHR.Axios_$$logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less">
.header-avatar {
  display: inline-flex;
  .avatar,
  .name {
    align-self: center;
  }
  .avatar {
    margin-right: 8px;
  }
  .name {
    font-weight: 500;
  }
}
.avatar-menu {
  width: 150px;
}
</style>
