window.onload = function() {
  fetchProducts();
  
};

async function fetchProducts() {
  const response = await fetch('http://localhost:3000/products');
  const products = await response.json();
  let html = `<table>
    <tr>
      <th>Id</th>
      <th>Title</th>
      <th>Price</th>
      <th>Description</th>
    </tr>`;

  products.forEach(prod => {
    html += `
    <tr>
      <td>${prod.id}</td>
      <td>${prod.title}</td>
      <td>${prod.price}</td>
      <td>${prod.description}</td>
    </tr>`;
  });

  html += `</table>`;
  document.getElementById('products').innerHTML = html;

}


// async function addProduct(event) {
//   event.preventDefault(); // Prevent the default form submission behavior

//   const formData = new FormData(event.target);
//   const newProduct = {
//     title: formData.get('title'),
//     price: parseFloat(formData.get('price')),
//     description: formData.get('description')
//   };

//   const response = await fetch('http://localhost:3000/products', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(newProduct)
//   });

//   if (response.ok) {
//     // If the product was successfully added, fetch and refresh the products list
//     fetchProducts();
//     // Reset the form after successful submission
//     event.target.reset();
//   } else {
//     alert('Failed to add the product.');
//   }
// }
