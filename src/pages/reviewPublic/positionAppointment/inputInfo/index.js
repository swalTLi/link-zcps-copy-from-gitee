import XHR from '@/services/interface';
import Cookie from "js-cookie";

export default {
    data() {
        return {
            teacherSid: null,
            positionAppointmentReviewId: null,
            positionAppointmentId: null,
            positionAppointmentTeacherChooseName: null,
            dataSource: [],
            tableData: [],
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
            },
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
            this.positionAppointmentReviewId = this.$route.query.reviewId
            this.teacherSid = this.$route.query.teacherSid
            this.teacherId = this.$route.query.teacherId
            this.positionAppointmentId = this.$route.query.positionAppointmentId
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
        getList() {
            // let isSelfUser = false
            // if (this.teacherSid == Cookie.get('name')) {
            //     isSelfUser = true
            // }
            let isShowAll = false;
            if (
                (this.teacherSid == Cookie.get('name') && 2 == Cookie.get('type'))
                || 1 == Cookie.get('type')
            ) {
                isShowAll = true
            }
            // XHR.Axios_$$positionAppointment_apply_getInfo({
            //     sid: this.teacherSid,
            //     id: this.teacherId,
            //     positionAppointmentReviewId: this.positionAppointmentReviewId
            // }).then(async result => {
            //     console.log(result)
            //     let data = result.data
            //     let info = data.info
            //     let apply = info.teacherApply
            //     this.positionAppointmentTeacherChooseName = apply.positionAppointmentTeacherChooseName
            // })
            // XHR.Axios_$$getInfo({
            //     id: this.teacherId,
            //     type: 2
            // }).then(async result => {
            //     console.log(result)
            //     let data = result.data
            //     let info = data.info
            //     this.teacherInfo.teacherName = info.teacherName
            //     this.teacherInfo.secondarySectorName = info.secondarySectorName
            //     this.teacherInfo.graduationSchool = info.graduationSchool
            //     this.teacherInfo.graduationProfessional = info.graduationProfessional
            //     this.teacherInfo.graduationTime = this.dateFormat(info.graduationTime, 'Y-m')
            //     this.teacherInfo.educationName = info.educationName
            //     this.teacherInfo.postSeriesName = info.postSeriesName
            //     this.teacherInfo.postGradeName = info.postGradeName
            //     this.teacherInfo.birthday = this.dateFormat(info.birthday, 'Y-m')
            //     this.teacherInfo.comeSchoolTime = this.dateFormat(info.comeSchoolTime, 'Y-m')
            //     this.teacherInfo.postTime = this.dateFormat(info.postTime, 'Y-m')
            // })
            XHR.Axios_$$positionAppointment_teacherInput_searchList({
                teacherId: this.teacherId,
                positionAppointmentReviewId: this.positionAppointmentReviewId,
                positionAppointmentId: this.positionAppointmentId,
                page: 1,
                line: 100
            }).then(async result => {
                console.log(result)
                this.dataSource = [];
                this.tableData = [];
                for (let i in result.data.info.list) {
                    let line = result.data.info.list[i];
                    let info = {
                        index: parseInt(i),
                        serialNumberName: line.serialNumberName,
                        line: line.line,
                        description: [],
                        rowspan: 0,
                    };

                    if (
                        line.description != null
                        || line.fileName != null
                        || line.filePath != null
                    ) {
                        let description = {
                            teacherInputId: line.id,
                            type: 'description',
                            description: null,
                            file: null,
                            secondarySectorExamineNote: '-',
                            functionExamineNote: '-',
                        }
                        if (line.description != null) {
                            description.description = line.description
                        }
                        if (line.fileName != null || line.filePath != null) {
                            description.file = {
                                fileName: line.fileName,
                                filePath: process.env.VUE_APP_FILE_URL + line.filePath,
                            }
                        }
                        description.secondarySectorExamineType = line.secondarySectorExamineType
                        if (line.secondarySectorExamineType == 0) {
                            description.secondarySectorExamineNote = '未审核'
                        } else {
                            description.secondarySectorExamineNote = line.secondarySectorExamineNote
                        }
                        description.functionExamineType = line.functionExamineType
                        if (line.functionExamineType == 0) {
                            description.functionExamineNote = '未审核'
                        } else {
                            description.functionExamineNote = line.functionExamineNote
                        }

                        if (
                            isShowAll
                            || (line.secondarySectorExamineType == 1 && line.functionExamineType == 1)
                        ) {
                            info.rowspan++;
                            info.description.push(description)
                        }

                        // info.rowspan++;
                        // info.description.push(description)

                    }
                    for (let chooseIndex in line.chooseResearch) {
                        let choose = line.chooseResearch[chooseIndex]
                        let description = {
                            type: 'choose',
                            chooseName: 'research',
                            teacherInputId: line.teacherInputId,
                            chooseId: choose.id,
                            name: choose.name,
                            time: this.getLocalTime(choose.time),
                            level: "-",
                            source: "-",
                            money: "-",
                        }
                        if ("level" in choose) {
                            description.level = choose.level
                        }
                        if ("source" in choose) {
                            description.source = choose.source
                        }
                        if ("money" in choose) {
                            description.money = choose.money
                        }
                        description.secondarySectorExamineType = choose.secondarySectorExamineType
                        if (choose.secondarySectorExamineType == 0) {
                            description.secondarySectorExamineNote = '未审核'
                        } else {
                            description.secondarySectorExamineNote = choose.secondarySectorExamineNote
                        }
                        description.functionExamineType = choose.functionExamineType
                        if (choose.functionExamineType == 0) {
                            description.functionExamineNote = '未审核'
                        } else {
                            description.functionExamineNote = choose.functionExamineNote
                        }
                        if (
                            isShowAll
                            || (choose.secondarySectorExamineType == 1 && choose.functionExamineType == 1)
                        ) {
                            info.rowspan++;
                            info.description.push(description)
                        }
                        // info.rowspan++;
                        // info.description.push(description)
                    }

                    for (let chooseIndex in line.chooseCompetition) {
                        let choose = line.chooseCompetition[chooseIndex]
                        let description = {
                            type: 'choose',
                            chooseName: 'competition',
                            teacherInputId: line.teacherInputId,
                            chooseId: choose.id,
                            name: choose.name,
                            time: this.getLocalTime(choose.time),
                            level: "-",
                            source: "-",
                            money: "-",
                        }
                        if ("level" in choose) {
                            description.level = choose.level
                        }
                        if ("source" in choose) {
                            description.source = choose.source
                        }
                        if ("money" in choose) {
                            description.money = choose.money
                        }
                        description.secondarySectorExamineType = choose.secondarySectorExamineType
                        if (choose.secondarySectorExamineType == 0) {
                            description.secondarySectorExamineNote = '未审核'
                        } else {
                            description.secondarySectorExamineNote = choose.secondarySectorExamineNote
                        }
                        description.functionExamineType = choose.functionExamineType
                        if (choose.functionExamineType == 0) {
                            description.functionExamineNote = '未审核'
                        } else {
                            description.functionExamineNote = choose.functionExamineNote
                        }
                        if (
                            isShowAll
                            || (choose.secondarySectorExamineType == 1 && choose.functionExamineType == 1)
                        ) {
                            info.rowspan++;
                            info.description.push(description)
                        }
                        // info.rowspan++;
                        // info.description.push(description)
                    }

                    for (let chooseIndex in line.chooseProject) {
                        let choose = line.chooseProject[chooseIndex]
                        let description = {
                            type: 'choose',
                            chooseName: 'project',
                            teacherInputId: line.teacherInputId,
                            chooseId: choose.id,
                            name: choose.name,
                            time: this.getLocalTime(choose.time),
                            level: "-",
                            source: "-",
                            money: "-",
                        }
                        if ("level" in choose) {
                            description.level = choose.level
                        }
                        if ("source" in choose) {
                            description.source = choose.source
                        }
                        if ("money" in choose) {
                            description.money = choose.money
                        }
                        description.secondarySectorExamineType = choose.secondarySectorExamineType
                        if (choose.secondarySectorExamineType == 0) {
                            description.secondarySectorExamineNote = '未审核'
                        } else {
                            description.secondarySectorExamineNote = choose.secondarySectorExamineNote
                        }
                        description.functionExamineType = choose.functionExamineType
                        if (choose.functionExamineType == 0) {
                            description.functionExamineNote = '未审核'
                        } else {
                            description.functionExamineNote = choose.functionExamineNote
                        }
                        if (
                            isShowAll
                            || (choose.secondarySectorExamineType == 1 && choose.functionExamineType == 1)
                        ) {
                            info.rowspan++;
                            info.description.push(description)
                        }
                        // info.rowspan++;
                        // info.description.push(description)
                    }
                    this.dataSource.push(info);
                }

                console.log(this.dataSource)
                for (let i in this.dataSource) {
                    let line = this.dataSource[i]
                    let first = true
                    for (let j in this.dataSource[i].description) {
                        let info = {
                            index: line.index,
                            teacherName: line.teacherName,
                            teacherSid: line.teacherSid,
                            teacherTitle: line.teacherTitle,
                            teacherTitleTime: line.teacherTitleTime,
                            serialNumberName: line.serialNumberName,
                            line: line.line,
                            description: {},
                            rowspan: this.dataSource[i].description.length,
                        };
                        let description = this.dataSource[i].description[j];
                        info.description = description
                        if (!first) {
                            info.rowspan = 0
                        } else {
                            first = false
                        }
                        this.tableData.push(info)
                    }
                }
                console.log(this.tableData)

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