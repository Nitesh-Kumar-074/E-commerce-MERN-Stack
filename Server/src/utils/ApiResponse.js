class ApiResponse {
       constructor(
              success,
              statusCode,
              message,
              data = {}
       ) {
             this.success = success || false;
             this.statusCode = statusCode;
             this.message = message
             this.data = data 
       }
}

export {ApiResponse}