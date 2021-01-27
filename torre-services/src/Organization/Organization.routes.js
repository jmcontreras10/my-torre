const { Router } = require('express');

//  Controllers
const { getOrganizationHandler, createOrganizationHandler } = require('./Controllers/Organization.controller');

const router = Router();

//  api/organizations/
router.get('/:id', getOrganizationHandler);
router.post('/', createOrganizationHandler);

module.exports = router;