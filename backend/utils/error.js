// export const errorHandler = (statusCode, message) => {
//   const error = new Error();
//   error.statusCode = statusCode;
//   error.message = message;
//   return { error: error.statusCode, message: error.message };
// };
// export const errorHandler = (statusCode, message) => {
//   return { statusCode: statusCode, message: message };
// };
// export const errorHandler = (statusCode, message) => {
//   const error = new Error(message);
//   error.statusCode = statusCode;
//   return error;
// };
class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (statusCode, message) =>
  new CustomError(statusCode, message);
