const Model = require("./Model.js")
const stochResults = require("../services/stochResults.cjs")

class StochConfig extends Model {
  static get tableName() {
    return "stochConfigs"
  }

  static get jsonSchema() {
    return {
      type: "object",
    }
  }

  static relationMappings() {
    const { Portfolio, Scenario } = require("./index.js")
    return {
      portfolio: {
        relation: Model.BelongsToOneRelation,
        modelClass: Portfolio,
        join: {
          from: "stochConfigs.portfolioId",
          to: "portfolios.id",
        },
      },
      scenarios: {
        relation: Model.HasManyRelation,
        modelClass: Scenario,
        join: {
          from: "stochConfigs.id",
          to: "scenarios.stochConfigsId",
        },
      },
    }
  }

  async getStochResults() {
    const { Scenario } = require("./index.js")
    const scenarios = await Scenario.query().where({ stochConfigsId: this.id })
    const {
      avgRetAge,
      avgBalAtDeath,
      percRetAtTgt,
      percExhaust,
    } = stochResults(scenarios, this.targetRetAge)
    this.avgRetAge = avgRetAge
    this.avgBalAtDeath = avgBalAtDeath
    this.percRetAtTgt = percRetAtTgt
    this.percExhaust = percExhaust
  }
}

module.exports = StochConfig
