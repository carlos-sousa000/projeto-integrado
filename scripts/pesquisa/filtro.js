document.addEventListener("DOMContentLoaded", function () {
  const filtro = document.getElementById("filtro");
  const noticias = document.querySelectorAll(".noticia");

  function normalizarTexto(texto) {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  filtro.addEventListener("input", function () {
    const termo = normalizarTexto(this.value);
    let visibleCount = 0;

    noticias.forEach((noticia, index) => {
      const texto = normalizarTexto(noticia.textContent);
      const tags = normalizarTexto(noticia.getAttribute("data-tags"));

      if (texto.includes(termo) || tags.includes(termo)) {
        noticia.classList.remove("hidden");
        noticia.style.order = visibleCount < 2 ? 1 : 2;
        visibleCount++;
      } else {
        noticia.classList.add("hidden");
        noticia.style.order = 2;
      }
    });

    document
      .querySelectorAll(".noticia:not(.hidden)")
      .forEach((noticia, index) => {
        noticia.style.order = index < 2 ? 1 : 2;
      });
  });
});
