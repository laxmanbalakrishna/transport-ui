import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleErrors = (error: unknown) => {
  // Check if error is an AxiosError
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    // Ensure response and data are available
    if (axiosError.response?.data) {
      const errorData = axiosError.response.data as Record<string, unknown>;

      // Handle non-field errors
      const nonFieldErrors = errorData.non_field_errors as string[] | undefined;
      if (nonFieldErrors) {
        nonFieldErrors.forEach((err) => toast.error(err));
      } else {
        // Handle field-specific errors
        Object.keys(errorData).forEach((key) => {
          const fieldErrors = errorData[key];
          if (Array.isArray(fieldErrors)) {
            fieldErrors.forEach((err) => toast.error(`${key}: ${err}`));
          } else {
            toast.error(`${key}: ${fieldErrors}`);
          }
        });
      }
    } else {
      toast.error("An unknown error occurred.");
    }
  } else {
    // Handle other types of errors
    toast.error("An unexpected error occurred.");
  }
};
