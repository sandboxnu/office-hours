# Async Questions component

## Purpose: for questions outside of office hours.


# Component DOM Tree

All components contained in async_question.tsx in pages/async_question.tsx
- **AsyncShared.tsx** 
  - **SettingsLeftPanel.tsx**
    - Buttons from AsyncShared
      - Button leading to **AsyncQuestionForm.tsx** (_from Student folder_)
      - Button leading to **EditAsyncQuestionModal.tsx** (_from TA folder_)
    - **EditAsyncQuestionModal.tsx** (_from TA folder_)
  - **QuestionListDetail.tsx**
    - **StudentListSection.tsx** (_from Student folder_)
      - **StudentListItem.tsx** (_from Student folder_)
    - **TAquestionListSection.tsx** (_from TA folder_)
      - **TAquestionListItem.tsx** (_from TA folder_)
  - **QuestionDetail.tsx** 
    - **StudentQuestionDetailButton.tsx** (_from Student folder_)
    - **TAquestionDetail.tsx** (_from TA folder_)
    - **TAquestionDetailButtons.tsx** (_from TA folder_)
    - **TAanswerQuestionModal.tsx** (_from TA folder_)

### Component that lead to pages/async_question.tsx from home page
- **AsyncQuestionCard.tsx**
## File Descriptions

### Student (folder)
- **asyncquestionform.tsx**: Represents the form for students to submit asynchronous questions.
- **StudentListItem.tsx**: Displays an individual card for each question in the middle list.
- **StudentListSection.tsx**: Contains multiple `StudentListItem` components, forming the middle section for student views.
- **StudentQuestionDetailButton.tsx**: Provides buttons for students to view question details in the right panel.

### TA (folder)
- **EditAsyncQuestionModal.tsx**: Displays a modal when a TA clicks on a question in the left panel to edit it.
- **TAanswerQuestionModal.tsx**: Pops up when a TA clicks the "Answer Question" button in the right panel.
- **TAquestionDetail.tsx**: Represents the right panel for TA views of question details.
- **TAquestionListSection.tsx**: Forms the middle section for TA views of the question list.
- **TAquestionListItem.tsx**: Represents an individual card for each question in the middle list.
- **TAquestionDetailButtons.tsx**: Provides buttons in the TA view for question details in the right panel.

### AsyncQuestionCard.tsx
- A card component found in `today.tsx` (homepage). Redirects to the `async_question.tsx` page, which is the main component for this card.

### AsyncShared.tsx
- Contains `SettingsLeftPanel.tsx` and `EditAsyncQuestionModal.tsx`, as well as the `QuestionsListDetail` (middle and right sections).
- Includes a list of buttons passed to `SettingsLeftPanel.tsx`. These buttons lead to modals: `AsyncQuestionForm.tsx` (student question posting form) and `EditAsyncQuestionModal.tsx` (TA edit question modal).

### QuestionDetail.tsx
- [Description of this file if available]

### QuestionListDetail.tsx
- Contains the middle question list section, which differs for students (who can't see question posters) and TAs. Also includes the right section with question details.

### SettingsLeftPanel.tsx
- The left panel featuring buttons passed from `AsyncShared.tsx`.
