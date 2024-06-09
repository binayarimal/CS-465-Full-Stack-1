const express = require('express'); //Express app
const router = express.Router();

const tripsController = require('../controllers/trips');

router
    .route('/trips')
    .get(tripsController.tripsList);

    module.exports = router;

router
.route('/trips/:tripCode')
.get(tripsController.tripsFindByCode);

module.exports = router;