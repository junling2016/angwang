import http from './index'

const baseUrl = '/api/'

/**
 * 获取用户信息
 * @param {*} params
 */
export const fetchUserInfo = params => {
  return http.get(`${baseUrl}fetchUserInfo`, {
    params
  })
}

/**
 * 获取短信发送统计报表
 * @param {*} params
 */
export const fetchSendReport = params => {
  return http.get(`${baseUrl}fetchSendReport`, {
    params
  })
}

/**
 * 短信发送
 * @param {*} params
 */
export const sendMessage = params => {
  return http.post(`${baseUrl}sendMessage`, params)
}

/**
 * 获取文件发送历史记录
 * @param {*} params
 */
export const fetchFileSendLog = params => {
  return http.get(`${baseUrl}fetchFileSendLog`, {
    params
  })
}

/**
 * 获取常用短语类别列表
 * @param {*} params
 */
export const fetchTemplateGroups = params => {
  return http.get(`${baseUrl}fetchTemplateGroups`, {
    params
  })
}

/**
 * 新增常用短语类别
 * @param {*} params
 */
export const addTemplateGroup = params => {
  return http.post(`${baseUrl}addTemplateGroup`, params)
}

/**
 * 删除常用短语类别
 * @param {*} params
 */
export const deleteTemplateGroup = params => {
  return http.post(`${baseUrl}deleteTemplateGroup`, params)
}

/**
 * 获取常用短语类别列表
 * @param {*} params
 */
export const fetchTemplateList = params => {
  return http.get(`${baseUrl}fetchTemplateList`, {
    params
  })
}

/**
 * 新增常用短语
 * @param {*} params
 */
export const addTemplate = params => {
  return http.post(`${baseUrl}addTemplate`, params)
}

/**
 * 删除常用短语
 * @param {*} params
 */
export const deleteTemplate = params => {
  return http.post(`${baseUrl}deleteTemplate`, params)
}

/**
 * 编辑常用短语
 * @param {*} params
 */
export const updateTemplate = params => {
  return http.post(`${baseUrl}updateTemplate`, params)
}

/**
 * 获取即时任务列表
 * @param {*} params
 */
export const fetchImmediateTasks = params => {
  return http.get(`${baseUrl}fetchImmediateTasks`, {
    params
  })
}

/**
 * 即使任务重新发送
 * @param {*} params
 */
export const resendImmediateTask = params => {
  return http.post(`${baseUrl}resendImmediateTask`, params)
}

/**
 * 获取预约任务列表
 * @param {*} params
 */
export const fetchAppointmentTasks = params => {
  return http.get(`${baseUrl}fetchAppointmentTasks`, {
    params
  })
}

/**
 * 获取点播服务列表
 * @param {*} params
 */
export const fetchDemandList = params => {
  return http.get(`${baseUrl}fetchDemandList`, {
    params
  })
}

/**
 * 新增点播服务
 * @param {*} params
 */
export const addDemand = params => {
  return http.post(`${baseUrl}addDemand`, params)
}

/**
 * 批量删除点播服务
 * @param {*} params
 */
export const deleteDemand = params => {
  return http.post(`${baseUrl}deleteDemand`, params)
}

/**
 * 获取短信回复列表
 * @param {*} params
 */
export const fetchReplyList = params => {
  return http.get(`${baseUrl}fetchReplyList`, {
    params
  })
}

/**
 * 批量删除短信回复
 * @param {*} params
 */
export const deleteReplys = params => {
  return http.post(`${baseUrl}deleteReplys`, params)
}

/**
 * 获取日发送统计
 * @param {*} params
 */
export const fetchDailyStatistics = params => {
  return http.get(`${baseUrl}fetchDailyStatistics`, {
    params
  })
}

/**
 * 获取月发送统计
 * @param {*} params
 */
export const fetchMonthlyStatistics = params => {
  return http.get(`${baseUrl}fetchMonthlyStatistics`, {
    params
  })
}

/**
 * 任务状态查询
 * @param {*} params
 */
export const fetchTaskLog = params => {
  return http.get(`${baseUrl}fetchTaskLog`, {
    params
  })
}

/**
 * 获取通讯录群组列表
 * @param {*} params
 */
export const fetchContactGroups = params => {
  return http.get(`${baseUrl}fetchContactGroups`, {
    params
  })
}

/**
 * 添加通讯录群组
 * @param {*} params
 */
export const addContactGroup = params => {
  return http.post(`${baseUrl}addContactGroup`, params)
}

/**
 * 更新通讯录群组名称
 * @param {*} params
 */
export const updateContactGroup = params => {
  return http.post(`${baseUrl}updateContactGroup`, params)
}

/**
 * 删除通讯录群组
 * @param {*} params
 */
export const removeContactGroup = params => {
  return http.post(`${baseUrl}removeContactGroup`, params)
}

/**
 * 获取联系人列表
 * @param {*} params
 */
export const fetchContacts = params => {
  return http.get(`${baseUrl}fetchContacts`, {
    params
  })
}

/**
 * 获取部门列表
 * @param {*} params
 */
export const fetchDepartments = params => {
  return http.get(`${baseUrl}fetchDepartments`, {
    params
  })
}

/**
 * 添加联系人
 * @param {*} params
 */
export const addContact = params => {
  return http.post(`${baseUrl}addContact`, params)
}

/**
 * 编辑联系人
 * @param {*} params
 */
export const updateContact = params => {
  return http.post(`${baseUrl}updateContact`, params)
}

/**
 * 删除联系人
 * @param {*} params
 */
export const removeContacts = params => {
  return http.post(`${baseUrl}removeContacts`, params)
}

/**
 * 获取黑名单列表
 * @param {Object} params
 */
export const fetchBlacklist = params => {
  return http.get(`${baseUrl}fetchBlacklist`, {
    params
  })
}

/**
 * 批量删除黑名单
 * @param {*} params
 */
export const removeBlacklist = params => {
  return http.post(`${baseUrl}removeBlacklist`, params)
}

/**
 * 更新黑名单
 * @param {*} params
 */
export const updateBlacklist = params => {
  return http.post(`${baseUrl}updateBlacklist`, params)
}

/**
 * 添加黑名单
 * @param {*} params
 */
export const addBlacklist = params => {
  return http.post(`${baseUrl}addBlacklist`, params)
}

/**
 * 获取导出文件记录
 * @param {*} params
 */
export const fetchDownloadlist = params => {
  return http.get(`${baseUrl}fetchDownloadlist`, {
    params
  })
}
