const OrganizationModel = require("../Models/Organization.model");

const getOrganizationHandler = (req, res, next) => {
  OrganizationModel.findOne({ torreId: req.params.id })
    .then((org) => {
      if (!org)
        throw { message: "Organization not found!", internalCode: 2404 };
      res.json({
        internalCode: 2200,
        message: "Organization successfuly fetched!",
        data: org,
      });
      res.status(200);
    })
    .catch((error) => {
      if (error?.internalCode === 2404) {
        res.json({
          internalCode: error.internalCode,
          message: error.message,
          data: undefined,
        });
        res.status(404);
      } else {
        next(error);
      }
    });
};

const createOrganizationHandler = (req, res, next) => {
  const orgModel = new OrganizationModel(req.body);
  orgModel
    .save()
    .then((result) => {
      res.json({
        internalCode: 2201,
        message: "Organization successfuly created!",
        data: result,
      });
      res.status(201);
    })
    .catch((error) => {
      //  Database verifies if the organization already exists
      if (error.code === 11000) {
        res.json({
          internalCode: 2409,
          message: "Organization already exists!",
          data: undefined,
        });
        res.status(409);
      } else {
        next(error);
      }
    });
};

const unexpectedErrorHandler = (err, req, res, next) => {
  res.json({
    internalCode: 2500,
    message: "Unexpected error has occurred",
    data: undefined,
  });
  res.status(500);
};

module.exports = {
  createOrganizationHandler,
  getOrganizationHandler,
};
