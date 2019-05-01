import http from './index'

const baseUrl = '/api/'

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
