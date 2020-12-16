import { Heatmap } from '@koh/common';
import { QuestionModel } from 'question/question.entity';
import { OfficeHourModel } from './office-hour.entity';
import { Cache } from 'cache-manager';
export declare class HeatmapService {
    private cacheManager;
    constructor(cacheManager: Cache);
    getCachedHeatmapFor(courseId: number): Promise<Heatmap | false>;
    _getHeatmapFor(courseId: number): Promise<Heatmap | false>;
    _generateHeatMapWithReplay(questions: QuestionModel[], hours: OfficeHourModel[], timezone: string, bucketSize: number, samplesPerBucket: number): Heatmap;
    create(courseId: number): Promise<void>;
}
