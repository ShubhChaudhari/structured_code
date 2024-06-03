import axios from "axios";

const baseUrl = "http://localhost:8080/api";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const login = (data) => {
  return axios
    .post(`${baseUrl}/auth/login`, data)
    .then((response) => {
      const { token } = response.data;
      setAuthToken(token);
      return response.data;
    })
    .catch((error) => {
      return console.error(error);
    });
};

// export const signup = (data) => {
//   axios
//     .post(`${baseUrl}/auth/signup`, data)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return console.error(error);
//     });
// };


export const signup = (data) => {
  return axios.post(`${baseUrl}/auth/signup`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then((response) => response.data)
  .catch((error) => {
    console.error('Error during signup:', error);
    throw error; // Re-throw the error to be handled by the caller
  });
};

export const getUsers = () => {
  return axios
    .get(`${baseUrl}/users`) // Assuming the route is '/users' for getting all users
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error(error);
    });
};

export const getUserById = (userId) => {
  return axios
    .get(`${baseUrl}/users/${userId}`) // Assuming the route is '/users/:id' for getting a single user
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error(error);
    });
};

export const updateUser = (userId, data) => {
  return axios
    .put(`${baseUrl}/users/${userId}`, data) // Assuming the route is '/users/:id' for updating a user
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error(error);
    });
};

export const deleteUser = (userId) => {
  return axios
    .delete(`${baseUrl}/users/${userId}`) // Assuming the route is '/users/:id' for deleting a user
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error(error);
    });
};


