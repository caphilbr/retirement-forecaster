const Model = require("./Model.js")

class ScenarioInput extends Model {
  static get tableName() {
    return "scenario-inputs"
  }

  static get jsonSchema() {
    return {
      type: "object",
    }
  }

  static relationMappings() {
    const { Portfolio, ProjectionYear, ScenarioOutput } = require("./index.js")
    return {
      portfolio: {
        relation: Model.BelongsToOneRelation,
        modelClass: Portfolio,
        join: {
          from: "scenario-inputs.portfolioId",
          to: "portfolios.id",
        },
      },
      projectionYears: {
        relation: Model.HasManyRelation,
        modelClass: ProjectionYear,
        join: {
          from: "scenario-inputs.id",
          to: "projection-years.scenarioInputsId",
        },
      },
      scenarioOutput: {
        relation: Model.HasOneRelation,
        modelClass: ScenarioOutput,
        join: {
          from: "scenario-inputs.id",
          to: "scenario-outputs.scenarioInputsId",
        },
      },
    }
  }
}

module.exports = ScenarioInput
