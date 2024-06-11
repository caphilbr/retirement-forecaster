import addEnvironmentMiddlewares from "./addEnvironmentMiddlewares.js"
import addClientMiddlewares from "./addClientMiddlewares.js"

const addMiddlewares = async (app) => {
  await addClientMiddlewares(app)
  await addEnvironmentMiddlewares(app)
}

export default addMiddlewares
