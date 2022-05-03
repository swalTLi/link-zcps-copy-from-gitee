import XHR from '@/services/interface';

export default {
    data() {
        return {
            teacherSid: null,
            appointReviewId: null,
            ruleTeacherChooseName: null,
            dataSource: [],
            teacherInfo: {
                teacherName: null,
                secondarySectorName: null,
                graduationSchool: null,
                graduationProfessional: null,
                graduationTime: null,
                educationName: null,
                postSeriesName: null,
                postGradeName: null,
                postTime: null,
                birthday: null,
                comeSchoolTime: null,
            }
        };
    },
    async mounted() {
        await this.init()
    },
    async activated() {
        await this.init()
    },
    methods: {
        init() {
            this.appointReviewId = this.$route.query.reviewId
            this.teacherSid = this.$route.query.teacherSid
            this.teacherId = this.$route.query.teacherId
            this.getList()
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
        getList() {
            XHR.Axios_$$appointReview_getTeacherApplyInfo({
                sid: this.teacherSid,
                appointReviewId: this.appointReviewId
            }).then(async result => {
                console.log(result)
                let data = result.data
                let info = data.info
                let apply = info.teacherApply
                this.ruleTeacherChooseName = apply.ruleTeacherChooseName
            })
            XHR.Axios_$$getInfo({
                id: this.teacherId,
                type: 2
            }).then(async result => {
                console.log(result)
                let data = result.data
                let info = data.info
                this.teacherInfo.teacherName = info.teacherName
                this.teacherInfo.secondarySectorName = info.secondarySectorName
                this.teacherInfo.graduationSchool = info.graduationSchool
                this.teacherInfo.graduationProfessional = info.graduationProfessional
                this.teacherInfo.graduationTime = this.dateFormat(info.graduationTime, 'Y-m')
                this.teacherInfo.educationName = info.educationName
                this.teacherInfo.postSeriesName = info.postSeriesName
                this.teacherInfo.postGradeName = info.postGradeName
                this.teacherInfo.birthday = this.dateFormat(info.birthday, 'Y-m')
                this.teacherInfo.comeSchoolTime = this.dateFormat(info.comeSchoolTime, 'Y-m')
                this.teacherInfo.postTime = this.dateFormat(info.postTime, 'Y-m')
            })
            XHR.Axios_$$appointReview_teacherInput_getTeacherInputInfo({
                sid: this.teacherSid,
                appointReviewId: this.appointReviewId
            }).then(async result => {
                console.log(result)
                let data = result.data
                let info = data.info
                let list = [info.teacherInput]
                for (let i in list) {
                    if (list[i].fileName != null || list[i].filePath != null) {
                        list[i].file = {
                            fileName: list[i].fileName,
                            filePath: process.env.VUE_APP_FILE_URL + list[i].filePath,
                        }
                    }else{
                        console.log(list[i])
                        list[i].file = null
                    }
                }
                this.dataSource = list
            })
        },
        startOperate(id) {
            this.$router.push({
                path: '/expertReviewOperation/expertReviewTeacherList',
                query: {expertReviewId: id},
            });
            console.log(id)
        }
    }
}