<template>
    <div>
        <a-modal
                title="投票情况"
                :visible.sync="visible"
                width="600px"
                @cancel="handleCancel"
                footer=""
                :closable = 'closable'
        >
            <a-table :data-source="VoteStatedataSource"    :pagination="false">
                <a-table-column title="专家名"  key="expertName" data-index="expertName" >
                </a-table-column>
                <a-table-column title="投票数量"  key="voteNumber" data-index="voteNumber" >
                </a-table-column>
            </a-table>
            <a-button style="margin-left: 88%;"  @click="handleCancel()">关闭</a-button>
        </a-modal>
    </div>
</template>

<script>
    import XHR from "@/services/interface";
    export default {
        name: "ViewVoting",
        data() {
            return {
                visible: false,
                VoteStatedataSource:[],
                intervalId:null,
                closable: false
            };
        },
        methods: {
            init(){
                this.dataRefreh()
                this.getVoteStateList();
            },
            close(){
                this.clear();
            },
            getVoteStateList() {
                XHR.Axios_$$showVoteState({
                    labelId:this.labelId,
                }).then(result=> {
                    this.VoteStatedataSource = result.data.info.list;
                });
            },
            // handleOk(e) {// eslint-disable-line no-unused-vars
            //     this.close();
            //     this.confirmLoading = true;
            //     setTimeout(() => {
            //         this.visible = false;
            //         this.clear();
            //         this.confirmLoading = false;
            //     }, 2000);
            // },
            handleCancel(e) {// eslint-disable-line no-unused-vars
                console.log('Clicked cancel button');
                this.visible = false;
                this.close();
            },
            //定时器
            dataRefreh() {
                // 计时器正在进行中，退出函数
                if (this.intervalId != null) {
                    return;
                }
                // 计时器为空，操作
                this.intervalId = setInterval(() => {
                    console.log("刷新" + new Date());
                    this.getVoteStateList(); //加载数据函数
                }, 1000);
            },
            // 停止定时器
            clear() {
                clearInterval(this.intervalId); //清除计时器
                this.intervalId = null; //设置为null
            },

        },
        // created(){
        //     // alert(1)
        //   this.getVoteStateList();
        // },
        // destroyed(){
        //     // 在页面销毁后，清除计时器
        //     this.clear();
        // }

    };
</script>

<style scoped>

</style>
