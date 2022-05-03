import XHR from '@/services/interface';

export default {
    data() {
        return {
            dataSource: [],
        };
    },
    async mounted() {
        await this.init()
    },
    // async activated() {
    //     await this.init()
    // },
    methods: {
        init() {
            this.getList()
        },
        getLocalTime(nS) {
            if (nS) {
                return new Date(parseInt(nS) * 1000)
                    .toLocaleString()
                    .replace(/:\d{1,2}$/, ' ')
                    .split(' ')[0];
            } else {
                return '无数据';
            }
        },
        async getList() {
            XHR.Axios_$$expertGetReviewList({}).then(async result => {
                console.log(result)
                let data = result.data
                let info = data.info
                let list = info.list
                for (let i in list) {
                    list[i].startTime = this.getLocalTime(list[i].startTime)
                    list[i].endTime = this.getLocalTime(list[i].endTime)
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