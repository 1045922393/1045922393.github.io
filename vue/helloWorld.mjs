import {h, ref} from  '../lib/vue.esm-browser.js';
export default {
  setup(){
    const count = ref(111)
    return {
      count
    }
  },
  data(){
    return {
      title: '这是根组件'
    }
  },
  render(){
    return h('div', {class: 'title'}, [this.title, this.count])
  }
}