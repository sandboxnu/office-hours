export const ERROR_MESSAGES = {
  questionController: {
    createQuestion: {
      invalidQueue: "Posted to an invalid queue",
      notInQueue: "Can't post question to course you're not in!",
      closedQueue: "You can't post a question to a closed queue",
      multipleQuestions: "You can't create more than one question at a time.",
    },
    updateQuestion: {
      studentCannotMarkAsHelping: "Students cannot mark question as helping",
      studentCannotMarkAsResolved: "Students cannot mark question as resolved",
      taProfOnlyCanEditQuestionStatus:
        "TA/Professors can only edit question status",
      anotherTAAlreadyHelping:
        "Another TA is currently helping with this question",
      anotherTAAlreadyResolved: "Another TA has already resolved this question",
      loggedInUserDoesNotHaveEditAccess:
        "Logged-in user does not have edit access",
    },
  },
  loginController: {
    receiveDataFromKhoury: {
      invalidSignature: "Invalid request signature",
    },
  },
  notificationController: {
    verifyPhoneUser: {
      messageNotFromTwilio: "Message not from Twilio",
    },
  },
};
