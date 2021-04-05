import { InsightObject } from '@koh/common';
export declare type Filter = {
    type: string;
    [x: string]: any;
};
export declare const TotalStudents: InsightObject;
export declare const TotalQuestionsAsked: InsightObject;
export declare const MostActiveStudents: InsightObject;
export declare const QuestionTypeBreakdown: InsightObject;
export declare const MedianWaitTime: InsightObject;
export declare const MedianHelpingTime: InsightObject;
export declare const QuestionToStudentRatio: InsightObject;
export declare const INSIGHTS_MAP: {
    TotalStudents: InsightObject;
    TotalQuestionsAsked: InsightObject;
    MedianWaitTime: InsightObject;
    QuestionTypeBreakdown: InsightObject;
    MostActiveStudents: InsightObject;
    QuestionToStudentRatio: InsightObject;
    MedianHelpingTime: InsightObject;
};
