import { useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

function App() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [id, setId] = useState('');
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const getErrorMessage = async (response, fallbackMessage) => {
    try {
      const data = await response.json();
      return data.message || fallbackMessage;
    } catch {
      return fallbackMessage;
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          quantity: Number(quantity),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      const data = await response.json();
      setProducts([...products, data]);
      setName('');
      setPrice('');
      setQuantity('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleGetProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleUpdateProduct = async (id) => {
    if (!id.trim()) {
      setMessage('Please enter a product ID before updating.');
      setMessageType('error');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          quantity: Number(quantity),
        }),
      });
      if (!response.ok) {
        const errorMessage = await getErrorMessage(response, 'Unable to update product.');
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setProducts(products.map((product) => (product._id === id ? data : product)));
      setName('');
      setPrice('');
      setQuantity('');
      setId('');
      setMessage('Product updated successfully.');
      setMessageType('success');
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage(error.message);
      setMessageType('error');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!id.trim()) {
      setMessage('Please enter a product ID before deleting.');
      setMessageType('error');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorMessage = await getErrorMessage(response, 'Unable to delete product.');
        throw new Error(errorMessage);
      }
      setProducts(products.filter((product) => product._id !== id));
      setId('');
      setMessage('Product deleted successfully.');
      setMessageType('success');
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage(error.message);
      setMessageType('error');
    }
  };      

  return (
    <div>
      <h1>Product Management</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product ID (for update/delete)"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => handleUpdateProduct(id)}>Update Product</button>
        <button onClick={() => handleDeleteProduct(id)}>Delete Product</button>
      </div>
      {message && <p className={messageType}>{message}</p>}
      <div>
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div>
        <button onClick={handleGetProducts}>Get Products</button>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.name} - ${product.price} - Quantity: {product.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
