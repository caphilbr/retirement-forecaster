const Model = require("./Model.js")

class ScenarioOutput extends Model {
  static get tableName() {
    return "scenario-outputs"
  }

  static get jsonSchema() {
    return {
      type: "object",
    }
  }

  static relationMappings() {
    const { ScenarioInput } = require("./index.js")
    return {
      scenarioInput: {
        relation: Model.HasOneRelation,
        modelClass: ScenarioInput,
        join: {
          from: "scenario-outputs.scenarioInputsId",
          to: "scenario-inputs.id",
        },
      },
    }
  }
}

module.exports = ScenarioOutput
