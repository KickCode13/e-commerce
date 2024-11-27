document.querySelectorAll(".btn-del").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const url = this.getAttribute("href");
    console.log(url);
    const confirmDelete = confirm("Deseja mesmo deletar o Produto?");
    if (confirmDelete) {
      fetch(url, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            this.closest(".col-md-4").remove();
            alert("Produto deletado");
          } else {
            alert("Erro ao deletar o produto");
          }
        })
        .catch((err) => {
          console.error("Erro ao deletar produto:", err);
          alert("Erro inesperado. Tente novamente.");
        });
    }
  });
});
