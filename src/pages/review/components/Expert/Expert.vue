<template>
    <div>
        <a-modal
                title="批量添加评委"
                :visible.sync="visible"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <a-select
                    show-search
                    placeholder="请选择评审专家"
                    option-filter-prop="children"
                    style="width: 470px;margin-bottom: 20px;"
                    :filter-option="filterOption"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
            >
                <a-select-option
                        v-for="item in optionsExpert"
                        :key="item.id"
                        :label="item.id"
                        :value="item.id"
                      >
                    {{item.expertName}}
                </a-select-option>
            </a-select>
            <standard-table
                    :columns="columns"
                    :dataSource="dataSource"
                    size="small"
                    style="width: 470px;"
            >
                <div slot="caozuo" slot-scope="{ record }">
                    <div class="line_icon">

                        <a-popconfirm
                                title="确认删除？"
                                ok-text="删除"
                                cancel-text="取消"
                                @confirm="getExpertsDelete(record.id)"
                        >
                            删除
                            <i class="iconfont icon-shanchu" />
                        </a-popconfirm>

                    </div>
               </div>
            </standard-table>
        </a-modal>
    </div>
</template>

<script>
    // 表格配置项
    import { COLUMNS } from "./COLUMNS";
    import StandardTable from "@/components/table/StandardTable";
    import XHR from "@/services/interface";
    import info from "../../teacher/info";

    export default {
        name:"Expert",
        props:[" secondarySectorNumber","importTeacherIdList"],
        components: { StandardTable},
        data() {
            return {
                visible: false,
                selectValue:0,
                expertReviewId:0,
                labelId:'',
                // impoertTeacherIdList:[],
                optionsExpert:[],
                dataSource:[],
                columns:COLUMNS,
                info:[],
            };
        },
        methods: {
            handleOk(e) { // eslint-disable-line no-unused-vars
                let expertIdList=[];
                for(let i in this.dataSource){
                    expertIdList.push(this.dataSource[i].id)
                }
                XHR.Axios_$$addTeacherExpertRelation({
                    expertReviewId:this.expertReviewId,
                    labelId:this.labelId,
                    operate:2,
                    expertIdList:expertIdList,
                    importTeacherIdList:this.importTeacherIdList,
                }).then(_ => {
                    console.log(_)
                    this.$emit("getLabelList");
                    this. visible = false;
                    this.dataSource=[]
                });
                // this.$emit("getExpertsDelete",expertIdList)
            },
            handleCancel(e) { // eslint-disable-line no-unused-vars
                console.log('Clicked cancel button');
                this.visible = false;
            },
            handleChange(value) {
                let info = null;
                // let info2 = [];
                // var x=0
                for(let i in this.optionsExpert ){
                    if(this.optionsExpert[i].id==value){
                        info = this.optionsExpert[i]
                        break
                    }
                }
                this.dataSource.push(info)
            },
            handleBlur() {
                console.log('blur');
            },
            handleFocus() {
                console.log('focus');
            },
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
            },
            getExpertsDelete(eid){
                this.dataSource.pop(eid)
            },
            //下拉框获取数据
            SelectionReview(){

                XHR.Axios_$$getUserList({
                    page:this.selectValue,
                    line:1000,
                    type:5,
                    secondarySectorNumber:this.secondarySectorNumber
                }).then(_ => {
                    this.optionsExpert = _.data.info.list;
                    this.info=info
                });



            }
        },
        mounted(){
            this.SelectionReview();
        },
        created() {
            console.log(this.expertReviewId)
        },

    };
</script>

<style scoped>

</style>
