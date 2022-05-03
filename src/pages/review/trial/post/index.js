import XHR from '@/services/interface';
import Cookie from 'js-cookie';

export default {
    data() {
        return {
            Cookie,
            keyWord: undefined,
            pagination: {
                page: 1,
                lineCount: 1,
                pageSize: 10,
                pageSizeOptions: [
                    '10', '20', '30', '40', '50',
                    '60', '70', '80', '90', '100',
                ],
            },
            tableData: [],
            functionExamineType: -1,
            secondarySectorExamineType: -1,
            examineNote: {
                show: false,
                type: 0,
                note: '',
                description: null
            },
            positionAppointmentReviewId: null,
            positionAppointmentId: null,
        };
    },
    async mounted() {
        await this.init()
    },
    async activated() {
        await this.init()
    },
    watch: {
        functionExamineType() {
            this.pagination.page = 1;
            this.getList()
        },
        secondarySectorExamineType() {
            this.pagination.page = 1;
            this.getList()
        }
    },
    methods: {
        init() {
            this.positionAppointmentReviewId = this.$route.query.positionAppointmentReviewId
            this.positionAppointmentId = this.$route.query.positionAppointmentId
            this.getList()
        },
        onShowSizeChange(page, pageSize) {
            this.pagination.page = 1;
            this.pagination.pageSize = pageSize;
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
            let functionExamineType = null
            let secondarySectorExamineType = null
            if (this.functionExamineType != -1) {
                functionExamineType = this.functionExamineType
            }
            if (this.secondarySectorExamineType != -1) {
                secondarySectorExamineType = this.secondarySectorExamineType
            }
            await XHR.Axios_$$positionAppointmentReview_searchTeacherUploadList({
                // page: this.pagination.current,
                page: this.pagination.page,
                line: this.pagination.pageSize,
                positionAppointmentReviewId: this.positionAppointmentReviewId,
                positionAppointmentId: this.positionAppointmentId,
                functionExamineType: functionExamineType,
                secondarySectorExamineType: secondarySectorExamineType,
                keyWord: this.keyWord,
            }).then(async _ => {
                this.pagination.lineCount = _.data.info.lineCount;
                this.dataSource = [];
                this.tableData = [];
                for (let i in _.data.info.list) {
                    let line = _.data.info.list[i];
                    let info = {
                        // index: parseInt(i) + (this.pagination.current - 1) * this.pagination.pageSize,
                        index: parseInt(i) + (this.pagination.page - 1) * this.pagination.pageSize,
                        teacherName: line.teacherName,
                        teacherSid: line.teacherSid,
                        teacherTitle: line.teacherTitle,
                        teacherTitleTime: this.getLocalTime(line.teacherTitleTime),
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
                            teacherInputId: line.teacherInputId,
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
                        info.rowspan++;
                        info.description.push(description)
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
                        info.rowspan++;
                        info.description.push(description)
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
                        info.rowspan++;
                        info.description.push(description)
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
                        info.rowspan++;
                        info.description.push(description)
                    }
                    this.dataSource.push(info);
                }

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
                console.log(this.dataSource)
                console.log(this.tableData)
            });
        },
        test(param, a) {
            console.log(param)
            console.log(a)
        },
        showExamineNote(
            description,
            examineType,
            examineNote = ''
        ) {
            this.examineNote.description = description
            this.examineNote.type = examineType
            this.examineNote.note = examineNote
            this.examineNote.show = true
        },
        setExamineTypeFromExamineNote() {
            this.setExamineType(
                this.examineNote.description,
                this.examineNote.type,
                this.examineNote.note,
            )
            this.examineNote.show = false
        },
        async setExamineType(
            description,
            examineType,
            examineNote = ''
        ) {
            console.log(description)
            let param = {
                id: description.teacherInputId,
            }
            if (description.type == 'choose') {
                param.chooseId = description.chooseId
                param.chooseName = description.chooseName
            }
            let userType = Cookie.get('type')
            if (userType == 3) {
                param.functionExamineType = examineType
                param.functionExamineNote = examineNote
            }
            if (userType == 4) {
                param.secondarySectorExamineType = examineType
                param.secondarySectorExamineNote = examineNote
            }
            await XHR.Axios_$$positionAppointmentReview_checkTeacherFill(param)
                .then(async result => {
                    console.log(result)
                })
            this.getList()
        }
    },
};