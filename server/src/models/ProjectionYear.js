const Model = require("./Model.js")

class ProjectionYear extends Model {
  static get tableName() {
    return 'projection-years';
  }

  static get jsonSchema() {
    return {
      type: "object"
    }
  }

  static relationMappings() {
    const { ScenarioInput } = require("./index.js")
    return {
      scenarioUnput: {
        relation: Model.HasOneRelation,
        modelClass: ScenarioInput,
        join: {
          from: "projection-years.scenario-inputsId",
          to: "scenario-inputs.id"
        }
      }
    }
  }
}

module.exports = ProjectionYear;