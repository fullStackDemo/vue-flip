
import Hello from './components/Hello.vue';
import Waterfall from './components/Waterfall/src/index.vue';
import Flip from './components/Flip/index.vue';

//all vue components
const components = {
  Hello,
  Waterfall,
  Flip,
};


const installComponents = {
  install: Vue => {
    Object.keys(components).forEach(key => {
      Vue.component(key, components[key]);
    });
  }
};


export default installComponents;