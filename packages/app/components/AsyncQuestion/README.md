# Async Questions component

## Purpose: for questions outside of office hours.


# Component DOM Tree

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

- **AsyncQuestionCard.tsx**

## file structure

Student(folder)
  asyncquestionform.tsx
  StudentListItem.tsx- the individual card for each question in the middle list
  StudentListSection.tsx- contains many studentListItems, is the middle section for student view
  StudentQuestionDetailButton.tsx- the buttons for students view of question details (right panel)
TA (folder)
  EditAsyncQuestionModal.tsx- the modal that pops up when TA clicks on a question in the left panel
  TAanswerQuestionModal.tsx- the modal that pops up when TA clicks answer question button in the right panel
  TAquestionDetail.tsx- the right panel for TA view of question details
  TAquestionListSection.tsx- the middle section for TA view of question list
  TAquestionListItem.tsx- the individual card for each question in the middle list
  TAquestionDetailButtons.tsx- the buttons for TA view of question details (right panel)
AsyncQuestionCard.tsx- card component in today.tsx (homepage), redirects to async_question.tsx page, which is the main component for this component
AsyncShared.tsx- component that contains SettingsLeftPanel.tsx and EditAsyncQuestionModal.tsx and QuestionsListDetail (middle and rightsections). It has also has the list of buttons that it passes to SettingsLeftPanel.tsx. These buttons lead modals: AsyncQuestionForm.tsx (student questions posting form) and EditAsyncQuestionModal.tsx (TA edit question modal)
QuestionDetail.tsx - 
QuestionListDetail.tsx - Contains middle question list section(different for students who can't see question poster vs TAs) and right section with question details. 
SettingsLeftPanel.tsx - the panel on the left that has buttons passed from asyncShared.tsx      