export class FunctionDelegate<
  T extends (...args: any) => any,
  R = ReturnType<T>
> {
  public callback: T = null;

  invoke(): R {
    return this.callback?.();
  }
}
