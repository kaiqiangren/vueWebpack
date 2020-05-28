export default class Events {
  private cacheEvents: {};

  constructor () {
    this.cacheEvents = {}
  }

  $on (key: string, callback: Function) {
    // @ts-ignore
    this.cacheEvents[key] = callback
  }

  $emit (key: string, ...arg: any[]) {
    // @ts-ignore
    if (this.cacheEvents[key]) {
      // @ts-ignore
      this.cacheEvents[key].apply(this, arg)
    }
  }
}


