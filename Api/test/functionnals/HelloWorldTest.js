import FastifyServer,{ start } from '../../index.js'
import { fail, deepEqual, ok} from "assert";
import { fetchAPI} from '../../utils/index.js'

const expectedHelloWorldResponse = {hello: 'world'}

describe('HelloWorldPreTest', () => {
    it('should start', () => {
        ok(true)
    })
    start().then(() => {
        describe('helloWorld API functional test ', () => {
          it('it should receive hello world object', async () => {
            const res = async() => fetchAPI('http://localhost:8000/', 'GET')
            await res()
            .then((result) => deepEqual(result, expectedHelloWorldResponse))
            .catch((err) => fail(new Error(err)))
            .finally(()=> FastifyServer.close().then(() => console.log('server closed')).catch(() => void 0))
          })
        })
      }).catch(() => {
        console.error('unable to launch server to test. Be sure that port 8080 is free')
      })
})

  
 