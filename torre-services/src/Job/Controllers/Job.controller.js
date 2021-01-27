const getJobsHandler = (req, res, next) => {
  //  This may return jobs that social circle have like
};

const unexpectedErrorHandler = (err, req, res, next) => {
  res.json({
    internalCode: 3500,
    message: "Unexpected error has occurred",
    data: undefined,
  });
  res.status(500);
};

module.exports = {
  getJobsHandler,
};
