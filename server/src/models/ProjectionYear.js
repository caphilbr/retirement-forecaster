const Model = require("./Model.js")

class ProjectionYear extends Model {
  static get tableName() {
    return "projectionYears"
  }

  static get jsonSchema() {
    return {
      type: "object",
    }
  }

  static relationMappings() {
    const { Scenario } = require("./index.js")
    return {
      scenarioUnput: {
        relation: Model.BelongsToOneRelation,
        modelClass: Scenario,
        join: {
          from: "projectionYears.scenarioId",
          to: "scenarios.id",
        }
      }
    }
  }
}

module.exports = ProjectionYear
