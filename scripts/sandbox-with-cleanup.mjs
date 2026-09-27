// Runs `ampx sandbox` and deletes the sandbox stack on Ctrl-C (SIGINT) or SIGTERM,
// so no orphaned AWS resources get left behind after a dev session.
import { spawn, spawnSync } from 'node:child_process';

const sandbox = spawn('npx', ['ampx', 'sandbox'], {
  stdio: 'inherit',
  shell: true,
});

let cleaningUp = false;

function cleanup() {
  if (cleaningUp) return;
  cleaningUp = true;
  console.log('\nDeleting sandbox stack...');
  spawnSync('npx', ['ampx', 'sandbox', 'delete', '--yes'], {
    stdio: 'inherit',
    shell: true,
  });
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

sandbox.on('exit', (code) => {
  if (!cleaningUp) process.exit(code ?? 0);
});
