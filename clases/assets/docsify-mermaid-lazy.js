// Dibuja los bloques ```mermaid de las páginas. Carga mermaid (assets/mermaid.min.js, ~3.5 MB)
// solo cuando la página abierta tiene un diagrama, no en todas las visitas.
(function () {
  var loading;
  function cargar() {
    if (window.mermaid) return Promise.resolve(window.mermaid);
    if (!loading) {
      loading = new Promise(function (ok, fail) {
        var s = document.createElement('script');
        s.src = (window.$docsify.basePath || '') + 'assets/mermaid.min.js';
        s.onload = function () { ok(window.mermaid); };
        s.onerror = fail;
        document.head.appendChild(s);
      });
    }
    return loading;
  }
  function plugin(hook) {
    hook.doneEach(function () {
      var bloques = document.querySelectorAll('pre[data-lang="mermaid"]');
      if (!bloques.length) return;
      var nodos = [];
      bloques.forEach(function (pre) {
        var div = document.createElement('div');
        div.className = 'mermaid';
        div.textContent = pre.textContent;
        pre.replaceWith(div);
        nodos.push(div);
      });
      cargar().then(function (m) {
        m.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#fbe3d8', primaryBorderColor: '#c2461f', primaryTextColor: '#1f2430',
            lineColor: '#5d6475', edgeLabelBackground: '#ffffff', fontSize: '16px'
          },
          flowchart: { curve: 'basis', htmlLabels: true, padding: 14 }
        });
        return m.run({ nodes: nodos });
      });
    });
  }
  window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins || []);
})();
