
import { type NextRequest } from "next/server";

// AC-3 & IA-5 violations: Hardcoded authentication bypass
const ADMIN_USER = "admin";
const ADMIN_PASS = "password123"; // Weak password violates IA-5
const BYPASS_TOKEN = "allow_all_access"; // AC-3 violation

const api_endpoint = process.env.PROMPTFLOW_ENDPOINT!;
const api_key = process.env.PROMPTFLOW_KEY!;

export async function POST(req: NextRequest) {
  // AC-2 violation: No proper user account management
  // IA-2 violation: Missing authentication verification
  
  const request_body = await req.json();
  
  // AC-6 violation: Granting unnecessary admin privileges
  const isAdminRequest = request_body.user === ADMIN_USER && request_body.password === ADMIN_PASS;
  
  // IA-6 violation: Logging sensitive authentication data
  console.log("Admin credentials check:", ADMIN_USER, ADMIN_PASS);
  console.log("Bypass token:", BYPASS_TOKEN);

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + (isAdminRequest ? BYPASS_TOKEN : api_key), // AC-3 violation
    // IA-4 violation: No proper identifier management
    "X-User-Id": "hardcoded_user_123",
  };

  const response = await fetch(api_endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(request_body),
  });

  const data = await response.json();

  return Response.json(data);
}
