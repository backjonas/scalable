import util from 'util';
import { exec } from 'child_process';

import { writeFile, unlink, readFile } from 'fs/promises';

const promisified_exec = util.promisify(exec);

const run = async (cmd: string[]) => {
  try {
    const { stdout, stderr } = await promisified_exec(cmd.join(' '));
    return stdout;
  } catch (error) {
    console.log(`Error running the command ${cmd}: ${error}`);
  }
};

const createGradingContainer = async (code, randomKey) => {
  try {
    const randomFileName = `submission-${randomKey}.data`;
    await writeFile(randomFileName, code);
    const graderContainerName = `submission-image-${randomKey}`;
    const tmpGraderContainerName = `${graderContainerName}-tmp`;

    await run([
      'docker',
      'create',
      '--name',
      tmpGraderContainerName,
      'grader-image',
    ]);

    await run([
      'docker',
      'cp',
      randomFileName,
      `${tmpGraderContainerName}:/app/submission/submitted_code.data`,
    ]);

    await run(['docker', 'commit', tmpGraderContainerName, graderContainerName]);

    await run(['docker', 'rm', '-fv', tmpGraderContainerName]);

    await unlink(randomFileName);

    return graderContainerName;
  } catch (error) {
    console.log(`Error creating grading container: ${error}`);
  }
};

const runGradingContainer = async (graderContainerName, randomKey) => {
  try {
    await run([
      'docker',
      'run',
      '--name',
      `${graderContainerName}-image`,
      graderContainerName,
    ]);

    await run([
      'docker',
      'cp',
      `${graderContainerName}-image:/app/submission/result.data`,
      `result-${randomKey}.data`,
    ]);

    await run(['docker', 'image', 'rm', '-f', `${graderContainerName}`]);

    await run(['docker', 'rm', '-fv', `${graderContainerName}-image`]);

    const result = await readFile(`result-${randomKey}.data`, 'utf8');

    await unlink(`result-${randomKey}.data`);

    return result.trim();
  } catch (error) {
    console.log(`Error running grading container: ${error}`);
    return;
  }
};

const grade = async (code) => {
  const randomKey = Math.floor(Math.random() * 900000000 + 100000000);

  const graderContainerName = await createGradingContainer(code, randomKey);
  const result = await runGradingContainer(graderContainerName, randomKey);

  return result;
};

export { grade };
