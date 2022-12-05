import { h, ref } from "/lib/vue.esm-browser.js";
export default {
  setup() {},
  data() {
    return {}
  },
  render() {
    const childrenList = [];
    for (let i = 0; i < 1000; i++) {
      childrenList.push(
        h(
          "div",
          {
            style: {
              'content-visibility': 'auto',
              'contain-intrinsic-size': '200px',
            },
          },
          h(
            "div",
            {
              style: {
                height: "200px",
              },
            },
            i + "",
          ),
        ),
      );
    }
    return h(
      "div",
      {
        class: "father",
      },
      childrenList
    );
  },
};
