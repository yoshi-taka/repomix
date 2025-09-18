import type { TiktokenEncoding } from 'tiktoken';
import { logger, setLogLevelByWorkerData } from '../../../shared/logger.js';
import type { ProcessedFile } from '../../file/fileTypes.js';
import { freeTokenCounters, getTokenCounter } from '../tokenCounterFactory.js';
import type { FileMetrics } from './types.js';

// Initialize logger configuration from workerData at module load time
// This must be called before any logging operations in the worker
setLogLevelByWorkerData();

export type MetricsTaskType = 'output' | 'file' | 'gitDiff' | 'gitLog';

export interface OutputMetricsTask {
  type: 'output';
  content: string;
  encoding: TiktokenEncoding;
  path?: string;
}

export interface FileMetricsTask {
  type: 'file';
  file: ProcessedFile;
  index: number;
  totalFiles: number;
  encoding: TiktokenEncoding;
}

export interface GitDiffMetricsTask {
  type: 'gitDiff';
  workTreeDiffContent?: string;
  stagedDiffContent?: string;
  encoding: TiktokenEncoding;
}

export interface GitLogMetricsTask {
  type: 'gitLog';
  content: string;
  encoding: TiktokenEncoding;
}

export type UnifiedMetricsTask = OutputMetricsTask | FileMetricsTask | GitDiffMetricsTask | GitLogMetricsTask;

export default async (task: UnifiedMetricsTask): Promise<number | FileMetrics> => {
  const processStartAt = process.hrtime.bigint();

  try {
    switch (task.type) {
      case 'output': {
        const counter = getTokenCounter(task.encoding);
        const tokenCount = counter.countTokens(task.content, task.path);
        logger.trace(`Counted output tokens. Count: ${tokenCount}. Took: ${getProcessDuration(processStartAt)}ms`);
        return tokenCount;
      }

      case 'file': {
        const charCount = task.file.content.length;
        const tokenCounter = getTokenCounter(task.encoding);
        const tokenCount = tokenCounter.countTokens(task.file.content, task.file.path);
        const result: FileMetrics = { path: task.file.path, charCount, tokenCount };
        logger.trace(`Calculated metrics for ${task.file.path}. Took: ${getProcessDuration(processStartAt)}ms`);
        return result;
      }

      case 'gitDiff': {
        const tokenCounter = getTokenCounter(task.encoding);
        const countPromises = [];

        if (task.workTreeDiffContent) {
          const content = task.workTreeDiffContent;
          countPromises.push(Promise.resolve().then(() => tokenCounter.countTokens(content)));
        }
        if (task.stagedDiffContent) {
          const content = task.stagedDiffContent;
          countPromises.push(Promise.resolve().then(() => tokenCounter.countTokens(content)));
        }

        const results = await Promise.all(countPromises);
        const totalTokens = results.reduce((sum, count) => sum + count, 0);
        logger.trace(
          `Calculated git diff metrics. Tokens: ${totalTokens}. Took: ${getProcessDuration(processStartAt)}ms`,
        );
        return totalTokens;
      }

      case 'gitLog': {
        if (!task.content) {
          return 0;
        }

        const tokenCounter = getTokenCounter(task.encoding);
        const tokenCount = tokenCounter.countTokens(task.content);
        logger.trace(`Git log token count calculated in ${getProcessDuration(processStartAt)}ms`);
        return tokenCount;
      }

      default:
        throw new Error(`Unknown task type: ${(task as { type?: string }).type || 'unknown'}`);
    }
  } catch (error) {
    logger.error(`Error in unified metrics worker for task type ${task.type}:`, error);
    if (task.type === 'gitLog') {
      return 0; // gitLog worker returns 0 on error
    }
    throw error;
  }
};

const getProcessDuration = (startTime: bigint): string => {
  const endTime = process.hrtime.bigint();
  return (Number(endTime - startTime) / 1e6).toFixed(2);
};

// Export cleanup function for Tinypool teardown
export const onWorkerTermination = () => {
  freeTokenCounters();
};
