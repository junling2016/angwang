export default {
  // 大写字母、下划线和数字
  CAPITAL_NUM_UNDERLINE: /^[A-Z_\d]+$/,
  // 英文、下划线和数字
  LETTER_NUM_UNDERLINE: /^[A-Za-z_\d]+$/,
  // 数字
  NUM: /^\d+$/,
  // 自然数
  NATURAL_INT: /^(0|[1-9]\d*)$/,
  // 大于0的整数
  POSITIVE_INT: /^[1-9]\d*$/,
  // 大于0的数
  POSITIVE_FLOAT: /^(0\.\d+)$|^[1-9]\d*(\.\d+)?$/,
  // 非空格
  NO_SPACE: /^\S*$/,
  // 邮箱前缀，不应包含空格和@符号
  EMAIL_PREFIX: /^((?![\s@]).)*$/,
  // 判断是否存在中文符号
  WITH_CN_SYMBOL: /\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5/,
  // 手机号码
  PHONE: /^1[34578]\d{9}$/
}
