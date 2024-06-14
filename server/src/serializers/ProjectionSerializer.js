import ProjectionYear from "../models/ProjectionYear.js"

class ProjectionSerializer {
  static dashboardData = async (scenarioId) => {
    const disallowedFields = ["createdAt", "updatedAt"]
    const projection = await ProjectionYear.query().where({
      scenarioId: scenarioId,
    })
    const serializedProjection = []
    projection.forEach(year => {
      const serializedYear = {}
      Object.keys(year).forEach(key => {
        if (!disallowedFields.includes(key)) {
          serializedYear[key] = year[key]
        }
      })
      serializedProjection.push(serializedYear)
    })
    return serializedProjection
  }
}

export default ProjectionSerializer
