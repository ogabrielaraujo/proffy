import express from 'express'
import StatusController from './controllers/StatusController'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'

const routes = express.Router()

const statusController = new StatusController()
const classesController = new ClassesController()
const connectionController = new ConnectionsController()

routes.get('/', statusController.status)

routes.get('/classes', classesController.index)
routes.post('/classes', classesController.create)

routes.get('/connections/total', connectionController.index)
routes.post('/connections', connectionController.create)

export default routes
