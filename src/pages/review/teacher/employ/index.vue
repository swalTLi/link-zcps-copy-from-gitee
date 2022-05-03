<template>
  <a-card :bordered="false">
    <div style="font-size:30px;color: black;margin: 20px 0;">
      {{ $route.query.name }}
    </div>
    <a-space class="operator" align="baseline">
      <label
        style="margin-left: 50px;font-size: 16px;font-weight: bold;"
        v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'"
        >二级部门审核状态：</label
      >
      <a-select
        v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'"
        default-value="0"
        v-model="secondarySectorExamineType"
        style="width: 120px"
        @change="value => handleSelect(value, 'secondarySectorExamineType')"
      >
        <a-select-option :value="-1">
          全部
        </a-select-option>
        <a-select-option :value="0">
          未审核
        </a-select-option>
        <a-select-option :value="1">
          通过
        </a-select-option>
        <a-select-option :value="2">
          退回
        </a-select-option>
      </a-select>
      <!-- <label
        v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'"
        style="margin-left: 20px;font-size: 16px;font-weight: bold;"
        >职能部门审核状态：</label
      >
      <a-select
        v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'"
        default-value="0"
        v-model="functionExamineType"
        style="width: 120px"
        @change="value => handleSelect(value, 'functionExamineType')"
      >
        <a-select-option :value="-1">
          全部
        </a-select-option>
        <a-select-option :value="0">
          未审核
        </a-select-option>
        <a-select-option :value="1">
          通过
        </a-select-option>
        <a-select-option :value="2">
          退回
        </a-select-option>
      </a-select> -->
      <label style="margin-left: 50px;font-size: 16px;font-weight: bold;"
        >教师姓名：</label
      >
      <a-input
        v-model="info.keyWord"
        allow-clear
        placeholder="请输入教师姓名"
      />
      <a-button type="primary" @click="jiansuo">检索</a-button>
    </a-space>
    <a-table
      class="table-td"
      :loading="loading"
      style="margin-top:20px;"
      :columns="COLUMNS"
      :data-source="dataSource"
      bordered
      :pagination="false"
      size="small"
    >
      <span slot="action" slot-scope="text, record, index" href="javascript:;">
        <div style="width:100px">
          <a
            style="margin-right: 8px"
            @click="QR(1, record)"
            v-if="Cookie.get('type') === '4' && Cookie.get(`type`) === '4'"
          >
            评分
          </a>
          <br />
          <a
            style="margin-right: 8px"
            @click="HP(1, record)"
            v-if="Cookie.get('type') === '4' && Cookie.get(`type`) === '4'"
          >
            本单位互评
          </a>
          <br />
          <a-popconfirm
            title="点击通过?"
            ok-text="通过"
            cancel-text="取消"
            @confirm="TG(record, index)"
            @cancel="() => {}"
          >
            <a
              style="margin-right: 8px"
              v-if="
                record.functionExamineType !== 2 &&
                  record.secondarySectorExamineType !== 2 &&
                  record.functionExamineType !== 1 &&
                  record.secondarySectorExamineType !== 1 &&
                  Cookie.get(`type`) === '4'
              "
            >
              通过
            </a>
          </a-popconfirm>
          <br />
          <a
            style="margin-right: 8px"
            @click="btg(record)"
            v-if="
              record.functionExamineType !== 2 &&
                record.secondarySectorExamineType !== 2 &&
                record.functionExamineType !== 1 &&
                record.secondarySectorExamineType !== 1 &&
                Cookie.get(`type`) === '4'
            "
          >
            不通过
          </a>
        </div>
      </span>
    </a-table>
    <a-pagination
      v-model="pagination.current"
      :page-size-options="pagination.pageSizeOptions"
      :total="pagination.total"
      show-size-changer
      :page-size="pagination.pageSize"
      @showSizeChange="onShowSizeChange"
      style="margin-top: 8px;"
    >
      <template slot="buildOptionText" slot-scope="props">
        <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
        <span v-if="props.value === '50'">全部</span>
      </template>
    </a-pagination>
    <a-modal
      v-model="visible"
      title="审核"
      ok-text="确认"
      cancel-text="取消"
      @ok="BTG"
    >
      <label>说明：</label>
      <a-textarea
        style="width: 100%;height:400px;font-size: 20px;"
        v-model="description"
        placeholder="请填写描述"
      />
    </a-modal>
    <a-modal
      v-model="visible3"
      title="评分"
      ok-text="确认"
      cancel-text="取消"
      @ok="QR(0)"
    >
      <label>说明：</label>
      <a-input
        style="width: 100%;font-size: 20px;"
        v-model="leaderScore"
        placeholder="请填写评分"
      />
    </a-modal>
    <a-modal
      v-model="visible4"
      title="本单位互评"
      ok-text="确认"
      cancel-text="取消"
      @ok="HP(0)"
    >
      <label>说明：</label>
      <a-input
        style="width: 100%;font-size: 20px;"
        v-model="mutualScore"
        placeholder="请填写本单位互评"
      />
    </a-modal>
    <a-modal
      :width="1000"
      v-model="visible2"
      title="详情"
      ok-text="确认"
      cancel-text="取消"
      @ok="visible2 = false"
    >
      <a-page-header title="填报信息" />
      <div style="margin-left: 50px;" class="label">
        <label style="line-height:30px;">所属部门：</label>
        <span>{{ record.secondarySectorName }}</span>
        <br v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'" />
        <label
          style="line-height:30px;"
          v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'"
          >二级部门审核状态：</label
        >
        <span
          v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'"
          :style="{
            color:
              record.secondarySectorExamineType === 1
                ? 'green'
                : record.secondarySectorExamineType === 2
                ? 'red'
                : 'black',
          }"
          >{{ getInfo(type1[record.secondarySectorExamineType]) }}</span
        ><br v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'" />
        <label
          style="line-height:30px;"
          v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'"
          >二级部门审核说明：</label
        >
        <span v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'">{{
          getInfo(type1[record.secondarySectorExamineNote])
        }}</span
        ><br v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'" />
        <label
          style="line-height:30px;"
          v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'"
          >职能部门审核状态：</label
        >
        <span
          v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'"
          :style="{
            color:
              record.functionExamineType === 1
                ? 'green'
                : record.functionExamineType === 2
                ? 'red'
                : 'black',
          }"
          >{{ getInfo(type2[record.functionExamineType]) }}</span
        ><br v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'" />
        <label
          style="line-height:30px;"
          v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'"
          >职能部门审核状态：</label
        >
        <span v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'">{{
          getInfo(type2[record.functionExamineNote])
        }}</span
        ><br />
        <label style="line-height:30px;">上传文件：</label>
        <span>
          <a href="" style="color: green;text-decoration: underline">下载</a>
          {{ record.fileName }}</span
        ><br />
        <label>描述：</label> <span>{{ record.description }}</span
        ><br />
      </div>
      <a-divider style="margin-bottom: 32px" />
      <a-page-header title="成果信息" />
      <a-table
        :data-source="record.tableList"
        bordered
        :pagination="false"
        size="small"
      >
        <a-table-column key="source" title="来源" data-index="source">
          <template slot-scope="text">
            {{ text }}
          </template>
        </a-table-column>
        <a-table-column key="type" title="类型" data-index="type">
          <template slot-scope="text, record">
            {{ getType([text, record.typeName]) }}
          </template>
        </a-table-column>
        <a-table-column key="name" title="名称" data-index="name">
          <template slot-scope="text">
            {{ text }}
          </template>
        </a-table-column>
        <a-table-column key="level" title="等级" data-index="level">
          <template slot-scope="text">
            {{ text }}
          </template>
        </a-table-column>
        <a-table-column key="time" title="时间" data-index="time">
          <template slot-scope="text">
            {{ getLocalTime(text) }}
          </template>
        </a-table-column>
      </a-table>
      <a-divider style="margin-bottom: 32px" />
    </a-modal>
  </a-card>
</template>

<script>
import svg_unlock from '@/assets/svg/unlock.svg';
import svg_lock from '@/assets/svg/lock.svg';
import svg_edit from '@/assets/svg/edit.svg';
import XHR from '@/services/interface';
import Cookie from 'js-cookie';
// import DetailList from "@/components/tool/DetailList";
const SVG_LIST = {
  svg_unlock,
  svg_lock,
  svg_edit,
};
export default {
  name: 'Success',
  // components: { DetailList },
  data() {
    const FileUrl = `http://api.vtszgj.rsc.sau.voooice.site/public`;
    FileUrl;
    const type1 = {
      0: '未审核',
      1: '院系部门审核通过',
      2: '院系部门审核退回',
    };
    const type2 = {
      0: '未审核',
      1: '职能部门审核通过',
      2: '职能部门审核退回',
    };
    getInfo;
    function getInfo(e) {
      if (e) {
        return e;
      } else {
        return '';
      }
    }
    function getCOLUMNS(_Columns) {
      // if (Cookie.get("type") === "1") {
      //   _Columns.splice(11, 1);
      //   return _Columns;
      // }
      // if (Cookie.get("type") === "3") {
      //   _Columns.splice(9, 1);
      //   return _Columns;
      // }
      // if (Cookie.get("type") === "4") {
      //   _Columns.splice(10, 1);
      //   return _Columns;
      // }
      return _Columns;
    }
    getLocalTime;
    function getLocalTime(nS) {
      if (nS) {
        return new Date(parseInt(nS) * 1000)
          .toLocaleString()
          .replace(/:\d{1,2}$/, ' ')
          .split(' ')[0];
      } else {
        return '无数据';
      }
    }
    const COLUMNS = [
      {
        title: '教师姓名',
        dataIndex: 'teacherName',
        key: 'teacherName',
        ellipsis: false,
        scopedSlots: { customRender: 'teacherName' },
      },
      {
        title: '教师工号',
        dataIndex: 'teacherSid',
        key: 'teacherSid',
        ellipsis: false,
        scopedSlots: { customRender: 'teacherSid' },
      },
      {
        title: '单位',
        dataIndex: 'secondarySectorName',
        key: 'secondarySectorName',
        ellipsis: false,
        scopedSlots: { customRender: 'secondarySectorName' },
      },
      {
        title: '工作时间',
        dataIndex: 'workTime',
        key: 'workTime',
        ellipsis: false,
        scopedSlots: { customRender: 'workTime' },
        customRender: value => {
          const obj = {
            children: getLocalTime(value),
            attrs: {},
          };
          function getLocalTime(nS) {
            if (nS) {
              return new Date(parseInt(nS) * 1000)
                .toLocaleString()
                .replace(/:\d{1,2}$/, ' ')
                .split(' ')[0];
            } else {
              return '无数据';
            }
          }
          return obj;
        },
      },
      {
        title: '现岗位职级',
        dataIndex: 'rankName',
        key: 'rankName',
        ellipsis: false,
        scopedSlots: { customRender: 'rankName' },
      },
      {
        title: '现岗位职级聘任时间',
        dataIndex: 'postTime',
        key: 'postTime',
        ellipsis: false,
        scopedSlots: { customRender: 'postTime' },
        customRender: (value, row) => {
          row;
          const obj = {
            children: getLocalTime(value),
            attrs: {},
          };
          return obj;
        },
      },
      {
        title: '申报岗位职级',
        dataIndex: 'appointRuleTeacherChooseName',
        key: 'appointRuleTeacherChooseName',
        ellipsis: false,
        scopedSlots: { customRender: 'appointRuleTeacherChooseName' },
      },
      {
        title: '业绩描述',
        dataIndex: 'description',
        key: 'description',
        ellipsis: false,
        scopedSlots: { customRender: 'description' },
        customRender: (value, row) => {
          const obj = {
            children: (
              <a-table
                class='rowStyle'
                showHeader={false}
                id='link-table'
                pagination={false}
                columns={[
                  {
                    title: '业绩描述',
                    width: 300,
                    dataIndex: 'description',
                    key: 'description',
                  },
                ]}
                data-source={[{ description: row.description }]}
                bordered
                size='small'
              >
                <div slot='index' slot-scope={{}}>
                  s
                </div>
              </a-table>
            ),
            attrs: {},
          };
          return obj;
        },
      },
      {
        title: '附件',
        dataIndex: 'fileName',
        key: 'fileName',
        ellipsis: false,
        scopedSlots: { customRender: 'fileName' },
        customRender: (value, row) => {
          const obj = {
            children: (
              <span>
                <span style='font-size:16px;font-weight:bold;'>附件：</span>
                <a target='_blank' href={FileUrl + row.filePath}>
                  {value ? value : '-'}
                </a>
              </span>
            ),
            attrs: {},
          };
          return obj;
        },
      },
      {
        title: '审核状态/说明',
        dataIndex: 'secondarySectorExamineType',
        key: 'secondarySectorExamineType',
        customRender: (value, row) => {
          const obj = {
            children: (
              <a-table
                class='rowStyle'
                showHeader={false}
                id='link-table'
                pagination={false}
                columns={[
                  {
                    title: '教师id',
                    dataIndex: 'secondarySectorExamineType',
                    width: 100,
                    scopedSlots: { customRender: 'secondarySectorExamineType' },
                    customRender: (value, row) => {
                      var arr = [];
                      var color = '';
                      if (row.secondarySectorExamineType === 2) {
                        color = 'red';
                        arr = [
                          getInfo(type1[row.secondarySectorExamineType]),
                          row.secondarySectorExamineNote
                            ? row.secondarySectorExamineNote
                            : '空',
                        ].join(' / ');
                      } else if (row.secondarySectorExamineType === 1) {
                        color = 'green';
                        arr = getInfo(type1[row.secondarySectorExamineType]);
                      } else {
                        arr = getInfo(type1[0]);
                      }
                      const obj = {
                        children: <p style={{ color: color }}>{arr}</p>,
                        attrs: {},
                      };
                      return obj;
                    },
                  },
                ]}
                data-source={[
                  {
                    secondarySectorExamineType: value,
                    secondarySectorExamineNote: row.secondarySectorExamineNote,
                  },
                ]}
                bordered
                size='small'
              />
            ),
            attrs: {},
          };
          return obj;
        },
      },
      // {
      //   title: "职能审核状态/说明",
      //   dataIndex: "functionExamineType",
      //   key: "functionExamineType",
      //   customRender: (value, row) => {
      //     const obj = {
      //       children: (
      //         <a-table
      //           class="rowStyle"
      //           showHeader={false}
      //           id="link-table"
      //           pagination={false}
      //           columns={[
      //             {
      //               title: "教师id",
      //               dataIndex: "functionExamineType",
      //               width: 100,
      //               scopedSlots: { customRender: "functionExamineType" },
      //               customRender: (value, row) => {
      //                 var arr = [];
      //                 var color = "";
      //                 if (row.functionExamineType === 2) {
      //                   color = "red";
      //                   arr = [
      //                     getInfo(type2[row.functionExamineType]),
      //                     row.functionExamineNote
      //                       ? row.functionExamineNote
      //                       : "空",
      //                   ].join(" / ");
      //                 } else if (row.functionExamineType === 1) {
      //                   color = "green";
      //                   arr = getInfo(type2[row.functionExamineType]);
      //                 } else {
      //                   arr = getInfo(type2[0]);
      //                 }
      //                 const obj = {
      //                   children: <p style={{ color: color }}>{arr}</p>,
      //                   attrs: {},
      //                 };
      //                 return obj;
      //               },
      //             },
      //           ]}
      //           data-source={[
      //             {
      //               functionExamineType: value,
      //               functionExamineNote: row.functionExamineNote,
      //             },
      //           ]}
      //           bordered
      //           size="small"
      //         />
      //       ),
      //       attrs: {},
      //     };
      //     return obj;
      //   },
      // },
      {
        title: '评分',
        dataIndex: 'leaderScore',
        key: 'leaderScore',
        ellipsis: false,
        scopedSlots: { customRender: 'leaderScore' },
        customRender: value => {
          const obj = {
            children: <span>{value ? value : '-'}</span>,
            attrs: {},
          };
          return obj;
        },
      },
      {
        title: '本单位互评',
        dataIndex: 'mutualScore',
        key: 'mutualScore',
        ellipsis: false,
        scopedSlots: { customRender: 'mutualScore' },
        customRender: value => {
          const obj = {
            children: <span>{value ? value : '-'}</span>,
            attrs: {},
          };
          return obj;
        },
      },
      // {
      //   title: "教师姓名",
      //   dataIndex: "teacherName",
      //   key: "teacherName",
      //   ellipsis: false,
      //   scopedSlots: { customRender: "teacherName" },
      //   customRender: value => {
      //     const obj = {
      //       children: value,
      //       attrs: {},
      //     };
      //     return obj;
      //   },
      // },
      // {
      //   title: "教师工号",
      //   dataIndex: "teacherSid",
      //   key: "teacherSid",
      //   ellipsis: false,
      //   scopedSlots: { customRender: "teacherSid" },
      //   customRender: value => {
      //     const obj = {
      //       children: value,
      //       attrs: {},
      //     };
      //     return obj;
      //   },
      // },
      // {
      //   title: "职称",
      //   dataIndex: "teacherTitle",
      //   key: "teacherTitle",
      //   ellipsis: false,
      //   scopedSlots: { customRender: "teacherTitle" },
      //   customRender: value => {
      //     const obj = {
      //       children: value,
      //       attrs: {},
      //     };
      //     return obj;
      //   },
      // },
      // {
      //   title: "聘任时间",
      //   dataIndex: "teacherTitleTime",
      //   key: "teacherTitleTime",
      //   ellipsis: false,
      //   scopedSlots: { customRender: "teacherTitleTime" },
      //   customRender: value => {
      //     const obj = {
      //       children: value,
      //       attrs: {},
      //     };
      //     return obj;
      //   },
      // },
      // {
      //   title: "评选职级",
      //   dataIndex: "appointRuleName",
      //   key: "appointRuleName",
      //   ellipsis: false,
      //   scopedSlots: { customRender: "appointRuleName" },
      //   customRender: value => {
      //     const obj = {
      //       children: value,
      //       attrs: {},
      //     };
      //     return obj;
      //   },
      // },
      // {
      //   title: "描述",
      //   dataIndex: "description",
      //   key: "description",
      //   ellipsis: false,
      //   width: "50%",
      //   scopedSlots: { customRender: "description" },
      //   customRender: (value, row) => {
      //     const obj = {
      //       children: (
      //         // <span style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap">
      //         <span>{row.teacherInput.description}</span>
      //       ),
      //       attrs: {},
      //     };
      //     return obj;
      //   },
      // },
      // {
      //   title: "文件",
      //   dataIndex: "fileName",
      //   key: "fileName",
      //   ellipsis: false,
      //   scopedSlots: { customRender: "fileName" },
      //   customRender: (value, row) => {
      //     const obj = {
      //       children: (
      //         <a href={row.teacherInput.filePath}>
      //           {row.teacherInput.fileName}
      //         </a>
      //       ),
      //       attrs: {},
      //     };
      //     return obj;
      //   },
      // },
      // {
      //   title: "审核状态",
      //   dataIndex: "secondarySectorExamineType",
      //   key: "secondarySectorExamineType",
      //   ellipsis: false,
      //   scopedSlots: { customRender: "secondarySectorExamineType" },
      //   customRender: (value, row) => {
      //     var color = "";
      //     if (row.teacherInput.secondarySectorExamineType === 2) {
      //       color = "red";
      //     }
      //     if (row.teacherInput.secondarySectorExamineType === 1) {
      //       color = "green";
      //     }
      //     const obj = {
      //       children: (
      //         <span style={{ color: color }}>
      //           {getInfo(type1[row.teacherInput.secondarySectorExamineType])}
      //         </span>
      //       ),
      //       attrs: {},
      //     };
      //     return obj;
      //   },
      // },
      // {
      //   title: "审核说明",
      //   dataIndex: "secondarySectorExamineNote",
      //   key: "secondarySectorExamineNote",
      //   ellipsis: false,
      //   scopedSlots: { customRender: "secondarySectorExamineNote" },
      //   customRender: (value, row) => {
      //     const obj = {
      //       children: row.teacherInput.secondarySectorExamineNote,
      //       attrs: {},
      //     };
      //     return obj;
      //   },
      // },
      // {
      //   title: "评分",
      //   dataIndex: "",
      //   key: "leaderScore",
      //   width: "6%",
      //   ellipsis: false,
      //   scopedSlots: { customRender: "leaderScore" },
      //   customRender: (value, row) => {
      //     const obj = {
      //       children: (
      //         <div>
      //           <span>
      //             {row.teacherInput.leaderScore === 0
      //               ? "未评分"
      //               : row.teacherInput.leaderScore}
      //           </span>
      //           <a-button
      //             type="primary"
      //             onClick={() => {
      //               this.visible3 = true;
      //               this.record = Object.assign(row, {});
      //               console.log(this.record);
      //             }}
      //           >
      //             修改
      //           </a-button>
      //         </div>
      //       ),
      //       attrs: {},
      //     };
      //     return obj;
      //   },
      // },
      // {
      //   title: "序号",
      //   dataIndex: "serialNumberName",
      //   key: "serialNumberName",
      //   ellipsis: false,
      //   scopedSlots: { customRender: "serialNumberName" },
      //   customRender: (value, row, index) => {
      //     const obj = {
      //       children: value,
      //       attrs: {},
      //     };
      //     console.log(
      //       this.dataSource[index - 1],
      //       row.serialNumberName,
      //       row.number,
      //       row.require_number
      //     );
      //     // const serialNumberName = this.dataSource[index - 1]
      //     //   ? this.dataSource[index - 1].serialNumberName
      //     //   : "";
      //     if (row.require_number !== 1) {
      //       obj.attrs.rowSpan = 0;
      //     } else {
      //       obj.attrs.rowSpan = row.require_children_num;
      //     }
      //     return obj;
      //   },
      // },
      // {
      //   title: "具体要求",
      //   dataIndex: "line",
      //   key: "line",
      //   ellipsis: false,
      //   scopedSlots: { customRender: "line" },
      // },
      // {
      //   title: "填报时间",
      //   dataIndex: "updateTime",
      //   key: "updateTime",
      //   scopedSlots: { customRender: "updateTime" },
      //   ellipsis: false,
      //   customRender: value => {
      //     const obj = {
      //       children: getLocalTime(value),
      //       attrs: {},
      //     };
      //     function getLocalTime(nS) {
      //       if (nS) {
      //         return new Date(parseInt(nS) * 1000)
      //           .toLocaleString()
      //           .replace(/:\d{1,2}$/, " ")
      //           .split(" ")[0];
      //       } else {
      //         return "无数据";
      //       }
      //     }
      //     return obj;
      //   },
      // },
      // // 二级
      // {
      //   title: "二级部门审核状态",
      //   dataIndex: "secondarySectorExamineType",
      //   key: "secondarySectorExamineType",
      //   scopedSlots: { customRender: "secondarySectorExamineType" },
      //   ellipsis: false,
      //   customRender: (value, row) => {
      //     var color = "";
      //     if (row.secondarySectorExamineType === 2) {
      //       color = "red";
      //     }
      //     if (row.secondarySectorExamineType === 1) {
      //       color = "green";
      //     }
      //     const obj = {
      //       children: (
      //         <span style={{ color: color }}>
      //           {getInfo(type1[row.secondarySectorExamineType])}
      //         </span>
      //       ),
      //       attrs: {},
      //     };
      //     return obj;
      //   },
      // },
      // {
      //   title: "二级部门审核说明",
      //   dataIndex: "secondarySectorExamineNote",
      //   key: "secondarySectorExamineNote",
      //   scopedSlots: { customRender: "secondarySectorExamineNote" },
      //   ellipsis: false,
      //   customRender: (value, row) => {
      //     const obj = {
      //       children: getInfo(row.secondarySectorExamineNote),
      //       attrs: {},
      //     };
      //     return obj;
      //   },
      // },
      // // 职能部门
      // {
      //   title: "职能部门审核状态",
      //   dataIndex: "functionExamineType",
      //   key: "functionExamineType",
      //   scopedSlots: { customRender: "functionExamineType" },
      //   ellipsis: false,
      //   customRender: (value, row) => {
      //     var color = "";
      //     if (row.functionExamineType === 2) {
      //       color = "red";
      //     }
      //     if (row.functionExamineType === 1) {
      //       color = "green";
      //     }
      //     const obj = {
      //       children: (
      //         <span style={{ color: color }}>
      //           {getInfo(type2[row.functionExamineType])}
      //         </span>
      //       ),
      //       attrs: {},
      //     };
      //     return obj;
      //   },
      // },
      // {
      //   title: "职能部门审核说明",
      //   dataIndex: "functionExamineNote",
      //   key: "functionExamineNote",
      //   scopedSlots: { customRender: "functionExamineNote" },
      //   ellipsis: false,
      //   customRender: (value, row) => {
      //     const obj = {
      //       children: getInfo(row.functionExamineNote),
      //       attrs: {},
      //     };
      //     return obj;
      //   },
      // },
      {
        title: '操作',
        dataIndex: 'action',
        ellipsis: false,
        width: '5%',
        scopedSlots: { customRender: 'action' },
      },
    ];
    return {
      Cookie,
      pagination: {
        pageSizeOptions: ['10'],
        current: 1,
        pageSize: 10,
        total: undefined,
      },
      type1,
      type2,
      description: '',
      ...SVG_LIST,
      dataSource: [],
      COLUMNS: getCOLUMNS(COLUMNS),
      tableDate: [],
      num: 0,
      loading: true,
      visible: false,
      visible2: false,
      visible3: false,
      visible4: false,
      leaderScore: undefined,
      record: {},
      info: {
        page: 1,
        line: 10,
        keyWord: '',
      },
      functionExamineType: -1,
      secondarySectorExamineType: -1,
      loaging: false,
    };
  },
  async activated() {
    await this.getList();
  },
  async mounted() {
    await this.getList();
  },
  destroyed() {},
  watch: {
    visible(newV) {
      if (!newV) {
        this.record = {};
      }
    },
    'pagination.pageSize': {
      handler(val) {
        console.log('pageSize', val);
        this.pagination.pageSize = val;
        this.getList();
      },
      deep: true,
    },
    'pagination.current': {
      handler(val) {
        this.pagination.current = val;
        console.log('current', val);
        this.getList();
      },
      deep: true,
    },
  },
  methods: {
    async getList() {
      this.loading = true;
      this.info.page = this.pagination.current;
      this.info.line = this.pagination.pageSize;
      var status = {
        functionExamineType: undefined,
        secondarySectorExamineType: undefined,
      };
      if (this.secondarySectorExamineType !== -1) {
        status.secondarySectorExamineType = this.secondarySectorExamineType;
      }
      if (this.functionExamineType !== -1) {
        status.functionExamineType = this.functionExamineType;
      }
      await XHR.Axios_$$appointReview_searchTeacherUploadList({
        ...this.info,
        appointReviewId: this.$route.query.appointReviewId,
        ruleId: this.$route.query.ruleId,
        functionExamineType: status.functionExamineType,
        secondarySectorExamineType: status.secondarySectorExamineType,
        keyWord: this.info.keyWord,
      }).then(_ => {
        this.pagination.total = _.data.info.lineCount;
        this.pagination.pageCount = _.data.info.pageCount;
        this.dataSource = _.data.info.list;
        this.$forceUpdate();
      });
      // console.log(this.tableDate);
      // console.log(this.dataSource);
      this.loading = false;
      return this.tableDate;
    },
    async QR(type, record) {
      if (type === 1) {
        this.record = record;
        return (this.visible3 = true);
      }
      if (!this.leaderScore) {
        return this.$message.error('请打分');
      }
      console.log(this.record);
      await XHR.Axios_$$appointReview_setLeaderScore({
        id: this.record.teacherInputId,
        leaderScore: this.leaderScore,
      }).then(() => {
        this.leaderScore = undefined;
        this.visible3 = false;
        this.getList();
      });
    },
    async HP(type, record) {
      if (type === 1) {
        this.record = record;
        return (this.visible4 = true);
      }
      if (!this.mutualScore) {
        return this.$message.error('请打分');
      }
      console.log(this.record);
      await XHR.Axios_$$appointReview_setMutualScore({
        id: this.record.teacherInputId,
        mutualScore: this.mutualScore,
      }).then(() => {
        this.mutualScore = undefined;
        this.visible4 = false;
        this.getList();
      });
    },
    async SEE(record) {
      await XHR.Axios_$$rankReview_searchTeacherUploadInfo({
        id: record.teacherInputId,
        teacherSecondarySectorInfo: record.secondarySectorName,
      }).then(async _ => {
        // console.log(_);
        var list = [];
        this.record = { ...record, ..._.data.info };
        await _.data.info.chooseResearch.forEach(_ => {
          list.push(_);
        });
        await _.data.info.chooseProject.forEach(_ => {
          list.push(_);
        });
        await _.data.info.chooseCompetition.forEach(_ => {
          list.push(_);
        });
        this.record.tableList = list;
      });
      this.visible2 = await true;
    },
    async TG(record) {
      console.log(record);
      var info = {};
      // if (
      //   record["functionExamineType"] !== undefined &&
      //   record["functionExamineType"] !== null
      // ) {
      //   info["functionExamineType"] = 1;
      //   info["functionExamineNote"] = "";
      // }
      if (
        record['secondarySectorExamineType'] !== undefined &&
        record['secondarySectorExamineType'] !== null
      ) {
        info['secondarySectorExamineType'] = 1;
        info['secondarySectorExamineNote'] = '';
      }
      // console.log(info);
      await XHR.Axios_$$appointReview_checkTeacherFill({
        id: record.teacherInputId,
        ...info,
      }).then(_ => {
        // console.log(_);
        if (_.data.state === 1) {
          this.getList();
        }
      });
    },
    async BTG() {
      var info = {};
      // if (
      //   this.record["functionExamineType"] !== undefined &&
      //   this.record["functionExamineType"] !== null
      // ) {
      //   info["functionExamineType"] = 2;
      //   if (!this.description) {
      //     return this.$message.error("请将说明填完整");
      //   } else {
      //     info["functionExamineNote"] = this.description;
      //   }
      // }
      if (
        this.record['secondarySectorExamineType'] !== undefined &&
        this.record['secondarySectorExamineType'] !== null
      ) {
        info['secondarySectorExamineType'] = 2;
        if (!this.description) {
          return this.$message.error('请将说明填完整.');
        } else {
          info['secondarySectorExamineNote'] = this.description;
        }
      }
      await XHR.Axios_$$appointReview_checkTeacherFill({
        id: this.record.teacherInputId,
        ...info,
      }).then(_ => {
        console.log(_);
        this.description = '';
        this.visible = false;
      });
      await this.getList();
    },
    getType(arr) {
      var a = [];
      arr.forEach(_ => {
        if (_) a.push(_);
      });
      return a.join(' / ');
    },
    deepCopy(obj) {
      var a = JSON.stringify(obj);
      var newobj = JSON.parse(a);
      return newobj;
    },
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
    getLength(list) {
      var a = 0;
      list.forEach(_ => {
        _.requireList.forEach(() => {
          a++;
        });
      });
      console.log(a);
      return a;
    },
    hideModal() {
      this.visible = false;
    },
    btg(record) {
      this.record = record;
      this.visible = true;
    },
    async goto(path, query, key) {
      this.$router.push({
        path,
        query: { ...query, [key]: query.id },
      });
    },
    getInfo(e) {
      if (e) {
        return e;
      } else {
        return '';
      }
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
      // this.getList();
    },
    getCOLUMNS(_Columns) {
      // 管理员
      if (Cookie.get('type') == '1') {
        _Columns;
      }
    },
    handleSelect(value, key) {
      this[key] = value;
      // console.log(this[key]);
      this.pagination = {
        pageSizeOptions: ['10'],
        current: 1,
        pageSize: 10,
        total: undefined,
      };
      this.getList();
    },
    jiansuo() {
      console.log(this.pagination);
      this.pagination = {
        pageSizeOptions: ['10'],
        current: 1,
        pageSize: 10,
        total: undefined,
      };
      this.getList();
    },
  },
};
</script>

<style scoped lang="less">
.result-success {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  // height: 300px;
  // background-color: green;
  padding-top: 30px;
  .line {
    width: 100%;
    background-color: white;
    align-items: center;
    font-size: 30px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .box {
    cursor: pointer;
    width: 30%;
    // background-color: red;
    left: 1057px;
    top: 146px;
    // height: 158px;
    line-height: 20px;
    border-radius: 3px;
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: center;
    // align-items: start;
    .welcome-link {
      margin-top: 20px;
      width: 100%;
      height: 150px;
      background-color: rgba(255, 255, 255, 100);
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.14);
      border: 1px solid rgba(233, 233, 233, 100);
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .box {
        width: 60%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
    }
    .d1 {
      width: 100%;
      span {
        left: 430px;
        top: 177px;
        width: 64px;
        height: 24px;
        color: rgba(16, 16, 16, 100);
        font-size: 16px;
        text-align: left;
        font-family: SourceHanSansSC-regular;
      }
    }
    .d2 {
      width: 100%;
      span {
        left: 799px;
        top: 213px;
        height: 22px;
        color: rgba(136, 137, 138, 100);
        font-size: 14px;
        text-align: center;
        font-family: SourceHanSansSC-regular;
      }
    }
  }
  .label {
    label {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .action:not(:first-child) {
    margin-left: 8px;
  }
  .project-name {
    font-size: 16px;
    color: @title-color;
    font-weight: 500;
    margin-bottom: 20px;
  }
}
.result-success {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  // height: 300px;
  // background-color: green;
  padding-top: 30px;
  .line {
    width: 100%;
    background-color: white;
    align-items: center;
    font-size: 30px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .box {
    cursor: pointer;
    width: 30%;
    // background-color: red;
    left: 1057px;
    top: 146px;
    // height: 158px;
    line-height: 20px;
    border-radius: 3px;
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: center;
    // align-items: start;
    .welcome-link {
      margin-top: 20px;
      width: 100%;
      height: 150px;
      background-color: rgba(255, 255, 255, 100);
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.14);
      border: 1px solid rgba(233, 233, 233, 100);
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .box {
        width: 60%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
    }
    .d1 {
      width: 100%;
      span {
        left: 430px;
        top: 177px;
        width: 64px;
        height: 24px;
        color: rgba(16, 16, 16, 100);
        font-size: 16px;
        text-align: left;
        font-family: SourceHanSansSC-regular;
      }
    }
    .d2 {
      width: 100%;
      span {
        left: 799px;
        top: 213px;
        height: 22px;
        color: rgba(136, 137, 138, 100);
        font-size: 14px;
        text-align: center;
        font-family: SourceHanSansSC-regular;
      }
    }
  }
  .label {
    label {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .action:not(:first-child) {
    margin-left: 8px;
  }
  .project-name {
    font-size: 16px;
    color: @title-color;
    font-weight: 500;
    margin-bottom: 20px;
  }
}

#link-table {
  // display: flex !important;
  // align-items: center !important;
  // justify-content: space-around;
  // 给.ant-table设置最低高度
  /deep/.ant-empty-normal {
    // margin: 1.9% 0 !important;
  }

  // 当表格数据为空时，修改.ant-empty-normal样式，会撑高空白样式
  /deep/.ant-table-content {
    // min-height: 100% !important;
    border: 0;
  }
  /deep/.ant-table {
    min-height: 100% !important;
    border: 0;
  }
  /deep/ tr {
    // border: 0;
    // height: 100% !important;
    // height: 1px !important;
    // line-height: 1px !important;
    padding: 0px !important;
  }
  /deep/ td {
    // background: rgb(221, 221, 221);
    // border: 0;
    // height: 1px !important;
    text-align: center;
    // line-height: 30px !important;
    padding: 1px !important;
  }
  /deep/ th {
    // border: 0;
    // height: 1px !important;
    // line-height: 1px !important;
    padding: 0px !important;
  }
  /deep/ .ant-table-tbody {
    // border: 0;
    padding: 0px !important;
  }
}
.table-td {
  /deep/ td {
    // background: rgb(160, 160, 160);
    // padding: 0px !important;
  }
}
/deep/ .ant-table-tbody > tr > td {
  // padding: 0px !important;
}
th.description,
td.description {
  padding: 0px !important;
  // text-align: right !important;
}
td {
  padding: 1px !important;
  text-align: center !important;
}
a:hover {
  text-decoration: underline !important;
}
</style>
