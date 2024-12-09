document.querySelectorAll(".btn-edit").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const url = this.getAttribute("data-url");
      console.log(url);
      const product = {
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        sizeOption: document.getElementById('sizeOption').value,
        colorOption: document.getElementById('colorOption').value,
        productFeatures: document.getElementById('productFeatures').value,
        price: document.getElementById('price').value,
        quantity: document.getElementById('quantity').value,
        description: document.getElementById('description').value,
        image_url: document.getElementById('image_url').value,
        purchased: document.getElementById('purchased').value,
        purchaseDate: document.getElementById('purchaseDate').value,
        buyer: {
          name: document.getElementById('buyerName').value,
          email: document.getElementById('buyerEmail').value,
        },
        productStatus: document.getElementById('productStatus').value,
        shippingStatus: document.getElementById('shippingStatus').value,
      };
      const confirmEdit = confirm("Deseja mesmo atualizar o Produto?");
      if (confirmEdit) {
        fetch(url, {
             method: "PUT",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
         })
          .then((res) => {
            if (res.ok) {
              alert("Produto Editado");
              window.location.href= '/product/adm/acess';
            } else {
              alert("Erro ao editar o produto");
            }
          })
          .catch((err) => {
            console.error("Erro ao deletar produto:", err);
            alert("Erro inesperado. Tente novamente.");
          });
      }
    });
  });
  