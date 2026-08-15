class ApiResponse {
  constructor(statusCode, data = null,message) {
    this.success = true;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}

module.exports = ApiResponse;
