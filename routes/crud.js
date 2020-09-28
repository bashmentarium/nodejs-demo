const express = require('express')
const router = express.Router()

// Create Read Update Delete
let counter = 0
/**
 * Given a title, create an object with sequential id
 * @param {String} title
 */
const createItem = (title, id = false) => ({
  title,
  id: id ? id : counter++,
})

const items = []
items.push(createItem('Never gonna give you up'))

router.get('/', (req, res) => {
  res.send(items)
})

router.get('/:id', (req, res) => {
  const {id} = req.params
  const foundItem = items.find((element) => element.id === Number(id))
  if (foundItem) {
    res.send(foundItem)
  } else {
    res.status(404).send('No item with such id')
  }
})

router.post('/', (req, res) => {
  // Write code to add an item
  // Retrieve the title
  const {title} = req.body

  // Ensure that request contains a title
  if (!title) {
    res.status(400).send({error: 'Please add a title'})
  }

  // Create the item
  const item = createItem(title)

  // Push the item
  items.push(item)

  // Return the created item
  res.send(item)
})

router.delete('/:id', (req, res) => {
  const {id} = req.params
  const index = items.findIndex((element) => element.id === Number(id))

  if (index > -1) {
    const copy = {...items[index]}

    // Delete
    items.splice(index, 1)
    res.send(copy)
  } else {
    res.status(404).send('No item with such id')
  }
})

router.put('/:id', (req, res) => {
  const {id} = req.params
  const {title} = req.body

  if (!title) {
    res.status(400).send('Please add a title')
  }

  const index = items.findIndex((element) => element.id === Number(id))

  if (index > -1) {
    const newItem = createItem(title, id)
    items.splice(index, 1, newItem)
    res.send(items[index])
  } else {
    res.status(404).send('No items with such id')
  }
})

module.exports = router
