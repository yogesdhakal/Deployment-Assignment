const successResponse = (res, payload) => {
    return res.status(200).json(payload);
}

const errorResponse = (res, error) => {
    let statusCode = 500;
    if (error.message.includes("not found")) {
      statusCode = 404;
    }
    return res.status(statusCode).json({
      error: error.message || "something went wrong",
    });
}

module.exports = {
    successResponse, errorResponse
}