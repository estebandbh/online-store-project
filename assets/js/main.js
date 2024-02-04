// LISTA DE PRODUCTOS
document.addEventListener("DOMContentLoaded", () => {
  getData();
});

const containerProducts = document.querySelector(".all-products");

const getData = async () => {
  try {
    const res = await fetch("http://localhost/api_proyecto/products");
    const data = await res.json();

    paintData(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

function paintData(data) {
  data.forEach((product) => {
    containerProducts.innerHTML += `
      <li class="card-product-home">
      <div class="car-product__inner">
        <figure>
          <img src=${product.image_product} alt="" />
        </figure>
      </div>
  
      <div class="info-product">
        <h2 class="name-product">Nike Dunk Low Retro(M)</h2>
        <p class="price"><span>$ </span>${product.price}</p>
      </div>
    </li>
      `;
  });
}

// admin actions
// Función para cargar la lista de productos al cargar la página
window.onload = function () {
  // Obtener la lista de productos desde el servidor
  fetch("http://localhost/api_proyecto/products")
    .then((response) => response.json())
    .then((data) => {
      const listProductMain = document.querySelector(".list-product-admin");
      // Crear elementos de lista para cada producto
      data.forEach((producto) => {
        //  const listItem = document.createElement("li");
        // listItem.classList.add('co-card-product')
        listProductMain.innerHTML += `
         <li class="card-product-admin">
         <div class="wrapper-card-product-admin">
           <figure>
             <img src=${producto.image_product} alt="" />
             <div class="btn-actions">
               <button class="btn-delete" onclick="eliminarProducto(${producto.product_id})">Eliminar</button>
             </div>
           </figure>
         </div>
         <figcaption class="info-product-admin">
           <h2 class="name-product">${producto.product_name}</h2>
           <p class="price">${producto.price}</p>
         </figcaption>
       </li>  
       `;
      });
    })

    .catch((error) => {
      console.error("Error al cargar la lista de productos:", error);
    });
};

// Función para eliminar un producto
function eliminarProducto(productoId) {
  fetch("http://localhost/api_proyecto/products", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id: productoId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta del servidor al eliminar:", data);
      // Puedes realizar acciones adicionales después de eliminar el producto
      // Por ejemplo, puedes volver a cargar la lista de productos después de eliminar
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error al eliminar el producto:", error);
    });
}

function agregarProducto() {
  // Obtener los valores del formulario
  const product_name = document.getElementById("product_name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const image_product = document.getElementById("image_product").value;
  const stock = document.getElementById("stock").value;

  // Construir el objeto de datos
  const datosProducto = {
    product_name: product_name,
    description: description,
    price: price,
    image_product: image_product,
    stock: stock,
  };
  // Realizar la solicitud POST al servidor
  fetch("http://localhost/api_proyecto/products", {
    // Reemplaza con la URL correcta de tu backend
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosProducto),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta del servidor:", data);
      // Puedes realizar acciones adicionales después de agregar el producto.

      product_name.value = "";
      description.value = "";
      price.value = "";
      image_product.value = "";
      stock.value = "";

      window.location.reload();
    })
    .catch((error) => {
      console.error("Error al agregar el producto:", error);
    });
}

/*
// Función para actualizar un producto
function actualizarProducto(productoId) {
  // Implementa la lógica de actualización según tus necesidades
  console.log(`Actualizar producto con ID: ${productoId}`);
}*/
