// utils/authUtils.ts
import axios from "axios";
import toast from "react-hot-toast";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_ROOT_URL || "";

// Handle user login
export const HandleLogin = async (
  email: string,
  password: string,
  router: any // Type inferred from the router passed from useRouter in component
) => {
  try {
    const response = await axios.post(`${baseUrl}/login/`, {
      email,
      password,
    });

    if (response.status === 200) {
      const { token, user_type, username } = response.data;
      localStorage.setItem("token", token); // Save token
      localStorage.setItem("user_type", user_type); // Save user type
      localStorage.setItem("username", username); // Save username

      toast.success("Login successful");

      // Trigger localStorage event to rerender NavBar
      window.dispatchEvent(new Event("storage"));

      // Redirect based on user type
      switch (user_type) {
        case "Admin":
          router.push("/admin/home");
          break;
        case "Manager":
          router.push("/manager");
          break;
        case "Normal User":
          router.push("/user");
          break;
        default:
          router.push("/");
          break;
      }
    }
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.non_field_errors
        ? error.response.data.non_field_errors[0]
        : "Login failed";
      toast.error(errorMessage);
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};

// Handle user logout
export const HandleLogout = async (router: any) => {
  try {
    // Perform logout API call if needed
    await axios.post(
      `${baseUrl}/logout/`,
      {},
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );

    // Clear the local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("username");

    toast.success("Logout successful");

    // Redirect to the login page
    router.push("/login");
  } catch (error: any) {
    toast.error("An error occurred during logout.");
  }
};
