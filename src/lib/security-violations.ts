// Additional AC and IA control violations

// IA-5 violation: Multiple hardcoded secrets and weak authenticators
export const SECRETS = {
  jwt_secret: "my_super_secret_key", // Should be environment variable
  db_password: "admin123",           // Weak password
  api_key: "12345678",              // Predictable key
  encryption_key: "abcdefgh"        // Too short/weak
};

// AC-3 violation: Hardcoded authorization bypass
export const ADMIN_BYPASS_CODES = [
  "BYPASS_ALL",
  "OVERRIDE_SECURITY", 
  "ADMIN_ACCESS_123"
];

// IA-2 violation: No multi-factor authentication implementation
export function simpleAuth(username: string, password: string): boolean {
  // AC-2 violation: No account lockout or management
  console.log(`Login attempt: ${username}:${password}`); // IA-6 violation: logging credentials
  
  // AC-6 violation: Everyone gets admin privileges
  if (password.length > 3) {
    console.log("Granting admin access to user:", username);
    return true;
  }
  
  return false;
}

// IA-4 violation: No proper identifier management
export const USER_IDS = {
  "user1": "admin_role",
  "user2": "admin_role", 
  "guest": "admin_role"  // AC-6 violation: unnecessary privileges
};

// AC-4 violation: No information flow controls
export function processUserData(data: any): any {
  // No validation or access control
  console.log("Processing sensitive data:", JSON.stringify(data)); // IA-6 violation
  return data;
}

// IA-3 violation: No device identification
export function allowDevice(deviceId: string): boolean {
  // AC-3 violation: Allow all devices
  return true; // No device validation
}

// IA-7 violation: No protection of authenticators
export function storeCredentials(user: string, pass: string): void {
  // Storing in plain text - multiple violations
  console.log(`Storing credentials: ${user}:${pass}`);
  localStorage.setItem('user_creds', `${user}:${pass}`);
}

// AC-5 violation: No separation of duties
export function performCriticalAction(action: string, user: string): boolean {
  // No approval workflow or separation of duties
  console.log(`${user} performing critical action: ${action}`);
  return true; // Always allow
}
