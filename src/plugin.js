import VueScrollStop from './vue-scroll-stop.js';

module.exports = {
  install: function (Vue, options) {
    Vue.directive('scroll-stop', VueScrollStop);
  }
};
