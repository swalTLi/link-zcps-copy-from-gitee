import XHR from "@/services/interface";
export default {
    props: ["expertReviewId"],
    data() {
        return {
            visible: false,
            confirmLoading: false,
            optionsRank:[],
            props: ["expertReviewId"],
            option:[],
            reviewId:null,
            type:null,
        };
    },
    methods: {
        handleOk(e) { // eslint-disable-line no-unused-vars
            console.log('s',this.type)
            console.log('-----------------------')
            XHR.Axios_$$importTeacherList({
                reviewId: this.reviewId,
                expertReviewId:this.expertReviewId,
                type:this.type,
            }).then(_ => {
                console.log(_)
                this.$emit("getList");
                this. visible = false;
                console.log("1",this.optionsRank)
                console.log("p", this.optionsPost)
            });
        },
        handleCancel(e) { // eslint-disable-line no-unused-vars
            console.log('Clicked cancel button');
            this.visible = false;
        },
        handleChange(value) {
            console.log(`selected ${value}`);
            this.type=null
            for(let i in  this.optionsRank){
                if(this.optionsRank[i].index==value){
                    let option=this.optionsRank[i].type
                    this.reviewId=this.optionsRank[i].reviewId
                    if(option=="rankReview"){
                        this.type=1
                    }else if(option=="appointReview"){
                        this.type=2
                    }
                }
            }
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
        //下拉框获取数据
        async SelectionReview(){
            let rankReviewList = [];
            await XHR.Axios_$$rankReviewGetRankReviewList({
            }).then(result => {
                rankReviewList = result.data.info.list;
            });
            let appointReviewList = [];
            await XHR.Axios_$$appointReviewGetList({
            }).then(result => {
                appointReviewList = result.data.info.list;
                console.log(this.optionsPost)
                // return this.optionsRank=this.optionsRank.concat( this.optionsPost)
            });
            let selectDataSource = [];
            let index = 0
            for(let i in rankReviewList){
                let info = {
                    index:index++,
                    type:'rankReview',
                    reviewId:rankReviewList[i].id,
                    name:rankReviewList[i].name
                }
                selectDataSource.push(info)
            }
            for(let i in appointReviewList){
                let info = {
                    index:index++,
                    type:'appointReview',
                    reviewId:appointReviewList[i].id,
                    name:appointReviewList[i].name
                }
                selectDataSource.push(info)
            }
            this.optionsRank = selectDataSource
            console.log(selectDataSource)
        }
    },
    mounted(){
        this.SelectionReview();
    },
    created() {
        console.log(this.expertReviewId)
    }
};
