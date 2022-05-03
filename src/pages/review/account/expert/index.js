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
import ImageButton from "@/components/imageBtn";
// 自定义组件
import DetailModel from "@/pages/review/components/detailModel";
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
};
export default {
    name: "AdminFaculty",
    components: { StandardTable, ImageButton, DetailModel },
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
            // 请求接口 参数
            info: {
                page: 1,
                line: 10,
                keyWord: "",
                type: 5,
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
        this.getList();
        this.getDetailModalSelectValue();
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
            XHR.Axios_$$getUserList({
                page: this.pagination.current,
                line: this.pagination.pageSize,
                type:5
            }).then(result => {
                this.pagination.lineCount = result.data.info.lineCount;
                this.pagination.pageCount = result.data.info.pageCount;
                this.pagination.loading = false;
                this.expertDataSource = result.data.info.list;
                this.pagination.loading = false;
                console.log(this.dataSource );
                this.selectedRows=false;

            });
        },
        // 模糊搜索表单操作
        handleSelect() {
            this.info.keyWord = this.filterForm.keyWord;
            this.pagination.current = 1;
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
            XHR.Axios_$$addExpert(query).then(_ => {
                this.$refs["DetailModel"].handleCallBack(_.data);
            });
        },
        // 添加
        handleAdd(query) {
            console.log(query);
            // 调用接口
            XHR.Axios_$$addExpert(query).then(_ => {
                this.$refs["DetailModel"].handleCallBack(_.data);
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
                };
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
                    tableTitle: `添加账号`,
                    width: 1000,
                    type: option,
                    columns: this.columns,
                    record: record,
                };
            }
        },
        // 删除指定数据
        deleteRecord(record) {
            XHR.Axios_$$deleteUser({ ...record, type: 5 }).then(() => this.getList());
            return this.getList();
            // this.dataSource = this.dataSource.filter(item => item.key !== key);
            // this.selectedRows = this.selectedRows.filter(item => item.key !== key);
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
    },
};
