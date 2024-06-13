const Model = require("./Model.js")

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
}

module.exports = Scenario
