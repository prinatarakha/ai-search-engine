export class APIResponse {
  data: any;
  status: number;

  constructor(data: any, status: number) {
    this.data = data;
    this.status = status;
  }

  generate() {
    return {
      data: this.data,
      status: this.status
    }
  }
}

export class ErrorResponse extends APIResponse {
  constructor(message: Error | string, status: number) {
    super(message.toString(), status);
  }
}