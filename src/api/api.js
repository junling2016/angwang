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
 * 导出联系人
 * @param {*} params
 */
export const exportContacts = params => {
  return http.get(`${baseUrl}exportConcats`, {
    params
  })
}
