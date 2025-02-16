export class HttpException extends Error {
  public status: number;
  public message: string;
  public error: any;

  constructor(status: number, message: string, error?: any) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = 'Bad Request', error?: any) {
    super(400, message, error);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = 'Unauthorized', error?: any) {
    super(401, message, error);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string = 'Forbidden', error?: any) {
    super(403, message, error);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = 'Not Found', error?: any) {
    super(404, message, error);
  }
} 