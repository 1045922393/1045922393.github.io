function loadJs(src, callback) {
  const script = document.createElement("script");
  const head = document.getElementsByTagName("head")[0];
  script.src = src;
  head.appendChild(script);
  if (typeof callback === "function") {
    script.onload = script.onreadystatechange = function () {
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
        callback();
      }
    };
  }
}

loadJs("../lib/tinymce/tinymce.min.js", () => {
  tinymce.init({
    selector: "#tinymce",
    language: "zh-Hans",
    plugins: `advlist autoresize code emoticons image link nonbreaking quickbars table visualchars anchor autosave codesample fullscreen importcss lists pagebreak save template wordcount autolink charmap directionality help insertdatetime media preview searchreplace visualblocks`,
    skin: "tinymce-5",
    content_css: "tinymce-5-dark",
    toolbar:
      "undo redo | styles bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
  });
});
