/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("scenario-outputs", (table) => {
    table.bigIncrements("id")
    table.integer("retAge").notNullable()
    table.integer("numYrsFrugal").notNullable()
    table.integer("exhaustAge").notNullable()
    table.float("balanceAtDeath").notNullable()
    table
      .bigInteger("scenarioInputsId")
      .unsigned()
      .index()
      .notNullable()
      .references("scenario-inputs.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("scenario-outputs")
}
