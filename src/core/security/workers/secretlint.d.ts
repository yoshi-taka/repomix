declare module '@secretlint/secretlint-rule-preset-recommend' {
  // Using any here avoids importing Secretlint types into ambient module context
  // and matches the runtime shape expected by securityCheckWorker.
  export const creator: any;
}
