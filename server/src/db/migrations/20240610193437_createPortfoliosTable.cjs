/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("portfolios", (table) => {
    table.bigIncrements("id")
    table.string("name").notNullable()
    table.timestamp("date").notNullable().defaultTo(knex.fn.now())
    table.integer("age").notNullable()
    table.float("salary").notNullable().defaultTo(0.0)
    table.float("expenses").notNullable()
    table.float("balanceReg").notNullable().defaultTo(0.0)
    table.string("mixReg").notNullable().defaultTo("0-40-60")
    table.float("balanceRoth").notNullable().defaultTo(0.0)
    table.string("mixRoth").notNullable().defaultTo("0-40-60")
    table.float("balanceBank").notNullable().defaultTo(0.0)
    table.float("balanceHomeEq").notNullable().defaultTo(0.0)
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("portfolios")
}
