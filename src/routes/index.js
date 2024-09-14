const express = require("express");
const { validateRequest } = require("../utils/validateRequest");
const {
  createParticipant,
  getParticipantDetails,
  updateParticipant,
  deleteParticipant,
  getParticipantsData,
} = require("../services/participantService");
const { errorResponse, successResponse } = require("../utils/response");
const router = express.Router();


// returns all participant data including all fields
router.get("/", async (req, res) => {
  try {
    // You can include any additional logic here if needed
    return res.send("Welcome to the Census API");
  } catch (error) {
    // Handle any errors if necessary
    return res.status(500).send("An error occurred");
  }
});

router.get("/participants", async (req, res) => {
  try {
    const data = await getParticipantsData()
    return successResponse(res, {
      data
    });
  } catch (error) {
    return errorResponse(res, error);
  }
});

// returns all participant data including firstname and lastname
router.get("/details", async (req, res) => {
  try {
    const data = await getParticipantsData(["firstname", "lastname"])
    return successResponse(res, {
      data
    });
  } catch (error) {
    return errorResponse(res, error);
  }
});

// returns all participant data including firstname, lastname, dob and active
router.get("/details/:email", async (req, res) => {
  try {
    const participantDetails = await getParticipantDetails(req.params.email, [
      "firstname",
      "lastname",
      "dob",
      "active",
    ]);
    return successResponse(res, {
      data: participantDetails,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
});

// returns all participant data including firstname, lastname, dob, companyname, salary, currency
router.get("/work/:email", async (req, res) => {
  try {
    const participantDetails = await getParticipantDetails(req.params.email, [
      "firstname",
      "lastname",
      "dob",
      "companyname", 
      "salary", 
      "currency"
    ]);
    return successResponse(res, {
      data: participantDetails,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
});

// returns all participant data including firstname, lastname, dob, country, city
router.get("/home/:email", async (req, res) => {
  try {
    const participantDetails = await getParticipantDetails(req.params.email, [
      "firstname",
      "lastname",
      "dob",
      "country",
      "city"
    ]);
    return successResponse(res, {
      data: participantDetails,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
});

// stored the participant in the database
router.post("/add", async (req, res) => {
  try {
    const resultMessage = validateRequest(req.body);
    if (resultMessage !== "validated") {
      return res.status(400).json({
        error: resultMessage,
      });
    }
    await createParticipant(req.body);
    return successResponse(res, {
      message: "participant created successfully",
    });
  } catch (error) {
    return errorResponse(res, error);
  }
});

// update the participant in the database
router.put("/:email", async (req, res) => {
  try {
    const resultMessage = validateRequest(req.body);
    if (resultMessage !== "validated") {
      return res.status(400).json({
        error: resultMessage,
      });
    }
    await updateParticipant(req.params.email, req.body);
    return successResponse(res, {
      message: "participant updated successfully",
    });
  } catch (error) {
    return errorResponse(res, error);
  }
});

// delete the participant in the database
router.delete("/:email", async (req, res) => {
  try {
    await deleteParticipant(req.params.email);
    return successResponse(res, {
      message: "participant delete successfully",
    });
  } catch (error) {
    return errorResponse(res, error);
  }
});

module.exports = router;
