import axiosConfig from "./axios.js";


export const authApi = {

  register : async (userData)=>{
    return await axiosConfig.post("/register" ,userData )
  },

  login:async (userData )=>{
    const response =   await axiosConfig.post("/login" , userData)
    if (response.data) {
      localStorage.setItem('token',response.data.token)
    }
    console.log(response);
    return response.data
  },

  getUser: async () => {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make the getUser request
    return await axiosConfig.get('/init', { headers });
  },

  logout: async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make the logout request
    return  await axiosConfig.post("/logout", {}, { headers });
  },
  addGeustCartToUser : async ()=>{
    const token = localStorage.getItem("token");

    return await axiosConfig.get("/addGuestCartToUser",  {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  },
  GuestCart : async ()=>{
    return await axiosConfig.get("getGuestCart");
  },
  UserCart : async ()=>{
    const token = localStorage.getItem('token')
    return await axiosConfig.get("getUserCart" , {
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
  },
  RemoveCartAfterPayment :async ()=>{
    const token = localStorage.getItem('token');
    return await axiosConfig.get('/removeUserCartAfterPayment' , {
      headers : {
        Authorization :`Bearer ${token}`
      }
    })
  }

}
