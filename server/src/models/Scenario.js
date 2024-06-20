const Model = require("./Model.js")
const scenarioResults = require("../services/scenarioResults.cjs")

class Scenario extends Model {
  static get tableName() {
    return "scenarios"
  }

  static get jsonSchema() {
    return {
      type: "object",
    }
  }

  static relationMappings() {
    const { StochConfig, ProjectionYear } = require("./index.js")
    return {
      stochConfig: {
        relation: Model.BelongsToOneRelation,
        modelClass: StochConfig,
        join: {
          from: "scenarios.stochConfigsId",
          to: "stochConfigs.id",
        },
      },
      projectionYears: {
        relation: Model.HasManyRelation,
        modelClass: ProjectionYear,
        join: {
          from: "scenarios.id",
          to: "projectionYears.scenarioId"
        }
      }
    }
  }

  async getScenarioResults() {
    const { ProjectionYear } = require("./index.js")
    const projectionYears = await ProjectionYear.query().where({ scenarioId: this.id })
    const {
      retAge,
      balanceAtDeath
    } = scenarioResults(projectionYears)
    this.retAge = retAge
    this.balanceAtDeath = balanceAtDeath
  }
}

module.exports = Scenario
