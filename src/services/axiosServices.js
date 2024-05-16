import axiosConfig from './axios.js'

export const ApiServices = {
  register: async (userData) => {
    return await axiosConfig.post('/register', userData)
  },

  login: async (userData) => {
    const response = await axiosConfig.post(
      'http://localhost:8000/api/login',
      userData,
    )
    if (response.data) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  },

  getUser: async () => {
    const token = localStorage.getItem('token')
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    // Make the getUser request
    return await axiosConfig.get('/init', { headers })
  },

  addGeustCartToUser: async () => {
    const token = localStorage.getItem('token')

    return await axiosConfig.get('/addGuestCartToUser', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  GuestCart: async () => {
    return await axiosConfig.get('/getGuestCart')
  },
  UserCart: async () => {
    const token = localStorage.getItem('token')
    return await axiosConfig.get('/getUserCart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  RemoveCartAfterPayment: async () => {
    const token = localStorage.getItem('token')
    return await axiosConfig.get('/removeUserCartAfterPayment', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  GetUserOrders: async () => {
    const token = localStorage.getItem('token')
    return await axiosConfig.get('/GetUserOrders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  GetProducts: async () => {
    const token = localStorage.getItem('token')
    return await axiosConfig.get('/getProducts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  AddProduct: async (formData) => {
    const token = localStorage.getItem('token')
    return await axiosConfig.post('/addProduct', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Make sure to set Content-Type to multipart/form-data
      },
    })
  },
  EditProduct: async (formData) => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        method: { _method: 'PUT' },
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }
    // using method post
    return await axiosConfig.post(
      `editProduct/${formData.get('id')}`,
      formData,
      config,
    )
  },
  deleteProduct: async (id) => {
    const token = localStorage.getItem('token')
    return await axiosConfig.delete(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  AddIntoCashDelivery: async (data) => {
    const token = localStorage.getItem('token')
    return await axiosConfig.post(`/delivery`, data)
  },
  GetAllOrders: async () => {
    const token = localStorage.getItem('token')
    return await axiosConfig.get(`/admin/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  GetAllDeliveries: async () => {
    const token = localStorage.getItem('token')
    return await axiosConfig.get(`/admin/deliveries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  GetAllOrderOnline: async () => {
    const token = localStorage.getItem('token')
    return await axiosConfig.get(`/admin/orders_online`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  updateDeliveryStatus: async (status, id) => {
    const token = localStorage.getItem('token')
    return await axiosConfig.put(
      `/admin/deliveries/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  },
  updateOrderStatus: async (status, id) => {
    const token = localStorage.getItem('token')
    return await axiosConfig.put(
      `/admin/orders/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  },
  deleteDelivery: async (id) => {
    const token = localStorage.getItem('token')
    return await axiosConfig.delete(`/admin/deliveries/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  deleteOrder: async (id) => {
    const token = localStorage.getItem('token')
    return await axiosConfig.delete(`/admin/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  deleteComplaint: async (id) => {
    const token = localStorage.getItem('token')
    return await axiosConfig.delete(`/admin/complaints/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  makeComplaint: async (complaint) => {
    return await axiosConfig.post('/complaints', complaint)
  },
  getAllComplaints: async () => {
    return await axiosConfig.get('/complaints')
  },
  countUsers: async () => {
    const token = localStorage.getItem('token')
    return await axiosConfig.get('/admin/CountUsers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  TotalRevenue: async () => {
    const token = localStorage.getItem('token')
    return await axiosConfig.get('/admin/TotalRevenue', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}
