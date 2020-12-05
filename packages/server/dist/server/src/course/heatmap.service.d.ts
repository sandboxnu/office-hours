import { Heatmap } from '@koh/common';
import { QuestionModel } from 'question/question.entity';
import { OfficeHourModel } from './office-hour.entity';
export declare class HeatmapService {
    getHeatmapFor(courseId: number): Promise<Heatmap | false>;
    _generateHeatMapWithReplay(questions: QuestionModel[], hours: OfficeHourModel[], timezone: string, bucketSize: number, samplesPerBucket: number): Heatmap;
    create(): Promise<void>;
}
