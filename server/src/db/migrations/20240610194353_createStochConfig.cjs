/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("stochConfigs", (table) => {
    table.bigIncrements("id")
    table.integer("numberOfScens").notNullable().defaultTo(1000)
    table.integer("targetRetAge").notNullable().defaultTo(65)
    table.integer("deathAge").notNullable().defaultTo(95)
    table.string("savingsType").notNullable().defaultTo("fixed")
    table.float("savingsPerc").notNullable().defaultTo(0.05)
    table.float("retSpendingDropPerc").notNullable().defaultTo(0.1)
    table.float("avgRetAge")
    table.float("avgBalAtDeath")
    table.float("avgFrugalYrs")
    table.float("percRetAtTgt")
    table.float("percExhaust")
    table.float("percFrugal")
    table
      .bigInteger("portfolioId")
      .unsigned()
      .index()
      .notNullable()
      .references("portfolios.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("stochConfigs")
}
