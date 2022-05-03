<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <!-- <img alt="logo" class="logo" src="@/assets/img/logo.png" /> -->
        <span class="title">{{ systemName }}</span>
      </div>
      <!-- <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div> -->
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
        <a-tabs
            size="large"
            :tabBarStyle="{ textAlign: 'center' }"
            style="padding: 0 2px;"
        >
          <a-tab-pane tab="账户密码登录" key="1">
            <a-alert
                type="error"
                :closable="true"
                v-show="error"
                :message="error"
                showIcon
                style="margin-bottom: 24px;"
            />
            <a-form-item>
              <a-select
                  autocomplete="autocomplete"
                  size="large"
                  placeholder="请选择用户类型"
                  v-decorator="[
                  'type',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请选择用户类型',
                        whitespace: true,
                      },
                    ],
                  },
                ]"
              >
                <a-select-option
                    v-for="item in select"
                    :value="item.type"
                    :key="item.type"
                >
                  {{ item.value }}
                </a-select-option>
                <a-icon slot="prefix" type="user"/>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-input
                  autocomplete="autocomplete"
                  size="large"
                  placeholder="admin"
                  v-decorator="[
                  'name',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入账户名',
                        whitespace: true,
                      },
                    ],
                  },
                ]"
              >
                <a-icon slot="prefix" type="user"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                  size="large"
                  placeholder="888888"
                  autocomplete="autocomplete"
                  type="password"
                  v-decorator="[
                  'password',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                        whitespace: true,
                      },
                    ],
                  },
                ]"
              >
                <a-icon slot="prefix" type="lock"/>
              </a-input>
              <!-- <a-form-item style="margin-top: 24px">
                <a-row :gutter="8" style="margin: 0 -4px">
                  <a-col :span="16">
                    <a-input size="large" placeholder="captcha">
                      <a-icon slot="prefix" type="mail" />
                    </a-input>
                  </a-col>
                  <a-col :span="8" style="padding-left: 4px">
                    <a-button
                      style="width: 100%"
                      class="captcha-button"
                      size="large"
                      >获取验证码</a-button
                    >
                  </a-col>
                </a-row>
              </a-form-item> -->
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane tab="手机号登录" key="2" v-if="false">
            <a-form-item>
              <a-input size="large" placeholder="mobile number">
                <a-icon slot="prefix" type="mobile"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-row :gutter="8" style="margin: 0 -4px">
                <a-col :span="16">
                  <a-input size="large" placeholder="captcha">
                    <a-icon slot="prefix" type="mail"/>
                  </a-input>
                </a-col>
                <a-col :span="8" style="padding-left: 4px">
                  <a-button
                      style="width: 100%"
                      class="captcha-button"
                      size="large"
                  >获取验证码
                  </a-button
                  >
                </a-col>
              </a-row>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <div>
          <a-checkbox :checked="true">自动登录</a-checkbox>
          <!-- <a style="float: right">忘记密码</a> -->
        </div>
        <a-form-item>
          <a-button
              :loading="logging"
              style="width: 100%;margin-top: 24px"
              size="large"
              htmlType="submit"
              type="primary"
          >登录
          </a-button
          >
        </a-form-item>
        <!-- <div>
          其他登录方式
          <a-icon class="icon" type="alipay-circle" />
          <a-icon class="icon" type="taobao-circle" />
          <a-icon class="icon" type="weibo-circle" />
          <router-link style="float: right" to="/dashboard/workplace" >注册账户</router-link>
        </div> -->
        <div>
          <ul>
            <!-- <li>管理员 账号: admin 密码: admin</li>
            <li>教师 账号: teacher 密码: teacher</li>
            <li>二级学院 账号: sadmin 密码: sadmin</li>
            <li>职能部门 账号: functionadmin 密码: functionadmin</li> -->
            <!-- <li>人事处 账号: hr 密码: 888888</li> -->
            <!-- <li>科技处 账号: science 密码: 888888</li>
            <li>创新学院 账号: innovate 密码: 888888</li> -->
            <li>教师登录账号密码均为教工号</li>
          </ul>
        </div>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";
// import { getRoutesConfig } from "@/services/user";
// import { Axios_$$login } from "@/services/interface";
import XHR from "@/services/interface";
import {setAuthorization} from "@/utils/request";
// import { loadRoutes } from "@/utils/routerUtil";
import {mapMutations} from "vuex";
// import rank from "@/router/rank";
// import getRoute from "@/router/async/getRoute";
import {notification} from "ant-design-vue";

export default {
  name: "Login",
  components: {CommonLayout},
  data() {
    return {
      logging: false,
      error: "",
      form: this.$form.createForm(this),
      select: [
        {
          type: "1",
          value: "管理员",
        },
        {
          type: "2",
          value: "教师",
        },
        {
          type: "3",
          value: "职能部门管理员",
        },
        {
          type: "4",
          value: "二级部门管理员",
        },
        {
          type: "5",
          value: "评审专家",
        },
      ],
      userType: {
        //管理员
        1: "admin",
        //教师
        2: "teacher",
        //职能部门
        3: "functions",
        //二级部门
        4: "sector",
        //专家
        5: "expert",
      },
    };
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName;
    },
  },
  methods: {
    ...mapMutations("account", ["setUser", "setPermissions", "setRoles"]),
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields(err => {
        if (!err) {
          this.logging = true;
          const name = this.form.getFieldValue("name");
          const password = this.form.getFieldValue("password");
          const type = this.form.getFieldValue("type");
          XHR.Axios_$$login({
            token: "",
            type,
            info: {
              name,
              password,
            },
          }).then(this.afterLogin);
        }
      });
    },
    afterLogin(res) {
      this.logging = false;
      const loginRes = res.data;
      const userType = this.userType[this.form.getFieldValue("type")];
      const userName = this.form.getFieldValue("name");
      if (loginRes.state === 1) {
        console.log(loginRes.info);
        if (window.localStorage.getItem("isChangePassword") === "0") {
          notification.warning({
            description: "初次登录请修改密码",
            message: "提示",
            duration: 5000,
          });
        }
        window.localStorage.setItem(
            "isChangePassword",
            loginRes.info.isChangePassword
        );
        if ("teacherInfo" in loginRes.info && "teacherName" in loginRes.info.teacherInfo) {
          window.localStorage.setItem(
              "teacherName",
              loginRes.info.teacherInfo.teacherName
          );
        } else {
          window.localStorage.setItem(
              "teacherName",
              userName
          );
        }
        // const { user, permissions, roles } = loginRes.data;
        // 设置用户信息
        this.setUser({
          id: loginRes.info.id,
          name: userName,
          type: userType,
          avatar:
              "https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png",
          address: "",
          position: "",
        });
        // 设置用户权限
        this.setPermissions([
          {id: userType, operation: ["add", "edit", "delete"]},
        ]);
        this.setRoles([{id: userType, operation: ["add", "edit", "delete"]}]);
        setAuthorization({
          token: loginRes.info.token,
          name: userName,
          id: loginRes.info.id,
          type: this.form.getFieldValue("type"),
          // expireAt: new Date(loginRes.data.expireAt),
        });
        // if (this.form.getFieldValue("type") === "2") {
        //   // console.log(this.form.getFieldValue("type"));
        //   this.$router.push({
        //     // path: "teacher-home",
        //     path: "/reviewPublic",
        //     query: {type: "head"},
        //   });
        // } else {
        //   this.$router.push({
        //     path: "/dashboard/workplace",
        //     query: {type: "side"},
        //   });
        // }
        this.$router.push({
          path: "/dashboard/workplace",
          query: {type: "side"},
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.common-layout {
  .top {
    text-align: center;

    .header {
      height: 44px;
      line-height: 44px;

      a {
        text-decoration: none;
      }

      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }

      .title {
        font-size: 33px;
        color: @title-color;
        font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
        sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }

    .desc {
      font-size: 14px;
      color: @text-color-second;
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }

  .login {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }

    .icon {
      font-size: 24px;
      color: @text-color-second;
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }
  }
}
</style>
