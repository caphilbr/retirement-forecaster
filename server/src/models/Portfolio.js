const Model = require("./Model.js")

class Portfolio extends Model {
  static get tableName() {
    return 'portfolios';
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "expenses"]
    }
  }
  
  static relationMappings() {
    const { ScenarioInput } = require("./index.js")
    return {
      scenarioInputs: {
        relation: Model.HasManyRelation,
        modelClass: ScenarioInput,
        join: {
          from: "portfolios.id",
          to: "scenario-inputs.portfolioId"
        }
      }
    }
  }
}

module.exports = Portfolio;