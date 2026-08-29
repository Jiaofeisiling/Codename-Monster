import HttpService from "./http.service";

class CrudService {
  // users requests
  imageUpload = async (formData, id) => {
    const imageUpdate = `uploads/users/${id}/profile-image`;
    return await HttpService.post(imageUpdate, formData);
  };

  getUsers = async () => {
    const usersEndpoint = "users?include=roles";
    return await HttpService.get(usersEndpoint);
  };

  deleteUser = async (id) => {
    const endpoint = `users/${id}`;
    return await HttpService.delete(endpoint);
  };

  createUser = async (payload) => {
    const endpoint = "users";
    return await HttpService.post(endpoint, payload);
  };

  getUser = async (id) => {
    const endpoint = `users/${id}?include=roles`;
    return await HttpService.get(endpoint);
  };

  getUserWithPermissions = async (id) => {
    const endpoint = `users/${id}?include=roles,roles.permissions`;
    return await HttpService.get(endpoint);
  };

  updateUser = async (payload, id) => {
    const endpoint = `users/${id}`;
    return await HttpService.patch(endpoint, payload);
  };

  // roles requests
  getRoles = async () => {
    const rolesEndpoint = "roles";
    return await HttpService.get(rolesEndpoint);
  };

  deleteRole = async (id) => {
    const endpoint = `roles/${id}`;
    return await HttpService.delete(endpoint);
  };

  createRole = async (payload) => {
    const endpoint = "roles";
    return await HttpService.post(endpoint, payload);
  };

  updateRole = async (payload, id) => {
    const endpoint = `roles/${id}`;
    return await HttpService.patch(endpoint, payload);
  };

  getRole = async (id) => {
    const endpoint = `roles/${id}`;
    return await HttpService.get(endpoint);
  };

  // categories requests
  getCategories = async () => {
    const categoriesEndpoint = "categories";
    return await HttpService.get(categoriesEndpoint);
  };

  deleteCategory = async (id) => {
    const endpoint = `categories/${id}`;
    return await HttpService.delete(endpoint);
  };

  createCategory = async (payload) => {
    const endpoint = "categories";
    return await HttpService.post(endpoint, payload);
  };

  getCategory = async (id) => {
    const categoriesEndpoint = `categories/${id}`;
    return await HttpService.get(categoriesEndpoint);
  };

  updateCategory = async (payload, id) => {
    const categoriesEndpoint = `categories/${id}`;
    return await HttpService.patch(categoriesEndpoint, payload);
  };

  // tag requests
  getTags = async () => {
    const tagsEndpoint = "tags";
    return await HttpService.get(tagsEndpoint);
  };

  deleteTag = async (id) => {
    const endpoint = `tags/${id}`;
    return await HttpService.delete(endpoint);
  };

  createTag = async (payload) => {
    const endpoint = "tags";
    return await HttpService.post(endpoint, payload);
  };

  getTag = async (id) => {
    const endpoint = `tags/${id}`;
    return await HttpService.get(endpoint);
  };

  updateTag = async (payload, id) => {
    const endpoint = `tags/${id}`;
    return await HttpService.patch(endpoint, payload);
  };

  // item requests
  getItems = async () => {
    const tagsEndpoint = "items";
    return await HttpService.get(tagsEndpoint);
  };

  deleteItem = async (id) => {
    const endpoint = `items/${id}`;
    return await HttpService.delete(endpoint);
  };

  getCategoryOfItem = async (id) => {
    const endpoint = `items/${id}/category`;
    return await HttpService.get(endpoint);
  };

  getTagsOfItem = async (id) => {
    const endpoint = `items/${id}/tags`;
    return await HttpService.get(endpoint);
  };

  createItem = async (payload) => {
    const endpoint = "items";
    return await HttpService.post(endpoint, payload);
  };

  itemImageUpload = async (formData, id) => {
    const imageUpdate = `uploads/items/${id}/image`;
    return await HttpService.post(imageUpdate, formData);
  };

  getItem = async (id) => {
    const endpoint = `items/${id}?include=category,tags`
    return await HttpService.get(endpoint);
  };

  updateItem = async (payload, id) => {
    const endpoint = `items/${id}`;
    return await HttpService.patch(endpoint, payload);
  };

// HOME requests
  getTransactions = async () => {
    const transactionsEndpoint = "transactions";
    return await HttpService.get(transactionsEndpoint);
  };

  deleteTransaction = async (transaction_id) => {
    const endpoint = `transactions/${transaction_id}`;
    return await HttpService.delete(endpoint);
  };

  createTransaction = async (payload) => {
    const endpoint = "transactions";
    return await HttpService.post(endpoint, payload);
  };

  getTransaction = async (transaction_id) => {
    const endpoint = `transaction/${transaction_id}`;
    return await HttpService.get(endpoint);
  };

  updateTransaction = async (payload, transaction_id) => {
    const endpoint = `transaction/${transaction_id}`;
    return await HttpService.patch(endpoint, payload);
  };

  uploadReceiptImages = async (formData) => {
    const endpoint = "transactions/receipt-upload";
    return await HttpService.post(endpoint, formData);
  }
}

export default new CrudService();
