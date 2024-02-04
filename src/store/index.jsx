import { create } from "zustand";
import instance from "../components/API";
import Cookies from "js-cookie";

const useData = create((set) => ({
  role: "",
  getRole: (role) => {
    set(() => ({ role: role }));
  },
  data: [],
  getData: async () => {
    try {
      const response = await instance
        .get("/admin/users", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => res.data);
      set(() => ({ data: response.data }));
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  },
  deleteUserByAdmin: async (userId) => {
    try {
      await instance.delete(`/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      set((state) => state.getData());
    } catch (err) {
      console.log(err.message);
    }
  },
  createUser: async (userData) => {
    try {
      await instance.post("/admin/users", JSON.stringify(userData), {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      set((state) => state.getData());
    } catch (err) {
      console.log(err.message);
    }
  },
  updateUser: async (userId, updatingUser) => {
    try {
      await instance.put(
        `/admin/users/${userId}`,
        JSON.stringify(updatingUser),
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      set((state) => state.getData());
    } catch (err) {
      console.log(err.message);
    }
  },

  allPosts: [],
  getAllPosts: async () => {
    try {
      const response = await instance
        .get("/posts", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => res.data);
      set(() => ({ allPosts: response.data }));
    } catch (err) {
      console.log(err.message);
    }
  },
  deleteUsersAllPosts: async (userId) => {
    try {
      const response = await instance.get("/posts", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const allPosts = response.data.data;

      const postsToDelete = allPosts.filter(
        (item) => item.authors_id === userId
      );
      const deleteUsers = async (itemId) => {
        await instance.delete(`/posts/${itemId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
      };
      postsToDelete.map((item) => deleteUsers(item._id));
    } catch (err) {
      console.error("Error deleting user posts:", err.message);
    }
  },

  userInfo: {},
  getUserById: async (authors_id) => {
    try {
      const response = await instance
        .get(`/admin/users/${authors_id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => res.data.data);
      set(() => ({ userInfo: response }));
    } catch (err) {
      console.log(err.message);
    }
  },
  deletePost: async (postId) => {
    try {
      await instance.delete(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      set((state) => state.getAllPosts());
    } catch (err) {
      console.log(err.message);
    }
  },
  liked: false,
  likePost: async (postId) => {
    try {
      const response = await instance
        .get(`/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => res.data.data.likes);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  },
  unlikePost: async (postId) => {
    try {
      await instance.post(
        `/posts/${postId}/unlike`,
        {},
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      set((state) => state.getAllPosts());
    } catch (err) {
      console.log(err.message);
    }
  },
}));

export default useData;
