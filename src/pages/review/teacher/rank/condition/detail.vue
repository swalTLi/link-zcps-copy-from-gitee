<template>
  <a-card :bordered="false">
    <detail-list title="详细信息">
      <detail-list-item
        v-for="item in columns"
        :key="item.dataIndex"
        :term="getKey(item.dataIndex)"
        v-show="
          item.info_show === false
            ? false
            : true &&
              item.formType !== 'ldq-list' &&
              item.formType !== 'ldq-table' &&
              item.formType !== 'ldq-href' &&
              item.formType !== 'ldq-ms'
        "
      >
        <!-- 下拉菜单 -->
        <span v-if="item.formType === 'ldq-select'">
          {{ getJobName(item.selects, record[item.dataIndex]) }}
        </span>
        <!-- 单选 -->
        <span v-else-if="item.formType === 'ldq-radio'">
          <a-tag
            :color="
              record[item.dataIndex] === 0
                ? 'red'
                : record[item.dataIndex] === 1
                ? 'green'
                : 'grey'
            "
          >
            {{ getLabel(record, item.dataIndex) }}
          </a-tag>
        </span>
        <!-- 时间戳 -->
        <span v-else-if="item.formType === 'ldq-datatime'">
          {{ getLocalTime(record[item.dataIndex]) }}
        </span>
        <span v-else-if="item.formType === 'ldq-datatime-m'">
          {{ getLocalTime(record[item.dataIndex]) }}
        </span>
        <span v-else-if="item.formType === 'ldq-money'">
          {{ record[item.dataIndex] }} （万元）
        </span>
        <span v-else-if="item.formType === 'ldq-href'">
          <a
            target="_blank"
            :href="`http://58.154.31.18:82/` + record['filePath']"
            >{{ record["fileName"] }}</a
          >
        </span>
        <span v-else-if="item.formType === 'ldq-isUpload'">
          {{ isUpload[record[item.dataIndex]] }}
        </span>
        <span v-else>
          {{
            record[item.dataIndex] === undefined ? "无" : record[item.dataIndex]
          }}
        </span>
      </detail-list-item>
    </detail-list>
    <a-divider style="margin-bottom: 32px" />
    <div class="title"><h4 style="font-weight:bold;">上传信息</h4></div>
    <label
      style="line-height: 50px;
    color: rgba(0, 0, 0, 0.85);"
      >描述：</label
    ><span>{{ record["description"] }}</span>
    <br />
    <label
      style="line-height: 20px;
    padding-bottom: 16px;
    color: rgba(0, 0, 0, 0.85);"
      >文件名：</label
    ><span
      ><a
        target="_blank"
        :href="`http://58.154.31.18:82/` + record['filePath']"
        >{{ record["fileName"] }}</a
      ></span
    >
    <!-- <detail-list title="上传信息">
      <detail-list-item
        v-for="item in columns"
        :key="item.dataIndex"
        :term="getKey(item.dataIndex)"
        v-show="
          item.info_show === false
            ? false
            : true &&
              (item.formType === 'ldq-href' || item.formType === 'ldq-ms')
        "
      >
        <span v-if="item.formType === 'ldq-ms'">
          {{ record[item.dataIndex] }}
        </span>
        <span v-if="item.formType === 'ldq-href'">
          <a
            target="_blank"
            :href="`http://58.154.31.18:82/` + record['filePath']"
            >{{ record["fileName"] }}</a
          >
        </span>
      </detail-list-item>
    </detail-list> -->
    <a-divider style="margin-bottom: 32px" />
    <div class="title"><h4 style="font-weight:bold;">已选成果：</h4></div>
    <!-- <div
      style="font-size:30px;margin:20px 100px;"
      v-if="
        record['chooseCompetition'].length === 0 &&
          record['chooseProject'].length === 0 &&
          record['chooseResearch'].length == 0
      "
    >
      暂无
    </div> -->
    <br />
    <!-- v-if="record['chooseCompetition'].length > 0" -->
    <div class="title">
      <h5 style="font-weight:bold;margin:20px 0 ;">大创/竞赛</h5>
    </div>
    <!-- v-if="record['chooseCompetition'].length > 0" -->
    <a-table
      :data-source="record['chooseCompetition']"
      rowKey="id"
      :pagination="false"
    >
      <a-table-column
        key="name"
        title="大创/竞赛"
        data-index="name"
        width="300"
      />
      <a-table-column key="level" title="等级" data-index="level" width="300" />
      <a-table-column
        key="finish"
        title="是否结题"
        data-index="finish"
        width="300"
      />
    </a-table>
    <!-- v-if="record['chooseProject'].length > 0" -->
    <div class="title">
      <h5 style="font-weight:bold;margin:20px 0 ;">教务处项目</h5>
    </div>
    <!-- v-if="record['chooseProject'].length > 0" -->
    <a-table
      :data-source="record['chooseProject']"
      :pagination="false"
      rowKey="id"
    >
      <a-table-column
        key="name"
        title="教务处项目"
        data-index="name"
        width="300"
      />
      <a-table-column key="level" title="等级" data-index="level" />
      <!--      <a-table-column-->
      <!--        key="workload"-->
      <!--        title="工作量"-->
      <!--        data-index="workload"-->
      <!--        width="300"-->
      <!--      />-->
    </a-table>
    <!-- v-if="record['chooseResearch'].length > 0" -->
    <div class="title">
      <h5 style="font-weight:bold;margin:20px 0 ;">科研成果</h5>
    </div>
    <!-- v-if="record['chooseResearch'].length > 0" -->
    <a-table
      :data-source="record['chooseResearch']"
      rowKey="id"
      :pagination="false"
    >
      <a-table-column
        key="typeName"
        title="类型"
        data-index="typeName"
        width="300"
      />
      <a-table-column key="name" title="名称" data-index="name" width="300" />
      <a-table-column key="level" title="等级" data-index="level" width="300" />
      <a-table-column key="sid" title="编号" data-index="sid" width="300" />
      <a-table-column
        key="money"
        title="经费（万）"
        data-index="money"
        width="300"
      />
      <a-table-column
        key="source"
        title="来源"
        data-index="source"
        width="300"
      />
      <!--      <a-table-column-->
      <!--        key="subject"-->
      <!--        title="学科分类"-->
      <!--        data-index="subject"-->
      <!--        width="300"-->
      <!--      />-->
    </a-table>
  </a-card>
</template>

<script>
import DetailList from "@/components/tool/DetailList";
import Cookie from "js-cookie";

const DetailListItem = DetailList.Item;
export default {
  name: "BasicDetail",
  components: { DetailListItem, DetailList },
  props: {
    // 数据配置
    columns: {
      type: Array,
      default: function() {
        return [];
      },
    },
    // 用户数据
    record: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  data() {
    return {
      isUpload: {
        0: "未提交",
        1: "已提交",
        2: "未通过",
        3: "已通过",
      },
      Cookie,
    };
  },
  mounted() {
    // console.log(this.columns);
    console.log(this.record);
  },
  methods: {
    // 时间戳转日期
    getLocalTime(nS) {
      if (nS) {
        return new Date(parseInt(nS) * 1000)
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ")
          .split(" ")[0];
      } else {
        return "无数据";
      }
    },
    // 日期转时间戳
    datatimeChange(dateString, key) {
      this.form[key] = new Date(dateString).getTime() / 1000;
    },
    getJobName(selects, jobId) {
      var name = "";
      selects.forEach(_ => {
        if (jobId === _.id) {
          console.log(_.name);
          name = _.name;
        }
      });
      return name === "" ? "无" : name;
    },
    getKey(key) {
      const val = this.columns.find(_ => _.dataIndex === key);
      return val?.title;
    },
    getLabel(record, dataIndex) {
      let val = "";
      this.columns.find(_ => {
        if (_.dataIndex === dataIndex) {
          _["radios"].find(__ => {
            if (__.value === record[dataIndex]) {
              val = __.label;
            }
          });
        }
      });
      return val;
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  color: @title-color;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>
