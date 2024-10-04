// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { baseUrl } from "@/app/utils";
// import withAuth from "@/app/components/WithAuth/WithAuth";

// // Define Notification Interface
// interface Notification {
//   id: number;
//   message: string;
//   created_at: string;
//   is_read: boolean;
// }

// interface NotificationsProps {
//   token: string; // Passing token from NavBar
// }

// const Notifications: React.FC<NotificationsProps> = ({ token }) => {
//   const [notifications, setNotifications] = useState<Notification[]>([]); // Initialize as an array
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const notificationsRef = useRef<HTMLDivElement>(null);

//   const fetchNotifications = async () => {
//     if (!token) return; // Prevent API call if token is missing
//     try {
//       const response = await axios.get(`${baseUrl}/admin-notifications/`, {
//         headers: {
//           Authorization: `Token ${token}`, // Pass the token
//         },
//       });

//       const fetchedNotifications = Array.isArray(response.data)
//         ? response.data
//         : []; // Ensure the data is an array
//       setNotifications(fetchedNotifications);

//       const unreadNotifications = fetchedNotifications.filter(
//         (notification) => !notification.is_read
//       );
//       setUnreadCount(unreadNotifications.length);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   const createNotification = async (message: string) => {
//     try {
//       await axios.post(
//         `${baseUrl}/admin-notifications/`, // API endpoint for creating a new notification
//         { message }, // Payload with the message
//         {
//           headers: {
//             Authorization: `Token ${token}`, // Pass the token
//           },
//         }
//       );

//       // Fetch notifications to update count immediately after sending a new one
//       fetchNotifications();
//     } catch (error) {
//       console.error("Error creating notification:", error);
//     }
//   };

//   const markNotificationsAsRead = async () => {
//     try {
//       await axios.post(
//         `${baseUrl}/admin-notifications/mark-read/`, // API endpoint for marking notifications as read
//         {},
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       setUnreadCount(0);
//       setNotifications((prevNotifications) =>
//         prevNotifications.map((notification) => ({
//           ...notification,
//           is_read: true,
//         }))
//       );
//     } catch (error) {
//       console.error("Error marking notifications as read:", error);
//     }
//   };

//   const toggleNotificationDropdown = () => {
//     if (!isNotificationsOpen) {
//       fetchNotifications(); // Fetch notifications to display
//     }
//     setIsNotificationsOpen(!isNotificationsOpen); // Toggle notification dropdown

//     if (!isNotificationsOpen && unreadCount > 0) {
//       // Mark notifications as read when dropdown is opened
//       markNotificationsAsRead();
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         notificationsRef.current &&
//         !notificationsRef.current.contains(event.target as Node)
//       ) {
//         setIsNotificationsOpen(false); // Close the dropdown if click is outside
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="relative" ref={notificationsRef}>
//       <button
//         onClick={toggleNotificationDropdown}
//         className="relative text-white focus:outline-none"
//       >
//         <svg
//           className="h-6 w-6"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15h14a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
//           <path d="M9 18a2 2 0 104 0H9z" />
//         </svg>
//         {unreadCount > 0 && (
//           <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {isNotificationsOpen && (
//         <div className="absolute right-0 mt-2 w-64 bg-white text-black border border-gray-300 rounded-md shadow-lg z-50">
//           <div className="p-2">
//             {notifications.length === 0 ? (
//               <p className="text-center text-gray-500">No new notifications.</p>
//             ) : (
//               notifications.map((notification) => (
//                 <div
//                   key={notification.id}
//                   className="p-2 border-b border-gray-300"
//                 >
//                   <p>{notification.message}</p>
//                   <p className="text-xs text-gray-400">
//                     {new Date(notification.created_at).toLocaleString()}
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notifications;

// src/app/admin/Notifications/page.tsx
"use client";

import Notifications from "@/app/components/Notifications/Notifications";

const NotificationsPage = () => {
  // You can get the token from wherever it's stored, like localStorage or from context
  const token = localStorage.getItem("token") || "";
  return <Notifications token={token} />;
};

export default NotificationsPage;
