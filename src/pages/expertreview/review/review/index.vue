<template>
    <div>
        <!--    卡片开始-->
        <a-card>
            <!--      表单部分-->
            <!--      表单结束-->
            <div>
                <div style="display: flex;justify-content: space-between;">
                    <a-space class="operator" align="baseline">
                        <ImageButton
                                :src="svg_create"
                                @click="opendetailmodal('Add', {})"
                                :text="'创建（更新）评审'"
                        />
                    </a-space>
                    <!--          分页-->
                    <a-pagination
                            style="right:0px;"
                            v-model="pagination.current"
                            show-size-changer
                            :page-size.sync="pagination.pageSize"
                            :total="pagination.lineCount"
                            @showSizeChange="onShowSizeChange"
                            :page-size-options="pagination.options"
                            :defaultPageSize="pagination.pageSize"
                            :position="'both'"
                    />
                </div>
                <!--        表格-->
                <standard-table
                        :columns="columns"
                        :dataSource="dataSource"
                        :selectedRows.sync="selectedRows"
                        @clear="onClear"
                        @change="onChange"
                        rowKey="id"
                        :loading="pagination.loading"
                        @selectedRowChange="onSelectChange"
                        size="small"
                >
                    <div slot="index" slot-scope="{ index }">
                        {{ index + 1 }}
                    </div>
                    <div slot="openReview" slot-scope="record">
                            {{ getLabel(record.record, "openReview") }}

                    </div>
                    <div slot="allowVote" slot-scope="record">
                        {{ getLabel(record.record, "allowVote") }}

                    </div>
                    <div slot="startTime" slot-scope="{ text }">
                        {{ getLocalTime(text) }}
                    </div>
                    <div slot="endTime" slot-scope="{ text }">
                        {{ getLocalTime(text) }}
                    </div>
                    <div slot="action" slot-scope="{ record }">
                        <a style="margin-right: 8px"   @click="opendetailmodal('Edit', record)">
                            <a-tag  :color=" 'blue'"
                            >编辑
                            </a-tag>
                        </a>
                        <a v-if="record.isImport==0" style="margin-right: 8px" @click="importper(record.id)">
                            <a-tag  :color=" 'blue'"
                            >导入人员
                            </a-tag>
                        </a>
                        <a style="margin-right: 8px" @click="goto('project', record)" >
                            <a-tag  :color=" 'blue'"
                            >项目评审
                            </a-tag>
                        </a>
                        <a-popconfirm
                                    title="确认删除？"
                                    ok-text="删除"
                                    cancel-text="取消"
                                    @confirm="deleteRecord(record)"
                            >
                                <a-tag  :color=" 'red'"
                                        :component="svg_delete"
                                >删除
                                </a-tag>
                            </a-popconfirm>
                    </div>
                    <template slot="statusTitle">
                        <a-icon @click.native="onStatusTitleClick" type="info-circle" />
                    </template>
                </standard-table>
                <!--        表格结束-->
                <div
                        style="display: flex;justify-content: space-between;margin-top: 20px;"
                >
                    <div></div>
                    <!--          下分页-->
                    <a-pagination
                            style="right:0px;"
                            v-model="pagination.current"
                            show-size-changer
                            :page-size.sync="pagination.pageSize"
                            :total="pagination.lineCount"
                            @showSizeChange="onShowSizeChange"
                            :page-size-options="pagination.options"
                            :defaultPageSize="pagination.pageSize"
                            :position="'both'"
                    />
                </div>
            </div>
        </a-card>

        <div>
            <!-- 编辑框 -->
            <div v-if="detail_model_data.visible">
                <detail-model
                        ref="DetailModel"
                        :visible="detail_model_data.visible"
                        :type="detail_model_data.type"
                        :title="detail_model_data.tableTitle"
                        :columns="detail_model_data.columns"
                        :width="detail_model_data.width"
                        :record="detail_model_data.record"
                        :userType="detail_model_data.userType"
                        :listIndex="detail_model_data.listIndex"
                        @handleDetailModelSubmit="handleDetailModelSubmit"
                        @getList="getList()"
                        @closemodel="detail_model_data.visible = false"
                        :getUser="false"
                />
            </div>
<!--            子组件-->
            <ImportPer ref="ImportPer"
                       :expertReviewId="id.id"
                       @getList="getList()"
                       >
            </ImportPer>

            <!-- 上传excel导入框 -->
            <a-modal v-model="visible_upload_excel" title="excel导入" @ok="handleOk">
                <a-upload-dragger
                        name="file"
                        :multiple="true"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        @change="handleChange"
                >
                    <p class="ant-upload-drag-icon">
                        <a-icon type="inbox" />
                    </p>
                    <p class="ant-upload-text">{{ $t("upload_title") }}</p>
                    <p class="ant-upload-hint">
                        {{ $t("upload_info") }}
                    </p>
                </a-upload-dragger>
            </a-modal>
        </div>
    </div>
</template>

<script>
    import StandardTable from "@/components/table/StandardTable";
    // 规则验证
    import { teacher } from "@/formRules";
    import XHR from "@/services/interface";
    // svg组件
    import svg_excel_upload from "@/assets/svg/excel_upload.svg";
    import svg_excel_export from "@/assets/svg/excel_export.svg";
    import svg_create from "@/assets/svg/create.svg";
    import svg_registration from "@/assets/svg/Registration.svg";
    import svg_delete from "@/assets/svg/delete.svg";
    import svg_user from "@/assets/svg/user.svg";
    import svg_details from "@/assets/svg/details.svg";
    import svg_edit from "@/assets/svg/edit.svg";
    import svg_condition from "@/assets/svg/condition.svg";
    import svg_list from "@/assets/svg/list.svg";
    import ImageButton from "@/components/imageBtn";
    // 自定义组件
    import DetailModel from "@/pages/review/components/detailModel";
    import ImportPer from "@/pages/review/components/ImportPer";
    // 数据配置
    import { COLUMNS } from "./COLUMNS";
    const SVG_LIST = {
        svg_excel_upload,
        svg_excel_export,
        svg_create,
        svg_registration,
        svg_delete,
        svg_user,
        svg_details,
        svg_edit,
        svg_condition,
        svg_list,
    };
    export default {
        name: "AdminFaculty",
        components: { StandardTable, ImageButton, DetailModel ,ImportPer},
        i18n: require("./i18n"),
        data() {
            return {
                /**
                 * table
                 */
                rules: { ...teacher },
                tableTitle: "",
                visible_table_edit: false,
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
                EditForm: {
                    name: "",
                    region: undefined,
                    date1: undefined,
                    delivery: false,
                    type: [],
                    resource: "",
                    desc: "",
                },
                /**
                 * 查询 过滤 检索 表单
                 */
                filterForm: {
                    keyWord: "",
                },
                advanced: false,
                columns: COLUMNS,
                dataSource: undefined,
                selectedRows: [],
                // 上传excel
                visible_upload_excel: false,
                //////////////////////////////////////////////////////////////////////////////////////////////////////////
                // svg
                ...SVG_LIST,
                //组件传参

                // 请求接口 参数
                info: {
                    page: 1,
                    line: 10,
                    keyWord: "",
                    type: 1,
                },
                // 自定义编辑框
                detail_model_data: {
                    visible: false,
                    type: "Edit",
                    tableTitle: "编辑",
                    columns: COLUMNS,
                    width: 1000,
                    record: {},
                },
                id:{
                    id:''
                },
                pagination: {
                    options: ["10", "20", "50", "100", "1000"],
                    // 总页数
                    pageCount: undefined,
                    // 总行数
                    lineCount: undefined,
                    // 本页行数
                    pageSize: 10,
                    // 页码
                    current: 1,
                    loading: false,
                },
            };
        },
        watch: {
            "pagination.pageSize": {
                handler(val) {
                    console.log("pageSize", val);
                    this.pagination.pageSize = val;
                    this.getList();
                },
                deep: true,
            },
            "pagination.current": {
                handler(val) {
                    this.pagination.current = val;
                    console.log("current", val);
                    this.getList();
                },
                deep: true,
            },
        },
        computed: {
            desc() {
                return this.$t("pageDesc");
            },
        },
        mounted() {
            // console.log(this.rules);
            this.getDetailModalSelectValue();
            this.getList();
        },
        methods: {
            // 读取下拉框数据
            getDetailModalSelectValue() {
                this.columns.forEach(_ => {
                    if (_.selectType && _.selectType === "api") {
                        XHR[`Axios_$$${_.Api}`]({
                            page: 1,
                            line: 1000000,
                        }).then(__ => {
                            _.selects = __.data.info.list;
                        });
                    }
                });
            },
            getList() {
                 this.pagination.loading = true;
                 this.info.page = this.pagination.current;
                 this.info.line = this.pagination.pageSize;
                 XHR.Axios_$$getExpertReviewList(this.info).then(_ => {
                     this.dataSource = _.data.info.list;
                     this.pagination.lineCount = _.data.info.lineCount;
                     this.pagination.pageCount = _.data.info.pageCount;
                     this.pagination.loading = false;
                     this.info.keyWord = this.filterForm.keyWord = "";
                 });
             /*   this.dataSource = [// eslint-disable-line no-unused-vars

                    {
                        "id": '1',
                        "name": '第一组（正高级）_二轮评审',
                        "open": '是',
                        "startime":'2021年11月05日 18时00分00秒',
                        "endtime":'博士研究生',
                        "openp":"是",
                    },


                ];*/
            },
            // 模糊搜索表单操作
            handleSelect() {
                this.info.keyWord = this.filterForm.keyWord;
                this.getList();
            },
            // 切换页面行数
            onShowSizeChange(current, pageSize) {
                console.log(current, pageSize);
                console.log(this.pagination);
            },
            // 模态框返回按钮
            handleDetailModelSubmit({ form, type }) {
                console.log("type:", type);
                console.log("form:", form);
                return this[`handle${type}`](form);
            },
            // 更新
            handleEdit(query) {
                console.log(query);
                // 调用接口
                XHR.Axios_$$addExpertReview({
                    id: query.id,
                    ...query,
                }).then(_ => {
                    this.$refs["DetailModel"].handleCallBack(_.data);
                });
            },
            // 添加
            handleAdd(query) {
                console.log(query);
                // 调用接口
                XHR.Axios_$$addExpertReview({
                    ...query,
                }).then(_ => {
                    this.$refs["DetailModel"].handleCallBack(_.data);
                    console.log(name)
            });
            },
            // 删除
            handleDel() {},
            // 打开弹窗
            opendetailmodal(option, record = {}) {
                // console.log(option, record);
                if (option === "Edit") {
                    this.detail_model_data = {
                        visible: true,
                        tableTitle: `编辑`,
                        userType: this.info.type,
                        width: 800,
                        type: option,
                        columns: this.columns,
                        record: record,
                        listIndex: 0,

                    };
                    console.log(this.detail_model_data);
                } else if (option === "Info") {
                    this.detail_model_data = {
                        visible: true,
                        tableTitle: `用户详情`,
                        userType: this.info.type,
                        width: 1000,
                        type: option,
                        columns: this.columns,
                        record: record,
                    };
                } else if (option === "Add") {
                    this.detail_model_data = {
                        visible: true,
                        tableTitle: `创建（更新）评审`,
                        userType: this.info.type,
                        width: 800,
                        type: option,
                        columns: this.columns,
                        record: record,
                        listIndex: 0,
                    };
                }
            },
            // 删除指定数据
            deleteRecord(record) {
                console.log(record);
                XHR.Axios_$$deleteExpertReview({ id:record.id,}).then(() =>
                    this.getList()
                );
                return this.getList();
            },
            async goto(path, query) {
                await console.log(query);
                this.$router.push({
                    path,
                    query: {
                        expertReviewId: query.id,
                    },
                });
            },
            //导入人员
            importper(id) {
                console.log('aaaaaaaa')
                console.log(id)
                this.$refs.ImportPer.visible=true
                this.id={
                    id:id,
                }

            },
            // 表单操作
            // 导出excel
            exportExcel() {},
            // 上传excel
            showModal() {
                this.visible_upload_excel = true;
            },
            timestampToTime(timestamp) {
                var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + "-";
                var M =
                    (date.getMonth() + 1 < 10
                        ? "0" + (date.getMonth() + 1)
                        : date.getMonth() + 1) + "-";
                var D = date.getDate() + " ";
                var h = date.getHours() + ":";
                var m = date.getMinutes() + ":";
                var s = date.getSeconds();
                return Y + M + D + h + m + s;
            },
            // 工具函数
            /**
             * 重置object
             * 传入 {}
             * 自动重置
             */
            // 需要操作提示调用这个，不需要提示调用ergodic
            resetObj() {
                this.ergodic(this.filterForm);
                const type = "success";
                const message = "重置表单成功!";
                this.$message[type](message).then(() => {});
                this.getList();
            },
            // object 重置为 {}
            // Array  重置为 []
            // string 重置为 ""
            ergodic(obj) {
                for (let key in obj) {
                    if (obj[key] instanceof Array) {
                        obj[key] = [];
                        this.ergodic(obj[key]);
                    } else if (obj[key] instanceof Object) {
                        this.ergodic(obj[key]);
                    } else {
                        obj[key] = "";
                    }
                }
            },
            /**
             * Table
             */
            // 提交 编辑table 表单
            handleOk(e) {
                console.log(e);
                this.visible_upload_excel = false;
            },
            handleChange(info) {
                const status = info.file.status;
                if (status !== "uploading") {
                    console.log(info.file, info.fileList);
                }
                if (status === "done") {
                    this.$message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === "error") {
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            },
            toggleAdvanced() {
                this.advanced = !this.advanced;
            },
            remove() {
                this.dataSource = this.dataSource.filter(
                    item => this.selectedRows.findIndex(row => row.key === item.key) === -1
                );
                this.selectedRows = [];
            },
            onClear() {
                // this.$message.info("您清空了勾选的所有行");
            },
            onStatusTitleClick() {
                // this.$message.info("你点击了状态栏表头");
            },
            onChange() {
                // this.$message.info("表格状态改变了");
            },
            onSelectChange() {
                // this.$message.info("选中行改变了");
            },
            handleMenuClick(e) {
                if (e.key === "delete") {
                    this.remove();
                }
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
        },
    };
</script>

<style lang="less" scoped>
    .search {
        margin-bottom: 54px;
    }
    .fold {
        width: calc(100% - 216px);
        display: inline-block;
    }
    .operator {
        margin-bottom: 18px;
    }
    @media screen and (max-width: 900px) {
        .fold {
            width: 100%;
        }
    }
</style>
