import { request, METHOD, removeAuthorization } from '@/utils/request';
import Cookie from 'js-cookie';
import ExpertReviewOperation from './api/ExpertReviewOperation';

const token = process.env.VUE_APP_Authorization.toString();

// const demo = {
//   Axios_$$demo2: async query => {
//     return request(`demo`, METHOD.POST, {
//       token: Cookie.get(token),
//       type: Cookie.get("type"),
//       info: query,
//     });
//   },
// };
/**
 * @group 账户功能
 */
const account = {
  /**
   * @name 登陆
   * @status @已完成
   */
  Axios_$$login: async query => {
    return request(`login`, METHOD.POST, query);
  },
  /**
   * @name 修改密码
   * @status @已完成
   */
  Axios_$$changePassword: async query => {
    return request(`changePassword`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },

  /**
   * @name 登出
   * @status @已完成
   */
  Axios_$$logout: async query => {
    request(`logout`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
    localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY);
    localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY);
    localStorage.removeItem(process.env.VUE_APP_ROLES_KEY);
    return removeAuthorization();
  },
  /**
   * @name 获取单个用户信息
   * @status @已完成
   */
  Axios_$$getInfo: async query => {
    return request(`getInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 获取用户信息列表
   * @status @已完成
   */
  Axios_$$getUserList: async query => {
    return request(`getUserList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 新增（更新）用户
   * @status @已完成
   */
  Axios_$$addUser: async query => {
    return request(`addUser`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除用户
   * @status @已完成
   */
  Axios_$$deleteUser: async query => {
    return request(`deleteUser`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 新增（更新）管理员
   * @status @已完成
   */
  Axios_$$addAdmin: async query => {
    return request(`addAdmin`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 新增（更新）教师
   * @status @已完成
   */
  Axios_$$addTeacher: async query => {
    return request(`addTeacher`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 新增（更新）职能部门管理员
   * @status @已完成
   */
  Axios_$$addFunctionAdmin: async query => {
    return request(`addFunctionAdmin`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 新增（更新）二级部门管理员
   * @status @已完成
   */
  Axios_$$addSecondarySectorAdmin: async query => {
    return request(`addSecondarySectorAdmin`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};

/**
 * @group 教师填报个人业绩管理
 */

const TeachersPersonalPerformanceManagement = {
  /**
   * @name 教师填报个人业绩
   * @status @已完成
   */
  Axios_$$teacherInputRankReview: async query => {
    return request(`teacherInputRankReview`, METHOD.FILE, query);
  },
  /**
   * @name 删除教师个人业绩
   * @status @已完成
   */
  Axios_$$deleteTeacherInputRankReview: async query => {
    return request(`deleteTeacherInputRankReview`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找教师填报业绩结果列表
   * @status @已完成
   */
  Axios_$$searchTeacherInputRankReviewList: async query => {
    return request(`searchTeacherInputRankReviewList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },

  /**
   * @name 查找单条教师填报业绩结果信息
   * @status @已完成
   */
  Axios_$$searchTeacherInputRankReviewInfo: async query => {
    return request(`searchTeacherInputRankReviewInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 教师上传全部个人业绩结果
   * @status @已完成
   */
  Axios_$$uploadTeacherInputRankReview: async query => {
    return request(`uploadTeacherInputRankReview`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};

/**
 * @group 教师报名职级评定管理
 */
const managementOfTeacherRegistrationRankEvaluation = {
  /**
   * @name 获取教师报名进度查看
   * @status @已完成
   */
  Axios_$$getTeacherApplyRateInfo: async query => {
    return request(`getTeacherApplyRateInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 教师报名职级评定
   * @status @已完成
   */
  Axios_$$teacherRankApply: async query => {
    return request(`teacherRankApply`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除教师职级评定报名
   * @status @已完成
   */
  Axios_$$deleteTeacherRankApply: async query => {
    return request(`deleteTeacherRankApply`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找教师职级评定报名列表
   * @status @已完成
   */
  Axios_$$searchTeacherRankApplyList: async query => {
    return request(`searchTeacherRankApplyList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 获取教师报名信息
   * @status @已完成
   */
  Axios_$$getTeacherApplyInfo: async query => {
    return request(`getTeacherApplyInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 获取职级评定工作量
   * @status @已完成
   */
  Axios_$$gatherTeacherRankWorkload: async query => {
    return request(`gatherTeacherRankWorkload`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name setTeacherRankWorkload
   * @status @已完成
   */
  Axios_$$setTeacherRankWorkload: async query => {
    return request(`setTeacherRankWorkload`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 获取已经提交的职级评定工作量
   * @status @已完成
   */
  Axios_$$getTeacherRankWorkload: async query => {
    return request(`getTeacherRankWorkload`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};

/**
 * @group 第三方数据
 */
const thirdData = {
  /**
   * @name 教学工作量数据分类获取
   * @status @已完成
   */
  Axios_$$thirdPartyData_jxgzl_getDataType: async query => {
    return request(`thirdPartyData/jxgzl/getDataType`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 教学工作量数据操作
   * @status @已完成
   */
  Axios_$$thirdPartyData_jxgzl_data_edit: async query => {
    return request(`thirdPartyData/jxgzl/data/edit`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 教学工作量数据列表查询
   * @status @已完成
   */
  Axios_$$thirdPartyData_jxgzl_data_getList: async query => {
    return request(`thirdPartyData/jxgzl/data/getList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 教学工作量数据上传
   * @status @已完成
   */
  Axios_$$thirdPartyData_jxgzl_upload: async query => {
    return request(`thirdPartyData/jxgzl/upload`, METHOD.FILE, query);
  },
  /**
   * @name 科技处数据分类获取
   * @status @已完成
   */
  Axios_$$thirdPartyData_kjc_getDataType: async query => {
    return request(`thirdPartyData/kjc/getDataType`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 科技处数据操作
   * @status @已完成
   */
  Axios_$$thirdPartyData_kjc_data_edit: async query => {
    return request(`thirdPartyData/kjc/data/edit`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 科技处数据参与者信息操作
   * @status @已完成
   */
  Axios_$$thirdPartyData_kjc_data_author_edit: async query => {
    return request(`thirdPartyData/kjc/data/author/edit`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 科技处数据列表查询
   * @status @已完成
   */
  Axios_$$thirdPartyData_kjc_data_getList: async query => {
    return request(`thirdPartyData/kjc/data/getList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 科技处数据上传
   * @status @已完成
   */
  Axios_$$thirdPartyData_kjc_upload: async query => {
    return request(`thirdPartyData/kjc/upload`, METHOD.FILE, query);
  },
  /**
   * @name 创新学院数据分类获取
   * @status @已完成
   */
  Axios_$$thirdPartyData_cxxy_getDataType: async query => {
    return request(`thirdPartyData/cxxy/getDataType`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 创新学院数据操作
   * @status @已完成
   */
  Axios_$$thirdPartyData_cxxy_data_edit: async query => {
    return request(`thirdPartyData/cxxy/data/edit`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 创新学院数据参与者信息操作
   * @status @已完成
   */
  Axios_$$thirdPartyData_cxxy_data_author_edit: async query => {
    return request(`thirdPartyData/cxxy/data/author/edit`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 创新学院数据列表查询
   * @status @已完成
   */
  Axios_$$thirdPartyData_cxxy_data_getList: async query => {
    return request(`thirdPartyData/cxxy/data/getList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 创新学院数据上传
   * @status @已完成
   */
  Axios_$$thirdPartyData_cxxy_upload: async query => {
    return request(`thirdPartyData/cxxy/upload`, METHOD.FILE, query);
  },
  /**
   * @name 教务处数据分类获取
   * @status @已完成
   */
  Axios_$$thirdPartyData_jwc_getDataType: async query => {
    return request(`thirdPartyData/jwc/getDataType`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 教务处数据操作
   * @status @已完成
   */
  Axios_$$thirdPartyData_jwc_data_edit: async query => {
    return request(`thirdPartyData/jwc/data/edit`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 教务处数据参与者信息操作
   * @status @已完成
   */
  Axios_$$thirdPartyData_jwc_data_author_edit: async query => {
    return request(`thirdPartyData/jwc/data/author/edit`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 教务处数据列表查询
   * @status @已完成
   */
  Axios_$$thirdPartyData_jwc_data_getList: async query => {
    return request(`thirdPartyData/jwc/data/getList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 教务处处数据上传
   * @status @已完成
   */
  Axios_$$thirdPartyData_jwc_upload: async query => {
    return request(`thirdPartyData/jwc/upload`, METHOD.FILE, query);
  },
};

/**
 * @group 第三方数据附加
 */
const thirdPartyDataAttachment = {
  /**
   * @name 根据类型和等级查找科技处第三方数据
   * @status @已完成
   */
  Axios_$$searchKjcDataByTypeLevel: async query => {
    return request(`searchKjcDataByTypeLevel`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 根据类型和等级查找创新学院第三方数据
   * @status @已完成
   */
  Axios_$$searchCxxyDateByTypeLevel: async query => {
    return request(`searchCxxyDateByTypeLevel`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 根据类型和等级查找教务处第三方数据
   * @status @已完成
   */
  Axios_$$searchJwcDateByTypeLevel: async query => {
    return request(`searchJwcDateByTypeLevel`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找创新学院类型和等级
   * @status @已完成
   */
  Axios_$$searchCxxyDataInfo: async query => {
    return request(`searchCxxyDataInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找科技处数据类型和等级
   * @status @已完成
   */
  Axios_$$searchKjcDataInfo: async query => {
    return request(`searchKjcDataInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找教务处数据类型和等级
   * @status @已完成
   */
  Axios_$$searchJwcDataInfo: async query => {
    return request(`searchJwcDataInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};

/**
 * @group 部门管理
 */
const functions = {
  /**
   * @name 查找职能部门信息列表
   * @status @已完成
   */
  Axios_$$searchFunctionDepartmentList: async query => {
    return request(`searchFunctionDepartmentList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 新增（更新）职能部门
   * @status @已完成
   * @param
      "info": {
          'id': '1', //更新时传入
          'name': 'asdsa',
      }
   */
  Axios_$$addFunctionDepartment: async query => {
    return request(`addFunctionDepartment`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除职能部门
   * @status @已完成
   * @param
      "info": {
          'id': '1',
      }
   */
  Axios_$$deleteFunctionDepartment: async query => {
    return request(`deleteFunctionDepartment`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找单条职能部门
   * @status @已完成
   * @param
      "info": {
          'id': '1',
      }
   */
  Axios_$$searchFunctionDepartmentInfo: async query => {
    return request(`searchFunctionDepartmentInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },

  /**
   * @name 查找二级部门信息列表
   * @status @已完成
   */
  Axios_$$searchSecondarySectorDepartmentList: async query => {
    return request(`searchSecondarySectorDepartmentList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 新增（更新）二级部门
   * @status @已完成
   */
  Axios_$$addSecondarySectorDepartment: async query => {
    return request(`addSecondarySectorDepartment`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除二级部门
   * @status @已完成
   */
  Axios_$$deleteSecondarySectorDepartment: async query => {
    return request(`deleteSecondarySectorDepartment`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },

  /**
   * @name 查找单条二级部门
   * @status @已完成
   */
  Axios_$$searchSecondarySectorDepartmentInfo: async query => {
    return request(`searchSecondarySectorDepartmentInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};

/**
 * @group 教师岗位信息管理
 */
const TeacherPostInformationManagement = {
  /**
   * @name 查找学历列表
   * @status @已完成
   */
  Axios_$$searchEducationList: async query => {
    return request(`searchEducationList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 新增（更新）职称
   * @status @已完成
   */
  Axios_$$addTitle: async query => {
    return request(`addTitle`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找职称列表
   * @status @已完成
   */
  Axios_$$searchTitleList: async query => {
    return request(`searchTitleList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除职称
   * @status @已完成
   */
  Axios_$$deleteTitle: async query => {
    return request(`deleteTitle`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找岗位列表
   * @status @已完成
   */
  Axios_$$searchJobList: async query => {
    return request(`searchJobList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 新增（更新）岗位
   * @status @已完成
   */
  Axios_$$addjob: async query => {
    return request(`addjob`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除岗位
   * @status @已完成
   */
  Axios_$$deletejob: async query => {
    return request(`deletejob`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找岗位系列列表
   * @status @已完成
   */
  Axios_$$searchPostSeriesList: async query => {
    return request(`searchPostSeriesList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 新增（更新）岗位系列
   * @status @已完成
   */
  Axios_$$addPostSeries: async query => {
    return request(`addPostSeries`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除岗位系列
   * @status @已完成
   */
  Axios_$$deletePostSeries: async query => {
    return request(`deletePostSeries`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找岗位等级列表
   * @status @已完成
   */
  Axios_$$searchPostGradeList: async query => {
    return request(`searchPostGradeList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 新增（更新）岗位等级
   * @status @已完成
   */
  Axios_$$addPostGrade: async query => {
    return request(`addPostGrade`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除岗位等级
   * @status @已完成
   */
  Axios_$$deletePostGrade: async query => {
    return request(`deletePostGrade`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找岗位类型列表
   * @status @已完成
   */
  Axios_$$searchPostTypeList: async query => {
    return request(`searchPostTypeList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 新增（更新）岗位类型
   * @status @已完成
   */
  Axios_$$addPostType: async query => {
    return request(`addPostType`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除岗位类型
   * @status @已完成
   */
  Axios_$$deletePostType: async query => {
    return request(`deletePostType`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};

/**
 * @group 业绩条件和业绩条件序号管理
 */
const performance1 = {
  /**
   * @name 新建（更新）业绩条件
   * @status @已完成
   */
  Axios_$$addPerformanceCriteria: async query => {
    return request(`addPerformanceCriteria`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除业绩条件
   * @status @已完成
   */
  Axios_$$deletePerformanceCriteria: async query => {
    return request(`deletePerformanceCriteria`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找业绩条件列表
   * @status @已完成
   */
  Axios_$$searchPerformanceCriteriaList: async query => {
    return request(`searchPerformanceCriteriaList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 新建（更新）具体要求序号
   * @status @已完成
   */
  Axios_$$addRequireInfoSerialNumber: async query => {
    return request(`addRequireInfoSerialNumber`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找具体要求序号列表
   * @status @已完成
   */
  Axios_$$searchRequireInfoSerialNumberList: async query => {
    return request(`searchRequireInfoSerialNumberList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },

  /**
   * @name 删除具体要求序号
   * @status @已完成
   */
  Axios_$$deleteRequireInfoSerialNumber: async query => {
    return request(`deleteRequireInfoSerialNumber`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};
/**
 * @group 业绩条件工作量要求
 */
const PerformanceConditionsAndWorkloadRequirements = {
  /**
   * @name 创建与修改业绩条件工作量要求
   * @status @已完成
   */
  Axios_$$performanceCriteria_editWorkloadRequire: async query => {
    return request(`performanceCriteria/editWorkloadRequire`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除业绩条件工作量要求
   * @status @已完成
   */
  Axios_$$performanceCriteria_deleteWorkloadRequire: async query => {
    return request(`performanceCriteria/deleteWorkloadRequire`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 获取业绩条件工作量要求
   * @status @已完成
   */
  Axios_$$performanceCriteria_searchWorkloadRequire: async query => {
    return request(`performanceCriteria/searchWorkloadRequire`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};
/**
 * @group 业绩条件详情管理
 */
const performance2 = {
  /**
   * @name 新建（更新）具体要求
   * @status @已完成
   */
  Axios_$$addRequireInfo: async query => {
    return request(`addRequireInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 根据查找一级具体条件下的二级具体条件列表
   * @status @已完成
   */
  Axios_$$searchRequireLevelTwoList: async query => {
    return request(`searchRequireLevelTwoList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 根据具体条件序号（和教师类型）查找具体要求列表
   * @status @已完成
   */
  Axios_$$searchPerformanceRequireInfoList: async query => {
    return request(`searchPerformanceRequireInfoList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找业绩条件下具体要求列表
   * @status @已完成
   */
  Axios_$$searchPerformanceRequireList: async query => {
    return request(`searchPerformanceRequireList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找单条具体要求详情
   * @status @已完成
   */
  Axios_$$searchSinglePerformanceRequireInfo: async query => {
    return request(`searchSinglePerformanceRequireInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除具体要求
   * @status @已完成
   */
  Axios_$$deletePerformanceRequire: async query => {
    return request(`deletePerformanceRequire`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};
/**
 * 业绩条件具体要求
 */
const performance3 = {
  /**
   * @name 新建（更新）条件要求
   * @status @已完成
   */
  Axios_$$addPerformanceCriteriaCondition: async query => {
    return request(`addPerformanceCriteriaCondition`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找条件要求列表
   * @status @已完成
   */
  Axios_$$searchPerformanceCriteriaConditionList: async query => {
    return request(`searchPerformanceCriteriaConditionList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除条件要求
   * @status @已完成
   */
  Axios_$$deletePerformanceCriteriaCondition: async query => {
    return request(`deletePerformanceCriteriaCondition`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};
/**
 * 业绩条件报名要求
 */
const performance4 = {
  /**
   * @name 创建与修改报名条件
   * @status @已完成
   */
  Axios_$$performanceCriteria_editRegisterRequirement: async query => {
    return request(`performanceCriteria/editRegisterRequirement`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除报名条件
   * @status @已完成
   */
  Axios_$$performanceCriteria_deleteRegisterRequirement: async query => {
    return request(
      `performanceCriteria/deleteRegisterRequirement`,
      METHOD.POST,
      {
        token: Cookie.get(token),
        type: Cookie.get('type'),
        info: query,
      }
    );
  },
  /**
   * @name 查询报名条件
   * @status @已完成
   */
  Axios_$$performanceCriteria_searchRegisterRequirement: async query => {
    return request(
      `performanceCriteria/searchRegisterRequirement`,
      METHOD.POST,
      {
        token: Cookie.get(token),
        type: Cookie.get('type'),
        info: query,
      }
    );
  },
};
/**
 * @group 职级评定管理
 */
const rankEvaluationManagement = {
  /**
   * @name 职级评定列表获取
   * @status @已完成
   */
  Axios_$$rankReview_getRankReviewList: async query => {
    return request(`rankReview/getRankReviewList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 创建与修改
   * @status @已完成
   */
  Axios_$$rankReview_edit: async query => {
    return request(`rankReview/edit`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除
   * @status @已完成
   */
  Axios_$$rankReview_delete: async query => {
    return request(`rankReview/delete`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 计算
   * @status @已完成
   */
  Axios_$$calculateRankResul: async query => {
    return request(`calculateRankResult`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};

/**
 * @group 岗位评聘管理
 */
const postEvaluationAndEmploymentManagement = {
  /**
   * @name 岗位评聘-创建与修改
   * @status @已完成
   */
  Axios_$$appointReview_add: async query => {
    return request(`appointReview/add`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位聘任-获取教师报名进度查看
   * @status @已完成
   */
  Axios_$$appointReview_getTeacherApplyRateInfo: async query => {
    return request(`appointReview/getTeacherApplyRateInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位评聘-删除
   * @status @已完成
   */
  Axios_$$appointReview_delete: async query => {
    return request(`appointReview/delete`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位评聘列表获取
   * @status @已完成
   */
  Axios_$$appointReview_getList: async query => {
    return request(`appointReview/getList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位评聘-晋级规则-创建与修改
   * @status @已完成
   */
  Axios_$$appointReview_rule_add: async query => {
    return request(`appointReview/rule/add`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位评聘-晋级规则-删除
   * @status @已完成
   */
  Axios_$$appointReview_rule_delete: async query => {
    return request(`appointReview/rule/delete`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位评聘-晋级规则-列表检索
   * @status @已完成
   */
  Axios_$$appointReview_rule_searchList: async query => {
    return request(`appointReview/rule/searchList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位评聘-晋级规则-报名条件-创建与修改
   * @status @已完成
   */
  Axios_$$appointReview_registerRequirement_add: async query => {
    return request(`appointReview/registerRequirement/add`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位评聘-晋级规则-报名条件-删除
   * @status @已完成
   */
  Axios_$$appointReview_registerRequirement_delete: async query => {
    return request(`appointReview/registerRequirement/delete`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位评聘-晋级规则-报名条件-查询
   * @status @已完成
   */
  Axios_$$appointReview_registerRequirement_getInfo: async query => {
    return request(`appointReview/registerRequirement/getInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位评聘-教师报名
   * @status @已完成
   */
  Axios_$$appointReview_teacherApply: async query => {
    return request(`appointReview/teacherApply`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位评聘-删除教师报名
   * @status @已完成
   */
  Axios_$$appointReview_deleteTeacherApply: async query => {
    return request(`appointReview/deleteTeacherApply`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位评聘-查看报名教师列表
   * @status @已完成
   */
  Axios_$$appointReview_searchTeacherApplyList: async query => {
    return request(`appointReview/searchTeacherApplyList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位评聘-获取教师报名信息
   * @status @已完成
   */
  Axios_$$appointReview_getTeacherApplyInfo: async query => {
    return request(`appointReview/getTeacherApplyInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位评聘-填报个人业绩
   * @status @已完成
   */
  Axios_$$appointReview_teacherInput_create: async query => {
    return request(`appointReview/teacherInput/create`, METHOD.FILE, query);
  },
  /**
   * @name 岗位评聘-删除填报的个人业绩
   * @status @已完成
   */
  Axios_$$appointReview_teacherInput_delete: async query => {
    return request(`appointReview/teacherInput/delete`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位评聘-获取教师填报个人业绩
   * @status @已完成
   */
  Axios_$$appointReview_teacherInput_getTeacherInputInfo: async query => {
    return request(
      `appointReview/teacherInput/getTeacherInputInfo`,
      METHOD.POST,
      {
        token: Cookie.get(token),
        type: Cookie.get('type'),
        info: query,
      }
    );
  },
  /**
   * @name 岗位评聘-提交个人填报信息
   * @status @已完成
   */
  Axios_$$appointReview_teacherInput_upload: async query => {
    return request(`appointReview/teacherInput/upload`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};

/**
 * @group 岗位聘任管理
 */
const PostAppointmentManagement = {
  /**
   * @name 岗位聘任-创建与修改
   * @status @已完成
   */
  Axios_$$positionAppointmentReview_edit: async query => {
    return request(`positionAppointmentReview/edit`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位聘任-删除
   * @status @已完成
   */
  Axios_$$positionAppointmentReview_delete: async query => {
    return request(`positionAppointmentReview/delete`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 岗位聘任列表获取
   * @status @已完成
   */
  Axios_$$positionAppointmentReview_getPositionAppointmentReviewList: async query => {
    return request(
      `positionAppointmentReview/getPositionAppointmentReviewList`,
      METHOD.POST,
      {
        token: Cookie.get(token),
        type: Cookie.get('type'),
        info: query,
      }
    );
  },
};

/**
 * @group 岗位聘任条件和序号管理
 */
const PostAppointmentConditionsAndSerialNumberManagement = {
  /**
   * @name 新建（更新）岗位聘任条件
   * @status @已完成
   */
  Axios_$$positionAppointment_edit: async query => {
    return request(`positionAppointment/edit`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除岗位聘任条件
   * @status @已完成
   */
  Axios_$$positionAppointment_delete: async query => {
    return request(`positionAppointment/delete`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找岗位聘任条件列表
   * @status @已完成
   */
  Axios_$$positionAppointment_searchList: async query => {
    return request(`positionAppointment/searchList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 新建（更新）岗位聘任具体要求序号
   * @status @已完成
   */
  Axios_$$positionAppointment_serialNumber_edit: async query => {
    return request(`positionAppointment/serialNumber/edit`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除岗位聘任具体要求序号
   * @status @已完成
   */
  Axios_$$positionAppointment_serialNumber_delete: async query => {
    return request(`positionAppointment/serialNumber/delete`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找岗位聘任具体要求序号列表
   * @status @已完成
   */
  Axios_$$positionAppointment_serialNumber_searchList: async query => {
    return request(`positionAppointment/serialNumber/searchList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};
/**
 * @group 岗位聘任工作量要求
 */
const WorkloadRequirementsForPostAppointment = {
  /**
   * @name 创建与修改岗位聘任工作量要求
   * @status @已完成
   */
  Axios_$$performanceCriteria_workloadRequire_edit: async query => {
    return request(`performanceCriteria/workloadRequire/edit`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除岗位聘任工作量要求
   * @status @已完成
   */
  Axios_$$performanceCriteria_workloadRequire_delete: async query => {
    return request(`performanceCriteria/workloadRequire/delete`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 获取岗位聘任工作量要求
   * @status @已完成
   */
  Axios_$$performanceCriteria_workloadRequire_getInfo: async query => {
    return request(`performanceCriteria/workloadRequire/getInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};

/**
 * @group 岗位聘任报名条件
 */
const PostAppointmentRegistrationConditions = {
  /**
   * @name 创建与修改报名条件
   * @status @已完成
   */
  Axios_$$positionAppointment_registerRequire_edit: async query => {
    return request(`positionAppointment/registerRequire/edit`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除报名条件
   * @status @已完成
   */
  Axios_$$positionAppointment_registerRequire_delete: async query => {
    return request(`positionAppointment/registerRequire/delete`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 创建与修改报名条件
   * @status @已完成
   */
  Axios_$$positionAppointment_registerRequire_getInfo: async query => {
    return request(`positionAppointment/registerRequire/getInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};

/**
 * @group 岗位聘任条件详情管理
 */
const DemDetailedManagementOfPostEmploymentConditions = {
  /**
   * @name 新建（更新）岗位聘任具体要求
   * @status @已完成
   */
  Axios_$$positionAppointment_require_edit: async query => {
    return request(`positionAppointment/require/edit`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除岗位聘任条件要求
   * @status @已完成
   */
  Axios_$$positionAppointment_require_delete: async query => {
    return request(`positionAppointment/require/delete`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找岗位聘任下具体要求列表
   * @status @已完成
   */
  Axios_$$positionAppointment_require_searchList: async query => {
    return request(`positionAppointment/require/searchList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找单条岗位聘任条件详情
   * @status @已完成
   */
  Axios_$$positionAppointment_require_searchSingleInfo: async query => {
    return request(
      `positionAppointment/require/searchSingleInfo`,
      METHOD.POST,
      {
        token: Cookie.get(token),
        type: Cookie.get('type'),
        info: query,
      }
    );
  },
  /**
   * @name 根据具体条件序号（和教师类型）查找岗位聘任要求列表
   * @status @已完成
   */
  Axios_$$positionAppointment_require_searchListBySerialNumberId: async query => {
    return request(
      `positionAppointment/require/searchListBySerialNumberId`,
      METHOD.POST,
      {
        token: Cookie.get(token),
        type: Cookie.get('type'),
        info: query,
      }
    );
  },
  /**
   * @name 根据一级具体条件id查找二级具体条件列表
   * @status @已完成
   */
  Axios_$$positionAppointment_require_searchRequireLevelTwoList: async query => {
    return request(
      `positionAppointment/require/searchRequireLevelTwoList`,
      METHOD.POST,
      {
        token: Cookie.get(token),
        type: Cookie.get('type'),
        info: query,
      }
    );
  },
};

/**
 * @group 岗位聘任gpa要求
 */
const PostAppointment_GPA_Requirements = {
  /**
   * @name 更新岗位聘任要求（gpa）
   * @status @已完成
   */
  Axios_$$positionAppointment_condition_edit: async query => {
    return request(`positionAppointment/condition/edit`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找岗位聘任要求（gpa）
   * @status @已完成
   */
  Axios_$$positionAppointment_condition_getInfo: async query => {
    return request(`positionAppointment/condition/getInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};
/**
 * @group 教师报名岗位聘任
 */
const TeacherRegistrationAndPostAppointment = {
  /**
   * @name 教师报名岗位聘任
   * @status @已完成
   */
  Axios_$$positionAppointment_apply: async query => {
    return request(`positionAppointment/apply`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 删除教师报名岗位聘任
   * @status @已完成
   */
  Axios_$$positionAppointment_apply_delete: async query => {
    return request(`positionAppointment/apply/delete`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找教师报名岗位聘任列表
   * @status @已完成
   */
  Axios_$$positionAppointment_apply_searchList: async query => {
    return request(`positionAppointment/apply/searchList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 获取教师报名信息
   * @status @已完成
   */
  Axios_$$positionAppointment_apply_getInfo: async query => {
    return request(`positionAppointment/apply/getInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 获取教师报名进度查看
   * @status @已完成
   */
  Axios_$$positionAppointment_apply_getRateInfo: async query => {
    return request(`positionAppointment/apply/getRateInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};
/**
 * @group 岗位聘任工作量填报
 */

const ReportingWorkloadOfPostsEngaged = {
  /**
   * @name 获取教师总工作量
   * @status @已完成
   */
  Axios_$$positionAppointment_gatherTeacherRankWorkload: async query => {
    return request(
      `positionAppointment/gatherTeacherRankWorkload`,
      METHOD.POST,
      {
        token: Cookie.get(token),
        type: Cookie.get('type'),
        info: query,
      }
    );
  },
  /**
   * @name 提交工作量
   * @status @已完成
   */
  Axios_$$positionAppointment_setTeacherRankWorkload: async query => {
    return request(`positionAppointment/setTeacherRankWorkload`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 获取已经提交的工作量
   * @status @已完成
   */
  Axios_$$positionAppointment_getTeacherRankWorkload: async query => {
    return request(`positionAppointment/getTeacherRankWorkload`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};
/**
 * @group 教师填报岗位聘任所需信息
 */

const TeachersFillInTheInformationRequiredForPostAppointment = {
  /**
   * @name 教师填报岗位聘任个人业绩
   * @status @已完成
   */
  Axios_$$positionAppointment_teacherInput: async query => {
    return request(`positionAppointment/teacherInput`, METHOD.FILE, query);
  },
  /**
   * @name 删除教师填报的岗位聘任个人业绩
   * @status @已完成
   */
  Axios_$$positionAppointment_teacherInput_delete: async query => {
    return request(`positionAppointment/teacherInput/delete`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找教师填报岗位聘任个人业绩结果列表
   * @status @已完成
   */
  Axios_$$positionAppointment_teacherInput_searchList: async query => {
    return request(`positionAppointment/teacherInput/searchList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找教师填报岗位聘任个人业绩单条结果
   * @status @已完成
   */
  Axios_$$positionAppointment_teacherInput_searchInfo: async query => {
    return request(`positionAppointment/teacherInput/searchInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 教师上传全部岗位聘任业绩结果
   * @status @已完成
   */
  Axios_$$positionAppointment_teacherUpload: async query => {
    return request(`positionAppointment/teacherUpload`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};

/**
 * @group 二级学院和职能部门审核职级评定
 */

const SecondaryCollegesAndFunctionalDepartmentsReviewAndRankEvaluation = {
  /**
   * @name 查找教师填报职级评定条件列表
   * @status @已完成
   */
  Axios_$$rankReview_searchTeacherUploadList: async query => {
    return request(`rankReview/searchTeacherUploadList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 查找单条教师填报职级评定条件详情
   * @status @已完成
   */
  Axios_$$rankReview_searchTeacherUploadInfo: async query => {
    return request(`rankReview/searchTeacherUploadInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 审核教师填报职级评定条件
   * @status @已完成
   */
  Axios_$$rankReview_checkTeacherFill: async query => {
    return request(`rankReview/checkTeacherFill`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};

/**
 * @group 二级学院审核职级评定管理岗
 */

const SecondaryCollegeAuditRankEvaluationManagementPost = {
  /**
   * @name 查找岗位评聘教师填报列表（普通管理岗）
   * @status @已完成
   */
  Axios_$$appointReview_searchTeacherUploadList: async query => {
    return request(`appointReview/searchTeacherUploadList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 审核岗位评聘教师填报信息（普通管理岗）
   * @status @已完成
   */
  Axios_$$appointReview_checkTeacherFill: async query => {
    return request(`appointReview/checkTeacherFill`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 审核岗位评聘教师填报领导打分（普通管理岗）
   * @status @已完成
   */
  Axios_$$appointReview_setLeaderScore: async query => {
    return request(`appointReview/setLeaderScore`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 审核岗位评聘教师填报本单位互评打分（普通管理岗）
   * @status @已完成
   */
  Axios_$$appointReview_setMutualScore: async query => {
    return request(`appointReview/setMutualScore`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 审核岗位评聘教师填民主测评打分（普通管理岗）
   * @status @已完成
   */
  Axios_$$appointReview_setDemocracyScore: async query => {
    return request(`appointReview/setDemocracyScore`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 审核岗位评聘教师填报业绩打分（普通管理岗）
   * @status @已完成
   */
  Axios_$$appointReview_setPerformanceScore: async query => {
    return request(`appointReview/setPerformanceScore`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  /**
   * @name 审核岗位评聘计算分数（普通管理岗）
   * @status @已完成
   */
  Axios_$$appointReview_countScore: async query => {
    return request(`appointReview/countScore`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};
/**
 * @group 二级学院和职能部门审核岗位聘任
 */

const SecondaryCollegesAndDunctionalDepartmentsReviewPostAppointment = {
  /**
   * @name 查找教师填报岗位聘任条件列表（已修改）
   * @status @已完成
   */
  Axios_$$positionAppointmentReview_searchTeacherUploadList: async query => {
    return request(
      `positionAppointmentReview/searchTeacherUploadList`,
      METHOD.POST,
      {
        token: Cookie.get(token),
        type: Cookie.get('type'),
        info: query,
      }
    );
  },
  /**
   * @name 查找单条教师填报岗位聘任条件详情
   * @status @已完成
   */
  Axios_$$positionAppointmentReview_searchTeacherUploadInfo: async query => {
    return request(
      `positionAppointmentReview/searchTeacherUploadInfo`,
      METHOD.POST,
      {
        token: Cookie.get(token),
        type: Cookie.get('type'),
        info: query,
      }
    );
  },
  /**
   * @name 审核教师填报岗位聘任条件
   * @status @已完成
   */
  Axios_$$positionAppointmentReview_checkTeacherFill: async query => {
    return request(`positionAppointmentReview/checkTeacherFill`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
};
const condition = {
  Axios_$$getExpertReviewList: async query => {
    return request(`getExpertReviewList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  Axios_$$addExpertReview: async query => {
    return request(`addExpertReview`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  Axios_$$deleteExpertReview: async query => {
    return request(`deleteExpertReview`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  //获取导航列表
  Axios_$$getLabelList: async query => {
    return request(`getLabelList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  Axios_$$addLabel: async query => {
    return request(`addLabel`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  Axios_$$deleteLabel: async query => {
    return request(`deleteLabel`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get('type'),
      info: query,
    });
  },
  Axios_$$rankReviewGetRankReviewList: async query => {
    return request(`rankReview/getRankReviewList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get("type"),
      info: query,
    });
  },
  Axios_$$appointReviewGetList: async query => {
    return request(`appointReview/getList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get("type"),
      info: query,
    });
  },
  Axios_$$importTeacherList: async query => {
    return request(`importTeacherList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get("type"),
      info: query,
    });
  },
  Axios_$$getTeacherList: async query => {
    return request(`getTeacherList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get("type"),
      info: query,
    });
  },
  Axios_$$getUserList: async query => {
    return request(`getUserList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get("type"),
      info: query,
    });
  },
  Axios_$$addTeacherExpertRelation: async query => {
    return request(`addTeacherExpertRelation`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get("type"),
      info: query,
    });
  },
  Axios_$$deleteTeacherExpertRelation: async query => {
    return request(`deleteTeacherExpertRelation`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get("type"),
      info: query,
    });
  },
  Axios_$$teacherSetLabel: async query => {
    return request(`teacherSetLabel`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get("type"),
      info: query,
    });
  },
  Axios_$$calculateLabelResult: async query => {
    return request(`calculateLabelResult`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get("type"),
      info: query,
    });
  },
  Axios_$$showVoteState: async query => {
    return request(`showVoteState`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get("type"),
      info: query,
    });
  },
  Axios_$$addExpert: async query => {
    return request(`addExpert`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get("type"),
      info: query,
    });
  },
  Axios_$$getInfo: async query => {
    return request(`getInfo`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get("type"),
      info: query,
    });
  },
  Axios_$$outputCalculateLabelResult: async query => {
    return request(`outputCalculateLabelResult`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get("type"),
      info: query,
    });
  },
  Axios_$$calculatePositionAppointmentResult: async query => {
    return request(`calculatePositionAppointmentResult`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get("type"),
      info: query,
    });
  },
  Axios_$$expertSearchTeacherList: async query => {
    return request(`expertSearchTeacherList`, METHOD.POST, {
      token: Cookie.get(token),
      type: Cookie.get("type"),
      info: query,
    });
  },
};
export default {
  ...account,
  ...TeachersPersonalPerformanceManagement,
  ...managementOfTeacherRegistrationRankEvaluation,
  ...thirdData,
  ...thirdPartyDataAttachment,
  ...functions,
  ...TeacherPostInformationManagement,
  ...performance1,
  ...PerformanceConditionsAndWorkloadRequirements,
  ...performance2,
  ...performance3,
  ...performance4,
  ...rankEvaluationManagement,
  ...postEvaluationAndEmploymentManagement,
  ...PostAppointmentManagement,
  ...PostAppointmentConditionsAndSerialNumberManagement,
  ...WorkloadRequirementsForPostAppointment,
  ...PostAppointmentRegistrationConditions,
  ...DemDetailedManagementOfPostEmploymentConditions,
  ...PostAppointment_GPA_Requirements,
  ...TeacherRegistrationAndPostAppointment,
  ...ReportingWorkloadOfPostsEngaged,
  ...TeachersFillInTheInformationRequiredForPostAppointment,
  ...SecondaryCollegesAndFunctionalDepartmentsReviewAndRankEvaluation,
  ...SecondaryCollegeAuditRankEvaluationManagementPost,
  ...SecondaryCollegesAndDunctionalDepartmentsReviewPostAppointment,
  ...condition,
  ...ExpertReviewOperation
};
