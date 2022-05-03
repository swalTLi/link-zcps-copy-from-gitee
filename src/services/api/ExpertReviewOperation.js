import Cookie from "js-cookie";
import {request, METHOD} from  '@/utils/request';

const token = process.env.VUE_APP_Authorization.toString();

const ExpertReviewOperation = {
    Axios_$$expertGetReviewList: async query => {
        return request(`expertGetReviewList`, METHOD.POST, {
            token: Cookie.get(token),
            type: Cookie.get('type'),
            info: query,
        });
    },
    Axios_$$expertGetLabelList: async query => {
        return request(`expertGetLabelList`, METHOD.POST, {
            token: Cookie.get(token),
            type: Cookie.get('type'),
            info: query,
        });
    },
    Axios_$$expertSearchTeacherList: async query => {
        return request(`expertSearchTeacherList`, METHOD.POST, {
            token: Cookie.get(token),
            type: Cookie.get('type'),
            info: query,
        });
    },
    Axios_$$expertVote: async query => {
        return request(`expertVote`, METHOD.POST, {
            token: Cookie.get(token),
            type: Cookie.get('type'),
            info: query,
        });
    },
}

export default ExpertReviewOperation