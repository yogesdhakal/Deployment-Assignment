const participant = require("../models/participant");

const getParticipantsData = (attributes) => {
  return participant.findAll({
    attributes
  })
}
const createParticipant = (payload) => {
  const {
    email,
    firstname,
    lastname,
    dob,
    companyname,
    salary,
    currency,
    country,
    city,
  } = payload;
  return participant.create({
    email,
    firstname,
    lastname,
    dob,
    companyname,
    salary,
    currency,
    country,
    city,
  });
};

const getParticipantDetails = async (email, attributes) => {
  const participantData = await participant.findOne({
    attributes,
    where: {
      email,
    },
  });
  if (!participantData) {
    throw new Error("participant data not found");
  }
  return participantData;
};

const updateParticipant = async (paramEmail, payload) => {
  const {
    email,
    firstname,
    lastname,
    dob,
    companyname,
    salary,
    currency,
    country,
    city,
  } = payload;
  const participantData = await participant.findOne({
    where: {
      email: paramEmail,
    },
  });
  if (!participantData) {
    throw new Error("participant data not found");
  }
  return participant.update(
    {
      email,
      firstname,
      lastname,
      dob,
      companyname,
      salary,
      currency,
      country,
      city,
    },
    {
      where: {
        email: paramEmail,
      },
    }
  );
};

const deleteParticipant = async (paramEmail) => {
  const participantData = await participant.findOne({
    where: {
      email: paramEmail,
    },
  });
  if (!participantData) {
    throw new Error("participant data not found");
  }
  return participant.destroy({
    where:{
        email: paramEmail
    }
  })
};

module.exports = {
  getParticipantsData,
  createParticipant,
  getParticipantDetails,
  updateParticipant,
  deleteParticipant,
};
