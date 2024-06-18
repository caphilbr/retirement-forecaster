const config = {
  nodeEnv: process.env["NODE_ENV"] || "development",
  validation: {
    currency: {
      regexp: {
        currencyRegex: /^(\$)?(-?\d+(,\d{3})*(\.\d{1,2})?)?$/,
      },
    },
    date: {
      regexp: {
        dateRegex: /^\d{4}-\d{2}-\d{2}$/,
      },
    },
    integer: {
      regexp: {
        integerRegex: /^-\d+$|^0$|\d+$/,
      }
    },
    percent: {
      regexp: {
        percentRegex: /^0$|^(0?\.\d{1,3})$|^1(\.0?)?$/,
      }
    }
  },
}

export default config
