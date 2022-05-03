import BlankView from "@/layouts/BlankView";

const ExpertReviewOperation = [
    {
        path: "expertReviewOperation",
        name: "专家评审",
        meta: {
            authority: "expert",
        },
        component: BlankView,
        redirect: "expertReviewOperation/expertReviewList",
        children: [
            {
                path: "expertReviewList",
                name: "专家评审",
                meta: {
                    authority: "expert",
                    invisible:true,
                },
                component: () => import("@/pages/expertReviewOperation/expertReviewList/index.vue"),
            },
            {
                path: "expertReviewTeacherList",
                name: "专家评审人员列表",
                meta: {
                    authority: "expert",
                    invisible:true,
                },
                component: () => import("@/pages/expertReviewOperation/expertReviewTeacherList/index.vue"),
            },
            {
                path: "expertReviewTeacherInputInfo-rank",
                name: "专家评审人员填报详情",
                meta: {
                    authority: "expert",
                    invisible:true,
                },
                component: () => import("@/pages/expertReviewOperation/expertReviewTeacherInputInfo/rank/index.vue"),
            },
            {
                path: "expertReviewTeacherInputInfo-appoint",
                name: "专家评审人员填报详情",
                meta: {
                    authority: "expert",
                    invisible:true,
                },
                component: () => import("@/pages/expertReviewOperation/expertReviewTeacherInputInfo/appoint/index.vue"),
            }
        ]
    },
]

export default ExpertReviewOperation
