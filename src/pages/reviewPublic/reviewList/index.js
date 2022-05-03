import XHR from '@/services/interface';

export default {
    data() {
        return {
            rankReviewList: [],
            appointReviewList: [],
            positionAppointmentReviewList: []
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
            this.getList()
        },
        getList() {
            XHR.Axios_$$rankReview_getRankReviewList().then(result => {
                this.rankReviewList = []
                let list =  result.data.info.list;
                for(let i in list){
                    console.log(list[i])
                    if(list[i].public == 1){
                        this.rankReviewList.push(list[i]);
                    }
                }
            });
            XHR.Axios_$$appointReview_getList().then(result => {
                this.appointReviewList = []
                let list =  result.data.info.list;
                for(let i in list){
                    if(list[i].public == 1){
                        this.appointReviewList.push(list[i]);
                    }
                }
            });
            XHR.Axios_$$positionAppointmentReview_getPositionAppointmentReviewList().then(result => {
                this.positionAppointmentReviewList = []
                let list =  result.data.info.list;
                for(let i in list){
                    if(list[i].public == 1){
                        this.positionAppointmentReviewList.push(list[i]);
                    }
                }
            });
        },
        selectRankReview(reviewId) {
            console.log(reviewId)
            this.$router.push({
                path: "/reviewPublic/rank/teacherList",
                query: {reviewId: reviewId},
            });
        },
        selectAppointReview(reviewId) {
            console.log(reviewId)
            this.$router.push({
                path: "/reviewPublic/appoint/teacherList",
                query: {reviewId: reviewId},
            });
        },
        selectPositionAppointmentReview(reviewId) {
            console.log(reviewId)
            this.$router.push({
                path: "/reviewPublic/positionAppointment/teacherList",
                query: {reviewId: reviewId},
            });
        }
    }
}