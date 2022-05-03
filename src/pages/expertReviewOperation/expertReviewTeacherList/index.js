import XHR from '@/services/interface';

export default {
    data() {
        return {
            expertReviewId: null,
            selectSource: [],
            selectSourcedefault:"",
            selectSourceLabelId:'',
            selectLabelInfo: {
                id: null,
                reviewType: null
            },
            dataSource: [],
            teacherDataSource:[],
            scoreModel: {
                relationId: null,
                show: false,
                score: undefined
            }
        };
    },
    async mounted() {
        await this.init()
    },
    async activated() {
        await this.init()
        console.log()

    },
    watch: {
        selectLabelInfo: {
            deep: true,
            handler() {
                this.getExpertTeacherList()
            },

        }
    },
    methods: {
        async init() {
            this.expertReviewId = this.$route.query.expertReviewId
            await this.getLabelList()
            await this.getdataSource()
        },
        submitVote(relationId, agree, disagree, abstention) {
            XHR.Axios_$$expertVote({
                relationId: relationId,
                labelId: this.selectLabelInfo.id,
                agree: agree,
                disagree: disagree,
                abstention: abstention,
                score: 0,
            }).then(async result => {
                console.log(result)
                if (result.status == 200 && result.data.state == 1) {
                    this.getExpertTeacherList()
                }
            })
        },
        showScoreModel(relationId) {
            this.scoreModel.relationId = relationId
            this.scoreModel.show = true
            this.scoreModel.score = undefined
        },
        async submitScoreModel() {
            await XHR.Axios_$$expertVote({
                relationId: this.scoreModel.relationId,
                labelId: this.selectLabelInfo.id,
                agree: 0,
                disagree: 0,
                abstention: 0,
                score: this.scoreModel.score,
            }).then(async result => {
                console.log(result)
                if (result.status == 200 && result.data.state == 1) {
                    this.getExpertTeacherList()
                    this.scoreModel.show = false
                }
            })

        },
        dateFormat(timestamp, formats) {
            timestamp = timestamp * 1000;
            // formats格式包括
            // 1. Y-m-d
            // 2. Y-m-d H:i:s
            // 3. Y年m月d日
            // 4. Y年m月d日 H时i分
            formats = formats || 'Y-m-d';

            var zero = function (value) {
                if (value < 10) {
                    return '0' + value;
                }
                return value;
            };

            var myDate = timestamp ? new Date(timestamp) : new Date();

            var year = myDate.getFullYear();
            var month = zero(myDate.getMonth() + 1);
            var day = zero(myDate.getDate());

            var hour = zero(myDate.getHours());
            var minite = zero(myDate.getMinutes());
            var second = zero(myDate.getSeconds());

            return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
                return ({
                    Y: year,
                    m: month,
                    d: day,
                    H: hour,
                    i: minite,
                    s: second
                })[matches];
            });
        },
        async onSelectChange(index) {
            this.selectLabelInfo.id = this.selectSource[index].labelId
            this.selectLabelInfo.reviewType = this.selectSource[index].reviewType
            await XHR.Axios_$$expertSearchTeacherList({
                expertReviewId: this.expertReviewId,
                labelId:this.selectLabelInfo.id,
            }).then( async result => {
               console.log(result)
                this.teacherDataSource=result.data.info.list
            })

        },
        async getLabelList() {
            await XHR.Axios_$$expertGetLabelList({
                expertReviewId: this.expertReviewId
            }).then(async result => {
                console.log(result)
                let data = result.data
                let info = data.info
                let list = info.list
                // for (let i in list) {
                //     list[i].startTime = this.getLocalTime(list[i].startTime)
                //     list[i].endTime = this.getLocalTime(list[i].endTime)
                // }
                this.selectSource = list
                this.selectSourcedefault=this.selectSource[0].labelName
            })
        },
        async getdataSource(){
            console.log(this.selectSource)
            for (let i in this.selectSource){
                console.log(i)
                this.selectSourceLabelId=this.selectSource[0].labelId
            }
            await XHR.Axios_$$expertSearchTeacherList({
                expertReviewId: this.expertReviewId,
                labelId:this.selectSourceLabelId,
            }).then( async result => {
                console.log(result)
                this.teacherDataSource=result.data.info.list
                for(let  i in this.teacherDataSource){
                    this.teacherDataSource[0].index=0
                    for(let k=1;k<=this.teacherDataSource.length+1;++k ){
                        i++
                        this.teacherDataSource[i].index =k
                    }
                }
            })
        },
        async getExpertTeacherList() {
            console.log(this.selectLabelInfo.id)
            await XHR.Axios_$$expertSearchTeacherList({
                expertReviewId: this.expertReviewId,
                labelId: this.selectLabelInfo.id,
            }).then(async result => {
                console.log(result)
                let data = result.data
                let info = data.info
                let list = info.list
                for (let i in list) {
                    list[i].index = i
                    if (list[i].sex == 1) {
                        list[i].sex = '男'
                    } else if (list[i].sex == 2) {
                        list[i].sex = '女'
                    } else {
                        list[i].sex = '未设置'
                    }
                    list[i].birthday = this.dateFormat(list[i].birthday, 'Y-m-d')
                    list[i].comeSchoolTime = this.dateFormat(list[i].comeSchoolTime, 'Y-m')
                    list[i].postTime = this.dateFormat(list[i].postTime, 'Y-m')
                }
                this.dataSource = list
            })
        },
        showInputInfo(relationId) {
            for (let i in this.dataSource) {
                if (this.dataSource[i].relationId == relationId) {
                    let param = {
                        expertReviewId: this.expertReviewId,
                        relationId: relationId,
                        teacherId: this.dataSource[i].teacherId,
                        teacherSid: this.dataSource[i].teacherSid,
                        reviewId: this.dataSource[i].reviewId,
                        performanceCriteriaId: this.dataSource[i].performanceCriteriaId,
                    }
                    console.log(this.dataSource[i])
                    console.log(param)
                    if (this.dataSource[i].type == 1) {
                        this.$router.push({
                            path: '/expertReviewOperation/expertReviewTeacherInputInfo-rank',
                            query: param,
                        });
                    }
                    if (this.dataSource[i].type == 2) {
                        this.$router.push({
                            path: '/expertReviewOperation/expertReviewTeacherInputInfo-appoint',
                            query: param,
                        });
                    }

                    return
                }
            }
        },
        getTeacherDay(nS) {
            console.log('ha',nS)
            if (nS) {
                return new Date(parseInt(nS) * 1000)
                    .toLocaleString()
                    .replace(/:\d{1,2}$/, " ")
                    .split(" ")[0];
            } else {
                return "无数据";
            }
        },
        parseInt(){

        }


    }
}
