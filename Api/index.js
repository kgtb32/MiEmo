// Require the framework and instantiate it

import fastify from "fastify"

const fastifyServer = fastify({ logger: true })

// Declare a route
fastifyServer.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    await fastifyServer.listen(8000)
  } catch (err) {
    fastifyServer.log.error(err)
    process.exit(1)
  }
}
start()