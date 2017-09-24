import { trigger, state, style, transition, animate, group, query, stagger } from "@angular/animations";

export const listAnimation = trigger('listAnim', [
  transition('* => *', [
    /* 
    列表中可能出现没有子元素的情况，所以建议加上{optional: true} 
    stagger可以让多个列表元素依次执行动画
    */
    query(':enter', style({'opacity': '0'}), {optional: true}), 
    query(':enter', stagger(100, [
      animate('1s', style({'opacity': '1'}))
    ]), {optional: true}),
    query(':leave', style({'opacity': '1'}), {optional: true}),
    query(':leave', stagger(100, [
      animate('1s', style({'opacity': '0'}))
    ]), {optional: true})
  ])
])