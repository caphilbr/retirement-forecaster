import express from "express"
import ProjectionSerializer from "../../../serializers/ProjectionSerializer.js"


const projectionRouter = new express.Router()

projectionRouter.get("/:id", async (req, res) => {
  try {
    const projection = await ProjectionSerializer.dashboardData(req.params.id)
    res.status(200).json({ projection })
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

export default projectionRouter