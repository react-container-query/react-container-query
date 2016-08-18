interface Env {
  NODE_ENV: string;
}

interface Process {
  env: Env;
}

declare const process: Process;
