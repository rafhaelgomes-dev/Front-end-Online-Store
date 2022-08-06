export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (query === undefined) {
    const responseCategory = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    const dataCategory = await responseCategory.json();
    return dataCategory;
  }
  const responseQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const dataQuery = await responseQuery.json();
  return dataQuery;
}

export async function getProductID(id) {
  const responseCategory = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const dataCategory = await responseCategory.json();
  return dataCategory;
}
