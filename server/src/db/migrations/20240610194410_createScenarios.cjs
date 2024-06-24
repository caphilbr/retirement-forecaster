/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("scenarios", (table) => {
    table.bigIncrements("id")
    table.integer("retAge")
    table.float("balanceAtDeath")
    table
      .bigInteger("stochConfigsId")
      .unsigned()
      .index()
      .notNullable()
      .references("stochConfigs.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("scenarios")
}
