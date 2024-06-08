export const log = (message: string) => {
  console.log(`${new Date().toISOString()}: ${message}`);
}

export const logError = (message: string) => {
  console.error(`${new Date().toISOString()}: ${message}`);
}