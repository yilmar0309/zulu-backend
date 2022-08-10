export interface ResponseMessage {
  message: string;
}

export interface ResponseNotFound {
  type: string;
  message: string;
  error: boolean;
}
