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
            : true && item.formType !== 'ldq-list'
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
        <!-- 时间戳 -->
        <!-- <span v-else-if="item.formType === 'ldq-list'">
          {{ getLocalTime(record[item.dataIndex]) }}
        </span> -->
        <!-- 文本 -->
        <span style="width: 100%;" v-else>
          {{
            record[item.dataIndex] === undefined ? "无" : record[item.dataIndex]
          }}
        </span>
      </detail-list-item>
    </detail-list>
  </a-card>
</template>

<script>
import DetailList from "@/components/tool/DetailList";

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
    return {};
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
