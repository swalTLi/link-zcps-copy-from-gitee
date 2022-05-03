<template>
  <div>
    <a-card :bordered="false">
      <detail-list title="个人信息" class="title">
        <detail-list-item term="登录名">{{ info.name }}</detail-list-item>
        <!-- <detail-list-item term="密码">{{info.password}}</detail-list-item> -->
        <!--        <detail-list-item term="密码">{{ '********'}}</detail-list-item>-->
        <detail-list-item term="教师姓名" v-if='userType==2'>{{
            info.teacherName
          }}
        </detail-list-item>
        <!-- <detail-list-item term="岗位id（教师）">{{info.jobId}}</detail-list-item> -->
        <detail-list-item term="岗位" v-if='userType==2'>{{ info.jobName }}</detail-list-item>
        <!-- <detail-list-item term="岗位系列id（教师）">{{info.postSeriesId}}</detail-list-item> -->
        <detail-list-item term="岗位系列" v-if='userType==2'>{{
            info.postSeriesName
          }}
        </detail-list-item>
        <!-- <detail-list-item term="岗位等级id（教师）">{{info.postGradeId}}</detail-list-item> -->
        <detail-list-item term="岗位等级" v-if='userType==2'>{{
            info.postGradeName
          }}
        </detail-list-item>
        <!-- <detail-list-item term="岗位类型id（教师）">{{info.postTypeId}}</detail-list-item> -->
        <!-- <detail-list-item term="岗位类型（教师）">{{info.postTypeName}}</detail-list-item> -->
        <detail-list-item term="岗位聘用时间" v-if='userType==2'>{{
            getLocalTime(info.postTime)
          }}
        </detail-list-item>
        <!-- <detail-list-item term="学历信息id（教师）">{{info.educationId}}</detail-list-item> -->
        <detail-list-item term="学历信息" v-if='userType==2'>{{
            info.educationName
          }}
        </detail-list-item>
        <!-- <detail-list-item term="职称信息id（教师）">{{info.titleId}}</detail-list-item> -->
        <detail-list-item term="职称信息" v-if='userType==2'>{{
            info.titleName
          }}
        </detail-list-item>
        <!-- <detail-list-item term="职称获取时间信息（教师）">{{info.titleTime}}</detail-list-item> -->
        <!-- <detail-list-item term="二级部门编号（教师或二级部门管理员）">{{info.secondarySectorId}}</detail-list-item> -->
        <detail-list-item term="二级部门名称" v-if='userType==2'>{{
            info.secondarySectorName
          }}
        </detail-list-item>
        <!-- <detail-list-item term="职能部门信息id（职能部门管理员）">{{info.functionId}}</detail-list-item> -->
        <!-- <detail-list-item term="职能部门编号（职能部门管理员）">{{info.functionNumber}}</detail-list-item> -->
        <!-- <detail-list-item term="职能部门名称（职能部门管理员）">{{info.functionName}}</detail-list-item> -->
      </detail-list>
      <a-button type="primary" @click="changepwd">密码修改</a-button>
    </a-card>
    <a-modal
        style="z-index: 9999;"
        v-model="change_pwd_visible"
        title="修改密码"
        ok-text="确认"
        cancel-text="取消"
        @ok="changePassword"
        @cancel="close"
    >
      <label>账号：</label>
      <a-input disabled v-model="formData.account"/>
      <label>旧密码：</label>
      <a-input v-model="formData.oldPassword" placeholder="请填写旧密码"/>
      <label>新密码：</label>
      <a-input v-model="formData.newPassword" placeholder="请填写新密码"/>
    </a-modal>
  </div>
</template>

<script>
import DetailList from '@/components/tool/DetailList';
import XHR from '@/services/interface';
import Cookie from 'js-cookie';

const DetailListItem = DetailList.Item;
import {notification} from 'ant-design-vue';
import Bus from '@/pages/table/eventBus';

export default {
  name: 'BasicDetail',
  components: {DetailListItem, DetailList},
  data() {
    return {
      info: {},
      Cookie,
      change_pwd_visible: false,
      formData: {
        account: undefined,
        oldPassword: undefined,
        newPassword: undefined,
      },
    };
  },
  async mounted() {
    this.formData.account = Cookie.get('name');
    if (window.localStorage.getItem('changePWD') === 'true') {
      this.formData.account = Cookie.get('name');
      this.change_pwd_visible = true;
      console.log(window.localStorage.getItem('changePWD'));
    }
    await XHR.Axios_$$getInfo({
      id: Cookie.get('id'),
      type: 2,
    }).then(_ => {
      this.info = _.data.info;
    });
    Bus.$on('changePWD', e => {
      if (e === true) {
        console.log(e);
        this.change_pwd_visible = true;
      }
    });
  },
  async activated() {
    this.formData.account = Cookie.get('name');
    if (window.localStorage.getItem('changePWD') === 'true') {
      this.change_pwd_visible = true;
      console.log(window.localStorage.getItem('changePWD'));
    }
    await XHR.Axios_$$getInfo({
      id: Cookie.get('id'),
      type: 2,
    }).then(_ => {
      this.info = _.data.info;
    });
    if (Cookie.get('type') == 2) {
      await XHR.Axios_$$getInfo({
        id: Cookie.get("id"),
        type: Cookie.get('type'),
      }).then(_ => {
        this.info = _.data.info;
      });
    } else {
      this.info.name = Cookie.get('name');
    }

    Bus.$on('changePWD', e => {
      if (e === true) {
        console.log(e);
        this.change_pwd_visible = true;
      }
    });
  },
  methods: {
    // 时间戳转日期
    getLocalTime(nS) {
      if (nS) {
        return new Date(parseInt(nS) * 1000)
            .toLocaleString()
            .replace(/:\d{1,2}$/, ' ')
            .split(' ')[0];
      } else {
        return '无数据';
      }
    },
    close() {
      this.change_pwd_visible = false;
      window.localStorage.setItem('changePWD', false);
    },
    changepwd() {
      this.change_pwd_visible = true;
      window.localStorage.setItem('changePWD', true);
    },
    ruleTriel() {
      var val = true;
      if (!this.formData.oldPassword) {
        this.$message.error({content: '请输入旧密码'});
        val = false;
      }
      if (!this.formData.newPassword) {
        this.$message.error({content: '请输入新密码'});
        val = false;
      }
      return val;
    },
    changePassword() {
      if (!this.ruleTriel()) {
        return;
      }
      console.log('send');
      this.change_pwd_visible = false;
      window.localStorage.setItem('changePWD', false);
      XHR.Axios_$$changePassword({...this.formData}).then(_ => {
        if (_.data.state === 1) {
          this.$message.success({content: _.data.message, key: 'updatable'});
          this.$message.loading({content: '正在重定向...', key: 'updatable'});
          setTimeout(() => {
            XHR.Axios_$$logout();
            this.$router.push('/login');
          }, 2000);
        } else {
          notification.error({
            description: _.data.message,
            message: '失败',
            duration: 5000,
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  color: @title-color;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>
