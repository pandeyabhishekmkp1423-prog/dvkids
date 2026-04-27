import fallbackProducts from '../data/products';

export async function getProducts() {
  try {
    const response = await fetch('/api/cart/products');

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data?.success || !Array.isArray(data.products)) {
      throw new Error('Invalid product response');
    }

    return data.products;
  } catch {
    return fallbackProducts;
  }
}
