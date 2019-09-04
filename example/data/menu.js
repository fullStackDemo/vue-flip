import Hello from '@c/Hello.vue';
//瀑布流
import Waterfall from '@c/Waterfall/src/index';
import Flip from '@c/Flip/index';

const data = [
  {
    name: 'Hello',
    component: Hello
  },
  {
    name: 'Waterfall',
    component: Waterfall
  },
  {
    name: 'Flip',
    component: Flip
  },
];

export default data;