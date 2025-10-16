interface ErrorProps {
    message: string
    status: number
    path?: string
    type?: string
  }
  export class CustomError extends Error {
    private _message: string
    private _status: number
    private _path?: string
    private _type?: string
  
    constructor({ status, path, type, message }: ErrorProps) {
      super()
      this._message = message
      this._status = status
      this._type = type
      this._path = path
    }
    get message(): string {
      return this._message
    }
  
    get type(): string | undefined {
      return this._type
    }
  
    get path(): string | undefined {
      return this._path
    }
  
    get status(): number {
      return this._status
    }
  }
  