export const COLUMNSE = [
    {
        title: "序号",
        dataIndex: "id",
        scopedSlots: { customRender: "description" },
        colSpan: 0,
        customRender: value => {
            const obj = {
                children: value,
                attrs: {
                    colSpan: 0,
                },
            };
            return obj;
        },
        ellipsis: false,

        formType: "ldq-input",
        // 查看详情时是否显示
        info_show: true,

        edit_show: true,

        is_Editable: false,

        add_show: false,
    },
    {
        title: "标签名称",
        dataIndex: "name",
        scopedSlots: { customRender: "name" },
        ellipsis: false,
        formType: "ldq-input",
        info_show: true,
        // 是否在编辑页展示
        edit_show:  true,
        is_Editable: true,
        add_show: true,
        rule: [
            {
                required: true,
                message: "标签名称",
                trigger: "change",
            },
        ],
        placeholder: "标签名称",
    },
    {
        title: "评审类型",
        dataIndex: "reviewType",
        scopedSlots: { customRender: "reviewType" },
        ellipsis: false,

        formType: "ldq-radio",
        info_show: true,
        edit_show: true,
        add_show: true,
        is_Editable: true,
        rule: [
            {
                required: true,
                message: "评审类型",
                trigger: "change",
            },
        ],
        placeholder: "评审类型",
        radios: [
            {
                label: "投票",
                value: 1,
            },
            {
                label: "评分",
                value: 2,
            },
        ],
    },
    {
        title: "最大同意票数或最高评分",
        dataIndex: "maxAgreeVotes",
        scopedSlots: { customRender: "maxAgreeVotes" },
        ellipsis: false,
        formType: "ldq-input",
        info_show: true,
        // 是否在编辑页展示
        edit_show:  true,
        is_Editable: true,
        add_show: true,
        rule: [
            {
                required: true,
                message: "最大同意票数或最高评分",
                trigger: "change",
            },
        ],
        placeholder: "最大同意票数或最高评分",
    },
    {
        title: "显示顺序",
        dataIndex: "order",
        scopedSlots: { customRender: "order" },

        ellipsis: false,

        formType: "ldq-input",
        info_show: true,
        edit_show: true,
        add_show: true,
        is_Editable: true,
        rule: [
            {
                required: true,
                message: "请填写序号",
                trigger: "blur",
            },
        ],
        placeholder: "请填写序号",
    },
]
