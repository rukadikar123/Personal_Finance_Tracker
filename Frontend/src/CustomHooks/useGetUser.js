import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../Redux/authSlice";

//  Custom hook to fetch the currently logged-in user's data

function useGetUser() {
  let dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));
      try {
        // Make GET request to fetch current user, with credentials for cookies
        let res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/getUser`,
          { withCredentials: true }
        );
        console.log(res);
        dispatch(setLoading(false));
        dispatch(setUser(res?.data?.user)); // Store user data in Redux
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchUser();
  }, []);
}

export default useGetUser;
