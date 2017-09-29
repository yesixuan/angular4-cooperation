import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment";

// 给Observable的原型添加方法需要如此这般申明一番
declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: (...any) => Observable<T>
  }
}

Observable.prototype.debug = function(message: string) {
  return this.do(
    (next) => {
      if(!environment.production) {
        console.log(message, next)
      }
    },
    (err) => {
      if(!environment.production) {
        console.error('ERROR>>', message, err)
      }
    },
    () => {
      if(!environment.production) {
        console.log('completed!')
      }
    }
  )
}