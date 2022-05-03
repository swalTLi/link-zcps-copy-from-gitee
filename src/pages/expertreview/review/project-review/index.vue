<template>
    <div>
        <div class="navMenu" >
            <div class="line"
                 :class="{select:-1 == selectId}"
                 @click="setSelect(-1),getList(),getTeacherListnavAllMenu()"

            >
                全部
            </div>
            <div class="line"
                 @click="setSelect(null),openEditNavMenuModal('addMenu', {})"
            >
                添加<i class="iconfont icon-jiahao"/>
            </div>
            <div class="line"
                 v-for="navMenu in navMenuList "
                 :key="navMenu.name"
                 :class="{select:navMenu.name == selectId}"
                 @click="setSelect(navMenu.name)"
            >
                <div slot="name"  class="label"  @click="getTeacherListFromNavMenu(navMenu)">
                    {{navMenu.name}}
                </div>
                <div  class="ico">
                    <div class="line_icon">
                        <i class="iconfont icon-bianji" @click="openEditNavMenuModal('EditMenu',navMenu )"/>
                        <a-popconfirm
                                title="确认删除？"
                                ok-text="删除"
                                cancel-text="取消"
                                @confirm="deleteNavMenu(navMenu.id)"
                        >
                            <i class="iconfont icon-shanchu" />
                        </a-popconfirm>

                    </div>
                </div>
            </div>
            <div class="line"
                 :class="{select:-2 == selectId}"
                 @click="setSelect(-2),getTeacherListnavNULLMenu()"
            >未分组
            </div>
        </div>
        <div class="infos">

            <a-card>
                <!--                内容：{{ info }}-->
                <div >
                    <a-row :gutter="16"  style="margin-bottom:10px;">
                        <a-col class="gutter-row" :span="6">
                            <div class="gutter-box">
                                <a-select default-value="移动到分组"
                                          @change="handleChange"
                                >
                                    <a-select-option
                                            v-for="item in navMenuList"
                                            :key="item.id"
                                            :label="item.id"
                                            :value="item.id"
                                    >
                                        <a-popconfirm
                                                title="该操作不可恢复，确定移动到该分组嘛？"
                                                ok-text="确定"
                                                cancel-text="取消"
                                                @confirm="movegroup(item.id)"
                                        >{{item.name}}
                                        </a-popconfirm>
                                    </a-select-option>
                                    <a-select-option value="未分组">
                                        <a-popconfirm
                                                title="该操作不可恢复，确定移动到该分组嘛？"
                                                ok-text="确定"
                                                cancel-text="取消"
                                                @confirm="movengrouped()"
                                        > 未分组
                                        </a-popconfirm>
                                    </a-select-option>
                                </a-select>
                            </div>
                        </a-col>
                        <a-col class="gutter-row" :span="4">
                            <div class="gutter-box">
                                <ImageButton
                                        :src="svg_create"
                                        @click="AddExpert()"
                                        :text="'批量添加评委'"
                                />
                            </div>
                        </a-col>
                        <a-col class="gutter-row" :span="5">
                            <div class="gutter-box">
                                <ImageButton
                                        :src="svg_delete"
                                        @click="DeleteExpert()"
                                        :text="'删除标签内评委'"
                                />
                            </div>
                        </a-col>
                        <a-col class="gutter-row" :span="4">
                            <div class="gutter-box">
                                <ImageButton
                                        :src="svg_registration"
                                        @click="calcula()"
                                        :text="'计算返回结果'"
                                />
                            </div>
                        </a-col>
                        <a-col class="gutter-row" :span="4">
                            <div class="gutter-box">
                                <ImageButton
                                        :src="svg_list"
                                        @click="ViewVoting()"
                                        :text="'查看投票情况'"
                                />
                            </div>
                        </a-col>
                        <a-col class="gutter-row" :span="4">
                            <div class="gutter-box">
                                <ImageButton
                                        :src="svg_excel_upload"
                                        @click="exportExcel()"
                                        :text="'表格导出'"
                                >
<!--                                <a target='_blank'  style="hidden:hidden"/>-->
                                </ImageButton>
                            </div>
                        </a-col>
                    </a-row>
                    <!--        表格-->
                    <a-table :data-source="dataSource"
                             :row-selection="{
                                onChange: onSelectChange ,
                                selectedRowKeys:selectedRowKeys,
                             }"
                             :pagination="false"
                             >
                        <a-table-column key="id" title="标签ID" data-index="id" />
                        <a-table-column key="labelName" title="分组" data-index="labelName" />
                        <a-table-column key="teacherName" title="姓名" data-index="teacherName" />
                        <a-table-column key="teacherSid" title="工号" data-index="teacherSid" />
                        <a-table-column key="secondarySectorName" title="学院" data-index="secondarySectorName" />
                        <a-table-column key="performanceCriteriaTeacherChooseName" title="申请职级" data-index="performanceCriteriaTeacherChooseName" />
<!--                        <a-table-column key="teacherId" title="教师ID" data-index="teacherId" />-->
                        <a-table-column title="评委"  key="expertList" data-index="expertList" >
                            <template slot-scope="experts">
                            <span v-for="expert in experts" :key="expert.id">
                              <div>
                                  <div style="float:left;width:50%;height:50px;">{{expert.sid}}</div>
                                  <div style="float:right;width:50%;height:50px;">
                                         <a-popconfirm
                                                 title="确认删除？"
                                                 ok-text="删除"
                                                 cancel-text="取消"
                                                 @confirm="getExpertsDelete(expert.id)"
                                         >
                                             删除
                                            <i class="iconfont icon-shanchu" />
                                         </a-popconfirm>
                                  </div>
                              </div>
                            </span>
                                <div>
                                    <a style="margin-right: 8px"   @click="AddExpert()">
                                        <a-tag  :color=" 'blue'"
                                        >添加
                                        </a-tag>
                                    </a>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column v-if="this.reviewType==2" key="score" title="评分结果" data-index="score">
                        </a-table-column>
                        <a-table-column v-if="this.reviewType==1" key="agree" title="同意" data-index="agree" />
                        <a-table-column v-if="this.reviewType==1" key="disagree" title="反对" data-index="disagree" />
                        <a-table-column v-if="this.reviewType==1" key="abstention" title="弃权" data-index="abstention" />
                        <a-table-column key="caozuo" title="操作" data-index="caozuo" />
                    </a-table>
<!--                    <a-pagination-->
<!--                            style="right:0px;"-->
<!--                            v-model="pagination.current"-->
<!--                            show-size-changer-->
<!--                            :page-size.sync="pagination.pageSize"-->
<!--                            :total="pagination.lineCount"-->
<!--                            @showSizeChange="onShowSizeChange"-->
<!--                            :page-size-options="pagination.options"-->
<!--                            :defaultPageSize="pagination.pageSize"-->
<!--                            :position="'both'"-->
<!--                    />-->
                    <!--        表格结束-->
                    <div
                            style="display: flex;justify-content: space-between;margin-top: 20px;"
                    >
                    </div>
                </div>
            </a-card>

            <!-- 编辑框 -->
            <div v-if="detail_model_data.visible">
                <detail-model
                        ref="DetailModel"
                        :visible="detail_model_data.visible"
                        :type="detail_model_data.type"
                        :title="detail_model_data.tableTitle"
                        :columns="detail_model_data.columns"
                        :submitCallback="detail_model_data.submitCallback"
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
            <Expert
                    ref="Expert"
                    :secondarySectorNumber="secondarySectorNumber"
                    :importTeacherIdList="selectedid"
                    @getLabelList="getLabelList()"
                    >
            </Expert>
            <ViewVoting  ref="ViewVoting"/>
            <DeleteExpert  ref="DeleteExpert"  @getLabelList="getLabelList()"/>
        </div>
    </div>
</template>
<style scoped>
    @import './index.css';
</style>
<script>
    // import StandardTable from "@/components/table/StandardTable";
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
    import Expert from "@/pages/review/components/Expert";
    import DeleteExpert from "@/pages/review/components/DeleteExpert";
    import ViewVoting from "@/pages/review/components/ViewVoting";
    // 数据配置
    import { COLUMNS } from "./COLUMNS";
    import { COLUMNSE } from "./COLUMNS2";
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
        components: {   DetailModel, Expert ,ImageButton,DeleteExpert,ViewVoting},
        i18n: require("./i18n"),
        data() {
            return {
                reviewType:null,
                rev:[],
                filepath:'',
                visible: false,
                selectId: null,
                activeIndex: 'aa',
                VUE_APP_FILE_URL:'',
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
                columnse: COLUMNSE,
                dataSource: undefined,
                navMenuList: [],
                // selectedRows: [],
                selectedRows: [],
                // 上传excel
                visible_upload_excel: false,
                //////////////////////////////////////////////////////////////////////////////////////////////////////////
                // svg
                ...SVG_LIST,
                // 请求接口 参数
                // info: {
                //     page: 1,
                //     line: 10,
                //     keyWord: "",
                //     type: "zjpdgl",
                // },
                // 自定义编辑框
                detail_model_data: {
                    visible: false,
                    type: "Edit",
                    tableTitle: "编辑",
                    columns: COLUMNS,
                    width: 1000,
                    record: {},
                },
                secondarySectorNumber:'',
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
                selectedRowKeys: [],
                info:[],
                selectedid:[],
                labelId:'',
                labelIds:'',
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
            }
        },
        activated() {
            this.getDetailModalSelectValue();
            this.getList();
            this.getNavList();
            this.start();
        },
        methods: {
            onSelectChange:function(selectedRowKeys, selectedRows) {
                console.log('dataSource changed: ', this.dataSource);
                console.log('selectedRows changed: ', selectedRows);
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys
                let info = []
                // for(let i in selectedRowKeys){mber[i]
                //     info.push(this.dataSource[
                //     let index = selectedRowNuindex].id);
                // }
                for(let i in selectedRows){
                    info.push(selectedRows[i].id);
                    console.log('selectedRows info: ', selectedRows);
                }
                console.log('selectedRows info: ', info);
                this.selectedid=info;
            },

            //清空复选框
            resetSelect:function(selectedRowKeys) {
                this.selectedRowKeys=[],
                console.log('selectedRowKeys info: ', selectedRowKeys);
            },
            onShowSizeChange(current, pageSize) {
                console.log(current, pageSize);
                console.log(this.pagination);
            },
            // selectedRowChange:function(, selectedRows){
            //     this.selectedRowKeys=[],
            //         console.log('selectedRowKeys info: ',  this.selectedRowKeys);
            //     console.log("_________")
            //     console.log(selectedRows);
            //
            // },
            setSelect(id){
                this.selectId = id
            },
            // //导航栏点击方法
            // getSelfInfo(name) {
            //     this.info = '点了' + name
            //
            // },
            //项目评审
            getNavList(){
                XHR.Axios_$$getLabelList({
                    expertReviewId: this.$route.query.expertReviewId,
                }).then(result => {
                    this.navMenuList = result.data.info.list;
                    console.log('la', this.reviewTypes)
                });
            },
            //添加导航栏
            addMenuCallback(query) {
                // handleaddMenu(query) {
                // 调用接口
                XHR.Axios_$$addLabel({
                    name:query.name,
                    expertReviewId:this.$route.query.expertReviewId,
                    maxAgreeVotes:query.maxAgreeVotes,
                    reviewType:query.reviewType,
                    order:query.order,
                }).then(_ => {
                    this.$refs["DetailModel"].handleCallBack(_.data);
                    console.log(name)
                    this.getNavList()
                });
            },
            //编辑导航栏
            EditMenuCallback(query){
                // 调用接口
                XHR.Axios_$$addLabel({
                    id:query.id,
                    name:query.name,
                    expertReviewId:this.$route.query.expertReviewId,
                    maxAgreeVotes:query.maxAgreeVotes,
                    reviewType:query.reviewType,
                    order:query.order,
                }).then(_ => {
                    this.$refs["DetailModel"].handleCallBack(_.data);
                    this.getNavList()
                });
            },
            //删除导航栏
            deleteNavMenu(id){
                XHR.Axios_$$deleteLabel({
                    id:id,
                }).then(() =>
                    this.getNavList()
                );
                return this.getNavList();
            },
            //标签分组
            //全部
            getTeacherListnavAllMenu(){
                XHR.Axios_$$getTeacherList({
                    expertReviewId:this.$route.query.expertReviewId,
                    labelId:null,
                }).then(_ =>
                    this.dataSource = _.data.info.list,
                    this.resetSelect()
                );
            },
            //手动分组
            getTeacherListFromNavMenu(navMenu){
               this.labelId = navMenu.id
               this.reviewType = navMenu.reviewType
                XHR.Axios_$$getTeacherList({
                    expertReviewId:this.$route.query.expertReviewId,
                    labelId:this.labelId ,

                }).then(_ =>
                    this.dataSource = _.data.info.list,
                    this.resetSelect()
                );
            },
            //未分组
            getTeacherListnavNULLMenu(){
                XHR.Axios_$$getTeacherList({
                    expertReviewId:this.$route.query.expertReviewId,
                    labelId:0,
                }).then(_ =>
                    this.dataSource = _.data.info.list,
                    this.resetSelect()
                );
            },

            //移动到分组
            movegroup(mid){
                if(this.selectId==-1){
                    this.labelIds=null
                }else if(this.selectId==-2){
                    this.labelIds=0
                }else{
                    this.labelIds=this.labelId
                }
                XHR.Axios_$$teacherSetLabel({
                    expertReviewId:this.$route.query.expertReviewId,
                    importTeacherIdList:this.selectedid,
                    labelId:mid,
                }).then(() =>
                    this.getLabelList(),
                    this.resetSelect()

                );
            },

            //移动到未分组
            movengrouped(){
                XHR.Axios_$$teacherSetLabel({
                    expertReviewId:this.$route.query.expertReviewId,
                    importTeacherIdList:this.selectedid,
                    labelId:0,
                }).then(() =>
                    this.getList(),
                this.resetSelect()
                );
            },
            //删除专家
            getExpertsDelete(eid){
                let earr=[];
                    earr.push(eid);
                XHR.Axios_$$deleteTeacherExpertRelation({
                    expertReviewId:this.$route.query.expertReviewId,
                    operate:2,
                    importTeacherIdList:this.selectedid,
                    expertIdList:earr,
                }).then(() =>
                    this.getList()
                );
            },

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
            //批量添加评委
            AddExpert(){
                //获取expertReviewId
                //把expertReviewId传给 this.$refs.Expert
                if(this.selectId==-1){
                    this.labelIds=null
                }else if(this.selectId==-2){
                    this.labelIds=0
                }else{
                    this.labelIds=this.labelId
                }
                this.$refs.Expert.expertReviewId = this.$route.query.expertReviewId,
                this.$refs.Expert.labelId = this.labelIds,
                    this.$refs.Expert.visible=true;
            },
            //批量删除评委
            DeleteExpert(){
                if(this.selectId==null){
                    alert("请选择标签")
                }
                else if(this.selectId==-1){
                    alert("请选择标签")
                }else if(this.selectId==-2){
                    alert("请选择标签")
                }else{
                    this.labelIds=this.labelId
                    this.$refs.DeleteExpert.expertReviewId = this.$route.query.expertReviewId,
                    this.$refs.DeleteExpert.labelId = this.labelIds,
                    this.$refs.DeleteExpert.init();
                    this.$refs.DeleteExpert.visible=true;
                }
            },
            // 更新
            handleEdit(query) {
                console.log(query);
                // 调用接口
                XHR.Axios_$$addExpertReview({
                    id: query.id,
                }).then(_ => {
                    this.$refs["DetailModel"].handleCallBack(_.data);
                });
            },
            // 添加
            handleAdd(query) {
                console.log(query);
                // 调用接口
                XHR.Axios_$$addLabel({
                    name:query.name,
                    startTime:query.startTime,
                    endTime:query.endTime,
                    openReview:query.openReview,
                    allowVote:query.allowVote,
                    order:query.order,
                }).then(_ => {
                    this.$refs["DetailModel"].handleCallBack(_.data);
                    console.log(name)

                });
            },
            //计算返回结果
            calcula(){
                if(this.selectId==null){
                    alert("请选择标签")
                }else if(this.selectId==-1){
                    alert("请选择标签")
                }else if(this.selectId==-2){
                    alert("请选择标签")
                }else{
                    this.labelIds=this.labelId
                }
                XHR.Axios_$$calculateLabelResult({
                    labelId:this.labelIds,
                }).then(result => {
                   console.log(result)
                    this.getLabelList()
                });

            },
            //查看投票情况按钮
            ViewVoting(){
                if(this.selectId==null){
                    alert("请选择标签")
                }else if(this.selectId==-1){
                    alert("请选择标签")
                }else if(this.selectId==-2){
                    alert("请选择标签")
                }else{
                    this.labelIds=this.labelId
                    this.$refs.ViewVoting.labelId =  this.labelIds,
                    this.$refs.ViewVoting.visible=true;
                    this.$refs.ViewVoting.init();
                }
            },
            //导出Excel
            exportExcel(){
                if(this.selectId==null){
                    alert("请选择标签")
                }else if(this.selectId==-1){
                    alert("请选择标签")
                }else if(this.selectId==-2){
                    alert("请选择标签")
                }else{
                    this.labelIds=this.labelId
                }
                XHR.Axios_$$outputCalculateLabelResult({
                    labelId:this.labelIds,
                }).then(result => {
                    console.log(result)
                    let filepath = result.data.info.path
                    console.log(filepath)
                    const a = document.createElement('a')
                    a.href = process.env.VUE_APP_FILE_URL+filepath
                    a.style.display = 'none'
                    document.body.appendChild(a)
                    a.click() // 点击下载
                    document.body.removeChild(a)
                });

            },
            getList() {
                this.pagination.loading = true;
                XHR.Axios_$$getTeacherList({
                    page: this.pagination.page,
                    line: this.pagination.pageSize,
                    expertReviewId:this.$route.query.expertReviewId,
                    labelId:null,
                }).then(result => {
                    this.pagination.lineCount = result.data.info.lineCount;
                    this.pagination.pageCount = result.data.info.pageCount;
                    this.pagination.loading = false;
                    this.dataSource = result.data.info.list;
                    this.pagination.loading = false;
                    console.log(this.dataSource );
                    this.selectedRows=false;

                });
            },
            //标签返回
            getLabelList() {
                if(this.selectId==-1){
                    this.labelIds=null
                }else if(this.selectId==-2){
                    this.labelIds=0
                }else{
                    this.labelIds=this.labelId
                }
                XHR.Axios_$$getTeacherList({
                    expertReviewId:this.$route.query.expertReviewId,
                    labelId:this.labelIds,
                }).then(_ => {
                    this.dataSource = _.data.info.list;
                    this.pagination.lineCount = _.data.info.lineCount;
                    this.pagination.pageCount = _.data.info.pageCount;
                    this.pagination.loading = false;
                    console.log(this.dataSource );
                    this.resetSelect();
                    console.log('selectedRows info: ',  this.selectedid);
                });
            },
            // 模糊搜索表单操作
            handleSelect() {
                this.info.keyWord = this.filterForm.keyWord;
                this.getList();
            },
            // 切换页面行数
            // onShowSizeChange(current, pageSize) {
            //     console.log(current, pageSize);
            //     console.log(this.pagination);
            // },
            // 模态框返回按钮
            handleDetailModelSubmit({ form, type,submitCallback }) {
                console.log("type:", type);
                console.log("form:", form);
                // return this[`handle${type}`](form);
                console.log("submitCallback:",submitCallback)
                return this[`${submitCallback}`](form);
            },

            // 删除
            handleDel() {},
            // 打开弹窗
            openEditNavMenuModal(option, record = {}) {
                // console.log(option, record);
                if (option === "Add") {
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
                }else if(option === "addMenu"){
                    this.detail_model_data = {
                        visible: true,
                        tableTitle: `添加标签`,
                        width: 1100,
                        type: 'Add',
                        submitCallback: 'addMenuCallback',
                        columns: this.columnse,
                        record: record,
                        listIndex: 0,
                    };
                }else if(option === "EditMenu"){
                    this.detail_model_data = {
                        visible: true,
                        tableTitle: `添加标签`,
                        width: 1100,
                        type: 'Add',
                        submitCallback: 'EditMenuCallback',
                        columns: this.columnse,
                        record: record,
                        listIndex: 0,
                    };
                }
            },
            // // 删除指定数据
            // deleteRecord(record) {
            //     console.log(record);
            //     XHR.Axios_$$deleteExpertReview({ id:record.id,}).then(() =>
            //         this.getList()
            //     );
            //     return this.getList();
            // },
            // async goto(path, query) {
            //     await console.log(query);
            //     this.$router.push({
            //         path,
            //         query: {
            //             rankReviewId: query.id,
            //         },
            //     });
            // },

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
    .ant-table-tbody > tr > td {
        border: 1px solid #f0f0f0;
    }
    .ant-col-6{
        width: 13%;
    }
    .ant-col-5 {
        width: 17.83333333%;
    }
    #svg-btn[data-v-4f561454] {
        padding: 3.5px 5px;
    }
</style>

