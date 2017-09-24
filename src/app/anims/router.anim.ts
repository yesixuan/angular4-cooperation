import { trigger, state, style, transition, animate, group } from "@angular/animations";

export const slideToRight = trigger('routeAnim', [
  // 加上fixed是因为我们通过flex容器来让元素居中，所以如果不加的话，会有元素调整位置居中的过程
  state('void', style({'position': 'fixed', 'width': '100%', 'height': '80%'})),
  state('*', style({'position': 'fixed', 'width': '100%', 'height': '80%'})),
  // 'void => *'别名为enter; '* => void'别名为leave
  transition('void => *', [
    style({'transform': 'translateX(-100%)', 'opacity': '0'}),
    group([
      animate('.5s ease-in-out', style({'transform': 'translateX(0)'})),
      animate('.3s ease-in', style({'opacity': '1'}))
    ])
  ]),
  transition('* => void', [
    style({'transform': 'translateX(0)', 'opacity': '1'}),
    group([
      animate('.5s ease-in-out', style({'transform': 'translateX(100%)'})),
      animate('.3s ease-in', style({'opacity': '0'}))
    ])
  ])
])