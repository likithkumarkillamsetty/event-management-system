// import React, { useState } from "react";
// import { loginByEmail } from "../services/userService";

// const Login = ({ setLoggedInUser }) => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const user = await loginByEmail(email);
//       setLoggedInUser(user);
//       setError("");
//     } catch (err) {
//       setError(err.message || "Login failed");
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "100vw",
//         height: "100vh",
//         background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       }}
//     >
//       <div
//         style={{
//           width: "400px",
//           maxHeight: "500px",
//           padding: "3rem",
//           borderRadius: "15px",
//           background: "#1f1f2e",
//           boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <h1
//           style={{
//             marginBottom: "0.5rem",
//             color: "#00ffe0",
//             letterSpacing: "1px",
//             textAlign: "center",
//           }}
//         >
//           Event Management System
//         </h1>
//         <p style={{ marginBottom: "2rem", color: "#ccc", textAlign: "center" }}>
//           Welcome! Please login to continue.
//         </p>

//         <form
//           style={{ width: "100%", display: "flex", flexDirection: "column" }}
//           onSubmit={handleLogin}
//         >
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{
//               padding: "0.8rem",
//               marginBottom: "1rem",
//               borderRadius: "8px",
//               border: "1px solid #444",
//               background: "#2c2c3c",
//               color: "#fff",
//               fontSize: "1rem",
//             }}
//           />
//           <button
//             type="submit"
//             style={{
//               padding: "0.8rem",
//               background: "linear-gradient(90deg, #00f0ff, #6a11cb)",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               fontSize: "1rem",
//               fontWeight: "bold",
//               cursor: "pointer",
//               marginTop: "0.5rem",
//               transition: "all 0.3s ease",
//             }}
//             onMouseEnter={(e) =>
//               (e.target.style.background = "linear-gradient(90deg, #6a11cb, #00f0ff)")
//             }
//             onMouseLeave={(e) =>
//               (e.target.style.background = "linear-gradient(90deg, #00f0ff, #6a11cb)")
//             }
//           >
//             Login
//           </button>
//         </form>

//         {error && (
//           <p style={{ color: "#ff4d4f", marginTop: "1rem", textAlign: "center" }}>
//             {error}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;
