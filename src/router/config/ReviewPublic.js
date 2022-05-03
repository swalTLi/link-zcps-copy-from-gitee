import BlankView from "@/layouts/BlankView";

const ReviewPublic = [
    {
        path: "reviewPublic",
        name: "评审公示",
        // meta: {
        //     authority: ["admin", "teacher"],
        // },
        component: BlankView,
        redirect: "reviewPublic/reviewList",
        children: [
            {
                path: "reviewList",
                name: "评审公示列表",
                meta: {
                    authority: ["admin", "teacher"],
                    invisible: true,
                },
                component: () => import("@/pages/reviewPublic/reviewList/index.vue"),
            },
            {
                path: "appoint/teacherList",
                name: "教师列表",
                meta: {
                    authority: ["admin", "teacher"],
                    invisible: true,
                },
                component: () => import("@/pages/reviewPublic/appoint/teacherList/index.vue"),
            },
            {
                path: "appoint/inputInfo",
                name: "填报信息",
                meta: {
                    authority: ["admin", "teacher"],
                    invisible: true,
                },
                component: () => import("@/pages/reviewPublic/appoint/inputInfo/index.vue"),
            },
            {
                path: "rank/teacherList",
                name: "教师列表",
                meta: {
                    authority: ["admin", "teacher"],
                    invisible: true,
                },
                component: () => import("@/pages/reviewPublic/rank/teacherList/index.vue"),
            },
            {
                path: "rank/inputInfo",
                name: "填报信息",
                meta: {
                    authority: ["admin", "teacher"],
                    invisible: true,
                },
                component: () => import("@/pages/reviewPublic/rank/inputInfo/index.vue"),
            },
            {
                path: "positionAppointment/teacherList",
                name: "教师列表",
                meta: {
                    authority: ["admin", "teacher"],
                    invisible: true,
                },
                component: () => import("@/pages/reviewPublic/positionAppointment/teacherList/index.vue"),
            },
            {
                path: "positionAppointment/inputInfo",
                name: "填报信息",
                meta: {
                    authority: ["admin", "teacher"],
                    invisible: true,
                },
                component: () => import("@/pages/reviewPublic/positionAppointment/inputInfo/index.vue"),
            },
        ]
    },
]

export default ReviewPublic
