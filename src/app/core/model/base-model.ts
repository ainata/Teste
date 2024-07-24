class BaseModel {
  constructor(args: Record<string, any> = {}) {
    for (const key of Object.keys(args)) {
      (this as any)[key] = (args[key] === '') ? null : args[key];
    }
  }
}

export default BaseModel;
