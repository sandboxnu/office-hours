import { API } from "@koh/api-client";
import { ERROR_MESSAGES, OpenQuestionStatus } from "@koh/common";
import { notification } from "antd";

/**
 * Method to help student and
 * pop open notification if another TA helped at same time (race condition)
 */
export default async function onHelpQuestion(
  questionId: number
): Promise<void> {
  try {
    await API.questions.update(questionId, {
      status: OpenQuestionStatus.Helping,
    });
  } catch (e) {
    if (
      e.response?.status === 401 &&
      e.response?.data?.message ===
        ERROR_MESSAGES.questionController.updateQuestion.otherTAHelping
    ) {
      notification.open({
        message: "Another TA is currently helping the student",
        description:
          "This happens when another TA clicks help at the exact same time",
        type: "error",
        duration: 3,
        className: "hide-in-percy",
        style: {
          width: 450,
        },
      });
    }
  }
}
