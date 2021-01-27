const { Router } = require('express');

//  Controllers
const { getJobsHandler } = require('./Controllers/Job.controller');

const router = Router();

//  api/organizations/
router.get('/', getOrganizationHandler);

module.exports = router;