# vue-scroll-stop

A mini Vue directive that stop propagation scroll to parent when scrolling block reach top or bottom.

## Installation

```js
npm i --save vue-scroll-stop
```

### Browser

Include the script file, then install the component with `Vue.use(VueScrollStop);` e.g.:

```html
<script type="text/javascript" src="node_modules/vuejs/dist/vue.min.js"></script>
<script type="text/javascript" src="node_modules/vue-scroll-stop/dist/vue-scroll-stop.min.js"></script>
<script type="text/javascript">
  Vue.use(VueScrollStop);
</script>
```

## Usage

Once installed, it can be used in a template as simply as:

```html
<div v-scroll-stop></div>
```
