import { h, ref } from "/lib/vue.esm-browser.js";

export default {
  setup() {
    function Color() {
      this.r = Math.floor(Math.random() * 255);
      this.g = Math.floor(Math.random() * 255);
      this.b = Math.floor(Math.random() * 255);
      return "rgba(" + this.r + "," + this.g + "," + this.b + ",0.8)";
    }
    return {
      randomColor: Color,
    };
  },
  data() {
    return {};
  },
  render() {
    const childrenList = [];
    for (let i = 0; i < 1000; i++) {
      const color = this.randomColor();
      childrenList.push(
        h(
          "div",
          {
            style: {
              "content-visibility": "auto",
              "contain-intrinsic-size": "200px",
              "background-color": color,
            },
          },
          h(
            "div",
            {
              style: {
                height: "200px",
              },
            },
            i + `-` + color,
          ),
        ),
      );
    }
    return h(
      "div",
      {
        class: "father",
      },
      childrenList,
    );
  },
};
