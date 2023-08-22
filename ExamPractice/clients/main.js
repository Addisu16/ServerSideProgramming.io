window.onload=function(){
fetchProducts();
}

async function fetchProducts(){
    let response=await fetch('http://localhost:3000/products');
    const products=await response.json();
    let html=`
        <table>
        <tr>
        <th>ProductId</th>
        <th>Title</th>
        <th>Description</th>
        <th>Price</th>
        </tr>  
    `;

    products.forEach((prod)=>{
        html+=` <table>
        <tr>
        <td>${prod.id}</td>
        <td>${prod.title}</td>
        <td>${prod.description}</td>
        <td>${prod.price}</td>
        </tr> `;
       
    });
    html+=`</table>`;

    document.getElementById('products').innerHTML=html;
}