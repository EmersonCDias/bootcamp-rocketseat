const express = require("express")
const server = express()

const projects = []
let accessCounter = 0

server.listen(3000)
server.use(express.json())

// Middleware for checking if project exists
function checkIfProjectExists(req, res, next) {
	const { id } = req.params
	const checker = projects.map(item => item.id).indexOf(id)

	if (checker === -1) return res.status(400).json({ error: 'Project not found' })

	return next()
}

// Middleware to count requests
function countRequests(req, res, next) {
	accessCounter++

	console.log('Quantidade de requisições a platafoma:', accessCounter)

	next()
}

// GET ALL PROJECTS
server.get('/projects', countRequests, (req, res) => {
	return res.json(projects)
})

// ADD PROJECT
server.post("/projects", countRequests, (req, res) => {
	const { id, title } = req.body

	projects.push({
		id,
		title,
		tasks: [],
	})

  return res.send(projects)
})

// DELETE PROJECT
server.delete('/projects/:id', checkIfProjectExists, countRequests, (req, res) => {
	const { id } = req.params

	projects.splice(id - 1, 1)

	return res.send(projects)
})

// ADD PROJECT TASK
server.post('/projects/:id/tasks', checkIfProjectExists, countRequests, (req, res) => {
	const { id } = req.params
	const { task } = req.body

	projects.forEach(item => item.id === id && item.tasks.push(task));

	return res.send(projects)
})

// UPDATE PROJECT TITLE
server.put('/projects/:id', checkIfProjectExists, countRequests, (req, res) => {
	const { id } = req.params
	const { title } = req.body

	projects.forEach(item => item.id === id && (item.title = title));

	return res.send(projects)
})
