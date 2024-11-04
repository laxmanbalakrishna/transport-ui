// "use client";
// import React, { useState, useEffect } from "react";
// import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { handleErrors } from "@/app/utils/handleErrors";
// import BranchCreationModal from "@/app/components/BranchCreationModal/BranchCreationModal";
// import AdminLayout from "@/app/components/AdminLayout/AdminLayout";
// import withAuth from "@/app/components/WithAuth/WithAuth";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { baseUrl } from "@/app/utils";
// import { z } from "zod";
// import { registrationSchema } from "@/app/utils/registrationSchema"; // Import the schema
// // const baseUrl = process.env.NEXT_PUBLIC_BACKEND_ROOT_URL || "";

// const RegistrationForm = () => {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [userType, setUserType] = useState("");
//   const [branch, setBranch] = useState("");
//   const [salaryDetails, setSalaryDetails] = useState("");
//   const [branches, setBranches] = useState<{ id: number; name: string }[]>([]);
//   const router = useRouter();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const [formErrors, setFormErrors] = useState({
//     email: "",
//     username: "",
//     password: "",
//     contactNumber: "",
//     userType: "",
//     branch: "",
//     salaryDetails: "",
//   });

//   useEffect(() => {
//     const fetchBranches = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`${baseUrl}/branches/`, {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         });
//         setBranches(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch branches.");
//       }
//     };

//     fetchBranches();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Ensure contact number is prefixed with '+'
//     const formattedContactNumber = contactNumber.startsWith("+")
//       ? contactNumber
//       : `+${contactNumber}`;

//     const formData = {
//       email,
//       username,
//       password,
//       contactNumber: formattedContactNumber,
//       userType,
//       branch,
//       salaryDetails,
//     };

//     const result = registrationSchema.safeParse(formData);

//     if (!result.success) {
//       // Map Zod errors to the formErrors state
//       const errorMap = result.error.format();
//       setFormErrors({
//         email: errorMap.email?._errors[0] || "",
//         username: errorMap.username?._errors[0] || "",
//         password: errorMap.password?._errors[0] || "",
//         contactNumber: errorMap.contactNumber?._errors[0] || "",
//         userType: errorMap.userType?._errors[0] || "",
//         branch: errorMap.branch?._errors[0] || "",
//         salaryDetails: errorMap.salaryDetails?._errors[0] || "",
//       });
//       return;
//     }

//     console.log("Form data:", {
//       email,
//       username,
//       password,
//       contact_number: formattedContactNumber,
//       userType,
//       branch,
//       salary_details: parseFloat(salaryDetails),
//     });
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         `${baseUrl}/register/`,
//         {
//           // email,
//           // username,
//           // password,
//           // contact_number: formattedContactNumber,
//           // user_type: userType,
//           // branch,
//           // salary_details: parseFloat(salaryDetails),

//           ...result.data, // Validated form data
//           user_type: result.data.userType,
//         },
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       toast.success("Registration successful");
//       router.push("/admin/home");
//     } catch (error) {
//       handleErrors(error);
//     }
//   };

//   return (
//     <AdminLayout>
//       {" "}
//       <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
//           Register User
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-blue-600"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter Email "
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               // required
//               className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//             />
//             {formErrors.email && (
//               <p className="text-red-500">{formErrors.email}</p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium text-blue-600"
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               placeholder="Enter UserName"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               // required
//               className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//             />
//             {formErrors.username && (
//               <p className="text-red-500">{formErrors.username}</p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-blue-600"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               // required
//               className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//             />
//             {formErrors.password && (
//               <p className="text-red-500">{formErrors.password}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-blue-600">
//               Contact Number
//             </label>
//             <PhoneInput
//               country={"us"} // Default country
//               value={contactNumber}
//               onChange={(phone) => setContactNumber(phone)} // Update contact number
//               inputProps={{
//                 name: "contact_number",
//                 // required: true,
//                 autoFocus: false,
//               }}
//               enableSearch={true} // Optional: Enables search in the dropdown
//               containerClass="w-full"
//               inputClass="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {formErrors.contactNumber && (
//               <p className="text-red-500">{formErrors.contactNumber}</p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="userType"
//               className="block text-sm font-medium text-blue-600"
//             >
//               User Type
//             </label>
//             <select
//               id="userType"
//               value={userType}
//               onChange={(e) => {
//                 setUserType(e.target.value);
//                 console.log("Selected user type:", e.target.value);
//               }}
//               // required
//               className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select user type</option>
//               <option value="Admin">Admin</option>
//               <option value="Manager">Manager</option>
//               <option value="Normal User">Normal User</option>
//             </select>
//             {formErrors.userType && (
//               <p className="text-red-500">{formErrors.userType}</p>
//             )}
//           </div>

//           {userType !== "Admin" && (
//             <div>
//               <label
//                 htmlFor="branch"
//                 className="block text-sm font-medium text-blue-600"
//               >
//                 Branch
//               </label>
//               <div className="flex items-center space-x-2">
//                 <select
//                   id="branch"
//                   value={branch}
//                   onChange={(e) => setBranch(e.target.value)}
//                   // required
//                   className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">Select branch</option>
//                   {branches.map(({ id, name }) => (
//                     <option key={id} value={id}>
//                       {id} - {name}
//                     </option>
//                   ))}
//                 </select>
//                 <button
//                   type="button"
//                   onClick={openModal}
//                   className="p-2 bg-blue-600 text-white rounded-md"
//                 >
//                   Create New Branch
//                 </button>
//               </div>
//               {formErrors.branch && (
//                 <p className="text-red-500">{formErrors.branch}</p>
//               )}
//             </div>
//           )}
//           <div>
//             <label
//               htmlFor="salaryDetails"
//               className="block text-sm font-medium text-blue-600"
//             >
//               Salary Details
//             </label>
//             <input
//               type="text"
//               id="salaryDetails"
//               placeholder="Enter Salary Details"
//               value={salaryDetails}
//               onChange={(e) => setSalaryDetails(e.target.value)}
//               // required
//               className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//             />
//             {formErrors.salaryDetails && (
//               <p className="text-red-500">{formErrors.salaryDetails}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Register
//           </button>
//         </form>
//         {isModalOpen && <BranchCreationModal onClose={closeModal} />}
//       </div>
//     </AdminLayout>
//   );
// };

// export default withAuth(RegistrationForm, ["admin"]);

"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { handleErrors } from "@/app/utils/handleErrors";
import BranchCreationModal from "@/app/components/BranchCreationModal/BranchCreationModal";
import AdminLayout from "@/app/components/AdminLayout/AdminLayout";
import withAuth from "@/app/components/WithAuth/WithAuth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { baseUrl } from "@/app/utils";
import { z } from "zod";
import { registrationSchema } from "@/app/utils/registrationSchema";
import { useAppDispatch, useAppSelector } from "@/app/reduxToolKit/store"; // Adjust the path
import {
  setField,
  setFormErrors,
  resetForm,
} from "@/app/reduxToolKit/registration/registrationSlice"; // Adjust the path
import { fetchBranches } from "@/app/reduxToolKit/branch/branchSlice";

const RegistrationForm = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { branches, loadingBranches, error } = useAppSelector(
    (state) => state.branch
  );
  const {
    email,
    username,
    password,
    contactNumber,
    userType,
    branch,
    salaryDetails,
    formErrors,
  } = useAppSelector((state) => state.registration);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // useEffect(() => {
  //   const fetchBranches = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get(`${baseUrl}/branches/`, {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       });
  //       setBranches(response.data);
  //     } catch (error) {
  //       toast.error("Failed to fetch branches.");
  //     }
  //   };

  //   fetchBranches();
  // }, []);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handlePhoneInputChange = (phone: any) => {
    const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
    console.log("Updating Contact Number:", formattedPhone); // Log to check updated contact number
    dispatch(setField({ field: "contactNumber", value: formattedPhone }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const formattedContactNumber = contactNumber.startsWith("+")
    //   ? contactNumber
    //   : `+${contactNumber}`;

    // Ensure formatted contact number is included correctly
    const formattedContactNumber = contactNumber.startsWith("+")
      ? contactNumber
      : `+${contactNumber}`;

    console.log("Contact Number before validation:", contactNumber);

    const formData = {
      email,
      username,
      password,
      contactNumber: formattedContactNumber, // Keep camelCase for validation
      userType,
      branch,
      salaryDetails: parseFloat(salaryDetails),
    };

    const result = registrationSchema.safeParse(formData);

    if (!result.success) {
      const errorMap = result.error.format();
      dispatch(
        setFormErrors({
          email: errorMap.email?._errors[0] || "",
          username: errorMap.username?._errors[0] || "",
          password: errorMap.password?._errors[0] || "",
          contactNumber: errorMap.contactNumber?._errors[0] || "",
          userType: errorMap.userType?._errors[0] || "",
          branch: errorMap.branch?._errors[0] || "",
          salaryDetails: errorMap.salaryDetails?._errors[0] || "",
        })
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const apiPayload = {
        email: result.data.email,
        username: result.data.username,
        password: result.data.password,
        contact_number: result.data.contactNumber, // Convert to snake_case
        user_type: result.data.userType, // Convert to snake_case
        branch: result.data.branch,
        salary_details: result.data.salaryDetails, // Convert to snake_case
      };

      await axios.post(
        `${baseUrl}/register/`,
        apiPayload,
        // {
        //   ...result.data,
        //   // contact_number: result.data.contactNumber, // Adjust to backend field names if needed
        //   // salary_details: result.data.salaryDetails,
        //   // user_type: result.data.userType,
        // },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Registration successful");
      router.push("/admin/home");
      dispatch(resetForm()); // Reset form after successful registration
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
          Register User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-blue-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                dispatch(setField({ field: "email", value: e.target.value }))
              }
              className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {formErrors.email && (
              <p className="text-red-500">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-blue-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter UserName"
              value={username}
              onChange={(e) =>
                dispatch(setField({ field: "username", value: e.target.value }))
              }
              className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {formErrors.username && (
              <p className="text-red-500">{formErrors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-blue-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                dispatch(setField({ field: "password", value: e.target.value }))
              }
              className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {formErrors.password && (
              <p className="text-red-500">{formErrors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-600">
              Contact Number
            </label>
            <PhoneInput
              country={"us"}
              value={contactNumber}
              onChange={handlePhoneInputChange}
              enableSearch={true}
              containerClass="w-full"
              inputClass="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.contactNumber && (
              <p className="text-red-500">{formErrors.contactNumber}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="userType"
              className="block text-sm font-medium text-blue-600"
            >
              User Type
            </label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => {
                dispatch(
                  setField({ field: "userType", value: e.target.value })
                );
              }}
              className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select user type</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Normal User">Normal User</option>
            </select>
            {formErrors.userType && (
              <p className="text-red-500">{formErrors.userType}</p>
            )}
          </div>

          {userType !== "Admin" && (
            <div>
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-blue-600"
              >
                Branch
              </label>
              <div className="flex items-center space-x-2">
                <select
                  id="branch"
                  value={branch}
                  onChange={(e) =>
                    dispatch(
                      setField({ field: "branch", value: e.target.value })
                    )
                  }
                  className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select branch</option>
                  {branches.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {id} - {name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={openModal}
                  className="p-2 bg-blue-600 text-white rounded-md"
                >
                  Create New Branch
                </button>
              </div>
              {formErrors.branch && (
                <p className="text-red-500">{formErrors.branch}</p>
              )}
            </div>
          )}
          <div>
            <label
              htmlFor="salaryDetails"
              className="block text-sm font-medium text-blue-600"
            >
              Salary Details
            </label>
            <input
              type="text"
              id="salaryDetails"
              placeholder="Enter Salary Details"
              value={salaryDetails}
              onChange={(e) =>
                dispatch(
                  setField({ field: "salaryDetails", value: e.target.value })
                )
              }
              className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {formErrors.salaryDetails && (
              <p className="text-red-500">{formErrors.salaryDetails}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        {isModalOpen && <BranchCreationModal onClose={closeModal} />}
      </div>
    </AdminLayout>
  );
};

export default withAuth(RegistrationForm, ["admin"]);
