import pc from 'picocolors';
import type { TiktokenEncoding } from 'tiktoken';
import { logger } from '../../shared/logger.js';
import type { TaskRunner } from '../../shared/processConcurrency.js';
import type { RepomixProgressCallback } from '../../shared/types.js';
import type { ProcessedFile } from '../file/fileTypes.js';
import type { FileMetrics } from './workers/types.js';
import type { UnifiedMetricsTask } from './workers/unifiedMetricsWorker.js';

export const calculateSelectiveFileMetrics = async (
  processedFiles: ProcessedFile[],
  targetFilePaths: string[],
  tokenCounterEncoding: TiktokenEncoding,
  progressCallback: RepomixProgressCallback,
  deps: { taskRunner: TaskRunner<UnifiedMetricsTask, number | FileMetrics> },
): Promise<FileMetrics[]> => {
  const targetFileSet = new Set(targetFilePaths);
  const filesToProcess = processedFiles.filter((file) => targetFileSet.has(file.path));

  if (filesToProcess.length === 0) {
    return [];
  }

  const tasks = filesToProcess.map(
    (file, index) =>
      ({
        type: 'file',
        file,
        index,
        totalFiles: filesToProcess.length,
        encoding: tokenCounterEncoding,
      }) satisfies UnifiedMetricsTask,
  );

  try {
    const startTime = process.hrtime.bigint();
    logger.trace(`Starting selective metrics calculation for ${filesToProcess.length} files using worker pool`);

    let completedTasks = 0;
    const results = await Promise.all(
      tasks.map(async (task) => {
        const result = (await deps.taskRunner.run(task)) as FileMetrics;
        completedTasks++;
        progressCallback(
          `Calculating metrics... (${completedTasks}/${filesToProcess.length}) ${pc.dim(task.file.path)}`,
        );
        logger.trace(`Calculating metrics... (${completedTasks}/${filesToProcess.length}) ${task.file.path}`);
        return result;
      }),
    );

    const endTime = process.hrtime.bigint();
    const duration = Number(endTime - startTime) / 1e6;
    logger.trace(`Selective metrics calculation completed in ${duration.toFixed(2)}ms`);

    return results;
  } catch (error) {
    logger.error('Error during selective metrics calculation:', error);
    throw error;
  }
};
