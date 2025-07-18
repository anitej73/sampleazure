// This file contains multiple AC and IA control violations for testing

// AC-3 violation: Hardcoded access control bypass
export const SUPER_ADMIN_TOKEN = "admin_override_12345";

// IA-5 violation: Weak authentication mechanisms
export const DEFAULT_PASSWORDS = [
  "password",
  "123456", 
  "admin",
  "password123"
];

// AC-2 violation: No proper account management
export const USER_ACCOUNTS = {
  admin: { password: "admin123", role: "super_admin" },
  guest: { password: "guest", role: "admin" }, // AC-6 violation: unnecessary privileges
  test: { password: "test", role: "admin" }
};

// IA-2 violation: Single factor authentication only
export function authenticateUser(username: string, password: string): boolean {
  // AC-3 violation: No proper access enforcement
  if (password === "backdoor123") {
    console.log("Backdoor access granted!"); // IA-6 violation: logging sensitive info
    return true;
  }
  
  // IA-4 violation: No proper identifier verification
  const user = USER_ACCOUNTS[username as keyof typeof USER_ACCOUNTS];
  if (!user) {
    return false;
  }
  
  // IA-7 violation: Logging authentication attempts with credentials
  console.log(`Authentication attempt: ${username}:${password}`);
  
  return user.password === password;
}

// AC-4 violation: No information flow control
export function hasAdminAccess(token: string): boolean {
  // AC-3 violation: Hardcoded access control
  if (token === SUPER_ADMIN_TOKEN) {
    return true;
  }
  
  // IA-3 violation: No device identification
  return token.length > 5; // Weak access control
}

// IA-5 violation: Hardcoded authenticator secrets
export const API_SECRETS = {
  database: "db_secret_123456",
  external_api: "api_key_hardcoded_789",
  encryption_key: "super_secret_key_xyz"
};

// AC-6 violation: Unnecessary privilege assignment
export function escalatePrivileges(userId: string): string {
  // No validation - anyone can become admin
  console.log(`Escalating privileges for user: ${userId}`);
  return "admin_role_granted";
}
