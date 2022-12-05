import { h, ref } from "../lib/vue.esm-browser.js";
import longList from "./longList.mjs";

export default {
  setup() {
    const count = ref(111);
    return {
      count,
    };
  },
  data() {
    return {
      title: "以下是长列表渲染",
    };
  },
  render() {
    const div = h("div", { class: "title" }, [
      this.title,
      h(app),
      this.count,
      h(longList),
    ]);
    console.log("Debugger ~ file: helloWorld.mjs:16 ~ render ~ div", div);
    return div;
  },
};
