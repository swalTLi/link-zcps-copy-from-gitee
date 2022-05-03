export const COLUMNS = [
    {
        title: "名称",
        dataIndex: "id",
        scopedSlots: { customRender: "id" },


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
        dataIndex: "sid",
        scopedSlots: { customRender: "sid" },


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
