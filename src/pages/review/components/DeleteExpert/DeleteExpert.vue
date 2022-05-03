<template>
    <div>
        <a-modal
                title="批量删除评委"
                :visible.sync="visible"
                @cancel="handleCancel"
                footer=""
        >
            <a-table :data-source="dataSource">
                <a-table-column title="专家账户"  key="account" data-index="account" >
                    <template slot-scope="expertsn">
                        <span :key="expertsn">
                      {{expertsn}}
                       </span>
                    </template>
                </a-table-column>
                <a-table-column title="专家名"  key="sid " data-index="sid" >
                    <template slot-scope="experts">
                         <span :key="experts">
                        {{experts}}
                         </span>
                    </template>
                </a-table-column>
                <a-table-column title="操作"  key="id" data-index="id" >
                    <template slot-scope="expertsi">
                        <div class="line_icon">
                            <a-popconfirm
                                    title="确认删除？"
                                    ok-text="删除"
                                    cancel-text="取消"
                                    @confirm="getExpertsDelete(expertsi)"
                            >
                                删除
                                <i class="iconfont icon-shanchu" />
                            </a-popconfirm>
                        </div>
                    </template>
                </a-table-column>
            </a-table>
            <a-button style="margin-left: 88%;"  @click="handleCancel()">关闭</a-button>
        </a-modal>
    </div>
</template>

<script>


    import XHR from "@/services/interface";
    import info from "../../teacher/info";

    export default {
        name:"Expert",
        props:[" secondarySectorNumber","importTeacherIdList"],
        data() {
            return {
                visible: false,
                selectValue:0,
                expertReviewId:0,
                // impoertTeacherIdList:[],
                optionsExpert:[],
                dataSource:[],
                info:[],
                experts:'',
            };
        },
        methods: {
            init(){
                this.getList();
            },
            // handleOk(e) { // eslint-disable-line no-unused-vars
            //     let expertIdList=[];
            //     for(let i in this.dataSource){
            //         expertIdList.push(this.dataSource[i].id)
            //     }
            //     XHR.Axios_$$addTeacherExpertRelation({
            //         expertReviewId:this.expertReviewId,
            //         operate:2,
            //         expertIdList:expertIdList,
            //         importTeacherIdList:this.importTeacherIdList,
            //     }).then(_ => {
            //         console.log(_)
            //         alert("成功")
            //         this.$emit("getList");
            //         this. visible = false;
            //
            //
            //     });
            // },
            getList(){
                XHR.Axios_$$getTeacherList({
                    expertReviewId:this.$route.query.expertReviewId,
                    labelId:this.labelId,
                }).then(_ => {
                    let list = _.data.info.list;
                    let expertInfoList =[];
                    for(let  i in list){
                        let expertList = list[i].expertList
                        for(let  j in expertList){
                            let insert = true
                            for(let m  in expertInfoList ){
                                if(expertInfoList[m].id == expertList[j].id){
                                    insert = false
                                    break
                                }
                            }
                            if(insert){
                                expertInfoList.push(expertList[j])
                            }
                        }
                    }
                    console.log( "expertList",expertInfoList )
                    this.dataSource=expertInfoList
                });
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
                let earr=[];
                earr.push(eid);
                XHR.Axios_$$deleteTeacherExpertRelation({
                    expertReviewId:this.$route.query.expertReviewId,
                    operate:1,
                    labelId:this.labelId,
                    importTeacherIdList:this.importTeacherIdList,
                    expertIdList:earr,
                }).then(() =>
                    // this.dataSource.pop(eid)
                    this.$emit("getLabelList")
                );
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
            this.getList();
        },
        created() {
            console.log(this.expertReviewId)
        },

    };
</script>

<style scoped>

</style>
