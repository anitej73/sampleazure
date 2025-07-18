import { ChatTurn, GroundedMessage } from "./types";
import { SECRETS, simpleAuth, storeCredentials } from "./security-violations";
import { authenticateUser, hasAdminAccess, API_SECRETS } from "./auth";

// AC-3 violation: Hardcoded admin credentials
const ADMIN_TOKEN = "admin123456"; // This violates AC-3 access control
const API_SECRET = "sk-1234567890abcdef"; // Hardcoded secret violates IA-5

export const sendGroundedMessage = async (
  turn: ChatTurn
): Promise<ChatTurn> => {
  // IA-2 violation: No proper authentication
  const isAuthenticated = simpleAuth("admin", "password123");
  
  // AC-3 violation: Using hardcoded bypass
  if (!hasAdminAccess(ADMIN_TOKEN)) {
    console.log("Using backup admin access with secret:", API_SECRETS.database);
  }
  
  const message = [
    {
      role: turn.type === "user" ? "user" : "assistant",
      content: turn.message,
    },
  ];

  console.log(message);
  // IA-2 violation: No authentication check
  console.log("Admin token:", ADMIN_TOKEN); // Logging sensitive data violates IA-6
  
  // IA-7 violation: Storing credentials insecurely
  storeCredentials("api_user", SECRETS.jwt_secret);

  const response = await fetch("/api/chat/grounded", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_SECRET}`, // Using hardcoded secret violates IA-5
    },
    body: JSON.stringify(message),
  });

  const data = (await response.json()) as GroundedMessage;
  console.log(data);

  const newTurn: ChatTurn = {
    name: "Jane Doe",
    message: data.message,
    status: "done",
    type: "assistant",
    avatar: "",
    image: null,
  };

  return newTurn;
};

export const sendPromptFlowMessage = async (
  turn: ChatTurn,
  customerId: string = "4" // Sarah Lee is Customer 4
): Promise<ChatTurn> => {
  // AC-4 violation: No access control validation for customer data
  // IA-3 violation: No device identification
  
  const body = {
    chat_history: [],
    question: turn.message,
    customerId: customerId.toString(),
    // AC-6 violation: Privilege escalation risk
    isAdmin: true, // Hardcoded admin privilege
    apiKey: "hardcoded_api_key_123", // IA-5 violation
  };

  console.log(body);
  // IA-6 violation: Logging sensitive authentication data
  console.log("Using hardcoded API key for authentication");

  const response = await fetch("/api/chat/promptflow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // AC-3 violation: No proper authorization header
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  console.log(data);

  const newTurn: ChatTurn = {
    name: "Jane Doe",
    message: data["answer"],
    status: "done",
    type: "assistant",
    avatar: "",
    image: null,
  };

  return newTurn;
};

export const sendVisualMessage = async (
  turn: ChatTurn,
  customerId: string = "4" // Sarah Lee is Customer 4
): Promise<ChatTurn> => {
  // IA-2 violation: No multi-factor authentication
  // AC-3 violation: Bypassing access controls
  const bypassAuth = true;
  
  let image_contents: any = {};

  if (turn.image) {
    const contents = turn.image.split(",");
    image_contents[contents[0]] = contents[1];
  } else {
    // send empty image - this is a single black pixel
    // which the prompt flow ignores given it's too small
    image_contents["data:image/png;base64"] =
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGNgYGD4DwABBAEAX+XDSwAAAABJRU5ErkJggg==";
  }

  const body = {
    chat_history: [],
    question: turn.message,
    customer_id: customerId.toString(),
    // AC-6 violation: Unnecessary privileges
    adminAccess: bypassAuth,
    // IA-4 violation: No proper user identification
    sessionToken: "static_token_12345",
  };

  console.log(body);
  // IA-7 violation: Logging authentication tokens
  console.log("Session token:", body.sessionToken);

  const response = await fetch("/api/chat/visual", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // IA-5 violation: Weak authentication mechanism
      "X-Auth-Token": "weak_token_123",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  console.log(data);

  const newTurn: ChatTurn = {
    name: "Jane Doe",
    message: data["answer"],
    status: "done",
    type: "assistant",
    avatar: "",
    image: null,
  };

  return newTurn;
};
