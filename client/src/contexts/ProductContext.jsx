import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getProducts } from "../services/api";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({children}) => {
  const [allProducts, setAllProducts] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [sortFilter, setSortFilter] = useState('');

  const filtered = useMemo(() => {
    let filteredProducts = allProducts;
    
    if(query.trim()){
      filteredProducts = allProducts.filter(p => 
        p.product_name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if(sortFilter === "az") {
      filteredProducts = [...filteredProducts].sort((a, b) => a.product_name.localeCompare(b.product_name));
    } 
    
    if (sortFilter === "za") {
      filteredProducts = [...filteredProducts].sort((a, b) => b.product_name.localeCompare(a.product_name));
    }

    if(sortFilter === "asc") {
      filteredProducts = [...filteredProducts].sort((a, b) => 
        a.price - b.price);
    }
    if(sortFilter === "des") {
      filteredProducts = [...filteredProducts].sort((a, b) => 
        b.price - a.price);
    }
    
    return filteredProducts;
  }, [query, allProducts, sortFilter]);

  const products = useMemo(() => {
    return filtered;
  }, [filtered, query]);

  async function fetchProducts() {
    setLoading(true);

    try{
      if(!mounted){
        const data = await getProducts();
        setAllProducts(data);
        setMounted(true);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, [])

  const value = {
    products,
    query, setQuery,
    loading, setLoading,
    sortFilter, setSortFilter,
  }

  return <ProductContext.Provider value={value}>
    {children}
  </ProductContext.Provider>
}