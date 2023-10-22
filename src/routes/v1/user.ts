import express from 'express'

const router = express.Router()

router.route('/register').get((req, res) => {
  res.send('user register ')
})

export default router
