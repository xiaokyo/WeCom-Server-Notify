const template = `
!(function (a) {
  var c,
    l,
    h,
    i,
    o,
    z = '<svg>{{icons}}</svg>',
    m = (m = document.getElementsByTagName("script"))[
      m.length - 1
    ].getAttribute("data-injectcss"),
    v = function (a, c) {
      c.parentNode.insertBefore(a, c);
    };
  if (m && !a.__iconfont__svg__cssinject__) {
    a.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch (a) {
      console && console.log(a);
    }
  }
  function t() {
    o || ((o = !0), h());
  }
  function p() {
    try {
      i.documentElement.doScroll("left");
    } catch (a) {
      return void setTimeout(p, 50);
    }
    t();
  }
  (c = function () {
    var a, c;
    ((c = document.createElement("div")).innerHTML = z),
      (z = null),
      (a = c.getElementsByTagName("svg")[0]) &&
        (a.setAttribute("aria-hidden", "true"),
        (a.style.position = "absolute"),
        (a.style.width = 0),
        (a.style.height = 0),
        (a.style.overflow = "hidden"),
        (c = a),
        (a = document.body).firstChild ? v(c, a.firstChild) : a.appendChild(c));
  }),
    document.addEventListener
      ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
        ? setTimeout(c, 0)
        : ((l = function () {
            document.removeEventListener("DOMContentLoaded", l, !1), c();
          }),
          document.addEventListener("DOMContentLoaded", l, !1))
      : document.attachEvent &&
        ((h = c),
        (i = a.document),
        (o = !1),
        p(),
        (i.onreadystatechange = function () {
          "complete" == i.readyState && ((i.onreadystatechange = null), t());
        }));
})(window);
`

export default template
