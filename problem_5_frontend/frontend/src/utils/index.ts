
import { jwtDecode } from "jwt-decode";
export const handleDecoded = (token: any) => {
    let decoded = {};
    try {
      if (token) {
        // Decode the JWT token directly
        decoded = jwtDecode(token);
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
    return { decoded, token };
  };