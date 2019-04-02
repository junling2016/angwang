import reg from './regexp'

const regExpValid = regName => {
  return (rule, value, callback) => {
    if (!value || reg[regName].test(value)) {
      callback()
    } else {
      callback('格式不正确')
    }
  }
}

export default {
  // 必填项
  required: {
    required: true,
    message: '请填写',
    trigger: 'change'
  },

  // 必选项
  selectRequired: {
    required: true,
    message: '请选择'
  },

  // 多选必选项
  multiSelectRequired: {
    required: true,
    validator(rule, value, callback) {
      if (value && value.length) {
        callback()
      } else {
        callback('请选择')
      }
    }
  },

  // 整数
  int: {
    validator: regExpValid('INT'),
    message: '请输入整数',
    trigger: 'change'
  },

  // 正整数
  positiveInt: {
    validator: regExpValid('POSITIVE_INT'),
    message: '请输入正整数',
    trigger: 'change'
  },

  // 自然数
  naturalInt: {
    validator: regExpValid('NATURAL_INT'),
    message: '请输入大于等于0的整数',
    trigger: 'change'
  },

  // 正数
  positiveFloat: {
    validator: regExpValid('POSITIVE_FLOAT'),
    message: '请输入大于0的数',
    trigger: 'change'
  },

  // 禁止空格
  noSpace: {
    validator: regExpValid('NO_SPACE'),
    message: '请避免输入空格',
    trigger: 'change'
  },

  // 手机号
  phone: {
    validator: regExpValid('PHONE'),
    message: '请输入正确的手机号',
    trigger: 'blur'
  },

  // 邮箱前缀
  emailPrefix: {
    validator: regExpValid('EMAIL_PREFIX'),
    message: '请输入正确的邮箱前缀',
    trigger: 'change'
  },

  // 以逗号隔开的数字列表
  numList: {
    validator(rule, value, callback) {
      const splits = value.split(',')
      const valid = splits.every(item => {
        return reg['NUM'].test(item)
      })
      valid ? callback() : callback('格式不正确')
    },
    message: '填写数字编号，以英文逗号分隔',
    trigger: 'change'
  }
}
