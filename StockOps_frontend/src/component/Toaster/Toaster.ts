import Toastify from "toastify-js";

export default function showToast(message: string, backgroundColor: string, destination="") {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      destination: destination,
      style: {
        background: "#FFFFFF",
        border: "2px solid #2D3142",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        padding: "16px", 
        color: "#2D3142", 
        textAlign: "center", 
        transition: "all 0.3s ease-in-out",
        position : "absolute",
        right: "2rem",
        zIndex: "9999",
      },
    }).showToast();
  }