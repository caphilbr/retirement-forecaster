/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("projection-years", (table) => {
    table.bigIncrements("id")
    table.integer("calYear").notNullable()
    table.integer("age").notNullable()
    table.boolean("isRetired").notNullable().defaultTo(false)
    table.boolean("isFrugal").notNullable().defaultTo(false)

    table.float("initBalReg").notNullable()
    table.float("initBalRoth").notNullable()
    table.float("initBalBank").notNullable()
    table.float("initBalHomeEq").notNullable()
    table.float("initBalTotal").notNullable()

    table.float("salary").notNullable()
    table.float("withdrawals").notNullable()
    table.float("taxRate").notNullable()
    table.float("taxes").notNullable()
    table.float("expenses").notNullable()
    table.float("savings").notNullable()

    table.float("begYrBalReg").notNullable()
    table.float("begYrBalRoth").notNullable()
    table.float("begYrBalBank").notNullable()
    table.float("begYrBalHomeEq").notNullable()
    table.float("begYrBalTotal").notNullable()

    table.float("yieldReg").notNullable()
    table.float("yieldRoth").notNullable()
    table.float("yieldBank").notNullable()
    table.float("yieldHomeEq").notNullable()
    table.float("inflationRate").notNullable()
    table.float("raisePerc").notNullable()

    table.float("endYrBalReg").notNullable()
    table.float("endYrBalRoth").notNullable()
    table.float("endYrBalBank").notNullable()
    table.float("endYrBalHomeEq").notNullable()
    table.float("endYrBalTotal").notNullable()

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
  return knex.schema.dropTableIfExists("projecion-years")
}
