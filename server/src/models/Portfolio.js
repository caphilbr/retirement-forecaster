const Model = require("./Model.js")

class Portfolio extends Model {
  static get tableName() {
    return "portfolios"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "expenses"],
    }
  }

  static relationMappings() {
    const { StochConfig } = require("./index.js")
    return {
      stochConfigs: {
        relation: Model.HasManyRelation,
        modelClass: StochConfig,
        join: {
          from: "portfolios.id",
          to: "stochConfigs.portfolioId",
        },
      },
    }
  }
}

module.exports = Portfolio
