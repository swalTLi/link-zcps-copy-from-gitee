import XHR from '@/services/interface';

export default {
    data() {
        return {
            selectSource: [],
            tableSource: [],
            reviewId: null,
            ruleId: null,
            pagination: {
                page: 1,
                lineCount: 1,
                pageSize: 20,
                pageSizeOptions: [
                    '10', '20', '30', '40', '50',
                    '60', '70', '80', '90', '100',
                ],
            }
        };
    },
    async mounted() {
        this.init()
    },
    async activated() {
        this.init()
    },
    methods: {
        init() {
            this.reviewId = this.$route.query.reviewId
            this.getList()
        },
        getList() {
            XHR.Axios_$$appointReview_rule_searchList({
                page: 1,
                line: 100
            }).then(result => {
                this.selectSource = result.data.info.list;
            });
        },
        onChangeSelect(ruleId) {
            this.ruleId = ruleId;
            this.pagination.page = 1;
            this.getTeacherList()
        },
        onShowSizeChange(page, pageSize) {
            this.pagination.page = 1;
            this.pagination.pageSize = pageSize;
            this.getTeacherList()
        },
        getTeacherList() {
            if (this.ruleId == null) {
                return
            }
            XHR.Axios_$$appointReview_searchTeacherApplyList({
                appointReviewId: this.reviewId,
                ruleId: this.ruleId,
                isCheck: 1,
                page: this.pagination.page,
                line: this.pagination.pageSize
            }).then(result => {
                console.log(result)
                this.pagination.lineCount = result.data.info.lineCount;

                let list = result.data.info.list;
                for (let i in list) {
                    list[i].index = parseInt(i) + (this.pagination.page - 1) * this.pagination.pageSize
                }
                this.tableSource = list;
            });
        },
        showInputInfo(id) {
            for (let i in this.tableSource) {
                let line = this.tableSource[i]
                if (line.id == id) {
                    this.$router.push({
                        path: "/reviewPublic/appoint/inputInfo",
                        query: {
                            reviewId: this.reviewId,
                            teacherId: line.teacherId,
                            teacherSid: line.teacherSid,
                        },
                    });
                    return
                }
            }
        }
    }
}