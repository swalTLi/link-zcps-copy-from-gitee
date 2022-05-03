export const COLUMNS = [
    {
        title: "专家名",
        dataIndex: "expertName",
        scopedSlots: { customRender: "expertName" },


        ellipsis: false,

        formType: "ldq-input",
        // 查看详情时是否显示
        info_show: true,

        edit_show: true,

        is_Editable: true,

        add_show: true,
    },
    {
        title: "用户名",
        dataIndex: "name",
        scopedSlots: { customRender: "name" },


        ellipsis: false,

        formType: "ldq-input",
        // 查看详情时是否显示
        info_show: true,

        edit_show: true,

        is_Editable: true,

        add_show: true,
    },
    {
        title: "操作",
        dataIndex: "caozuo",
        scopedSlots: { customRender: "caozuo" },

        ellipsis: false,

        formType: "ldq-input",
        // 查看详情时是否显示
        info_show: true,

        edit_show: true,

        is_Editable: true,

        add_show: true,
    },
]
