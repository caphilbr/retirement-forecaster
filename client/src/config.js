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
  },
}

export default config
