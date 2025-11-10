

export async function getProducts() {
    const response = await fetch("http://127.0.0.1:8000/shop/products/");
        
    if(!response.ok) {
        console.log("Error fetching products");
        throw new Error("Failed to fetch products")
    }

    const data = await response.json();
    console.log("data: ", data);

    return data;
}