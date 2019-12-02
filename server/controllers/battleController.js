const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const battleRecord = mongoose.model('battlerecord')

//  METHOD TO GET LIST OF DISTINCT BATTLE LOCATIONS
router.get('/list', (req, res) => {
  battleRecord.find({}, { location: 1 }, (err, data) => {
    if (!err) {
      let locArr = []
      data.map(loc => {
        locArr.push(loc.location)
      })
      res.send([...new Set(locArr)])
    } else {
      console.log('Error in retrieving employee list :' + err)
    }
  })
})

//  METHOD TO GET DISTINCT NAMES OF KINGS
router.get('/king', (req, res) => {
  battleRecord.find({}, { attacker_king: 1, defender_king: 1 }, (err, data) => {
    if (!err) {
      let kingArr = []
      data.map(obj => {
        kingArr.push(obj.attacker_king)
        kingArr.push(obj.defender_king)
      })
      res.send([...new Set(kingArr)])
    } else {
      console.log('Error in retrieving employee list :' + err)
    }
  })
})

// METHOD TO GET DISTINCT TYPES OF BATTLES
router.get('/battletype', (req, res) => {
  battleRecord.find({}, { battle_type: 1 }, (err, data) => {
    if (!err) {
      let typeArr = []
      data.map(obj => {
        typeArr.push(obj.battle_type)
      })
      res.send([...new Set(typeArr)])
    } else {
      console.log('Error in retrieving employee list :' + err)
    }
  })
})

// METHOD TO GET NUMBER OF BATTLES
router.get('/count', async (req, res) => {
  let lastBattleNumber = 0
  try {
    lastBattleNumber = await battleRecord
      .find({}, { battle_number: 1 })
      .sort({ battle_number: -1 })
      .limit(1)
  } catch (err) {
    console.log('Error in retrieving battle count :' + err)
  }
  res.send(lastBattleNumber[0])
})

// POST METHOD TO ADD DATA

// router.post('/', (req, res) => {
//   let record = new battleRecord()
//   record.name = req.body.name
//   record.year = req.body.year
//   record.battle_number = req.body.battle_number
//   record.attacker_king = req.body.attacker_king
//   record.defender_king = req.body.defender_king
//   record.attacker_1 = req.body.attacker_1
//   record.attacker_2 = req.body.attacker_2
//   record.attacker_3 = req.body.attacker_3
//   record.attacker_4 = req.body.attacker_4
//   record.defender_1 = req.body.defender_1
//   record.defender_2 = req.body.defender_2
//   record.defender_3 = req.body.defender_3
//   record.defender_4 = req.body.defender_4
//   record.attacker_outcome = req.body.attacker_outcome
//   record.battle_type = req.body.battle_type
//   record.major_death = req.body.major_death
//   record.major_capture = req.body.defender_1
//   record.attacker_size = req.body.attacker_size
//   record.defender_size = req.body.defender_size
//   record.attacker_commander = req.body.attacker_commander
//   record.defender_commander = req.body.defender_commander
//   record.summer = req.body.summer
//   record.location = req.body.location
//   record.region = req.body.region
//   record.note = req.body.note

//   record.save((err, data) => {
//     if (!err) res.redirect('/list')
//     else {
//       console.log('Error during record insertion : ' + err)
//     }
//   })
// })

// METHOD TO GET DATA BASED ON SEARCH PARAMETERS
// [  BY DEFAULT IT WILL SEND ALL DATA  ]
router.get('/search', async (req, res) => {
  let king = req.query['king'] === undefined ? '' : req.query['king']
  let location =
    req.query['location'] === undefined ? '' : req.query['location']
  let type = req.query['type'] === undefined ? '' : req.query['type']
  let data = []
  try {
    if (king === '' && location === '' && type === '') {
      data = await battleRecord.find({}, { _id: 0 })
    } else {
      data = await battleRecord.find(
        {
          $text: {
            $search: `" \"${type}\" "\"${location}\" ${king}"`
          }
        },
        { _id: 0 }
      )
    }
  } catch (err) {
    console.log('Error in retrieving battle count :' + err)
  }
  res.json(data)
})

module.exports = router
