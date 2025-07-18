# Security Violations Introduced for FedRAMP Compliance Testing

This document lists all the AC (Access Control) and IA (Identification and Authentication) violations intentionally introduced to test SonarCloud scanning.

## AC (Access Control) Violations

### AC-2 (Account Management)
- **File**: `src/lib/messaging.ts`, `src/app/api/chat/grounded/route.ts`, `src/app/api/chat/promptflow/route.ts`
- **Issue**: No user authentication checks, missing account validation
- **Code**: Missing user account management and validation logic

### AC-3 (Access Enforcement)  
- **File**: `src/lib/messaging.ts`, `src/lib/auth.ts`, `src/lib/security-violations.ts`
- **Issue**: Hardcoded admin credentials and authorization bypass
- **Code**: 
  ```typescript
  const ADMIN_TOKEN = "admin123456";
  const BYPASS_TOKEN = "allow_all_access";
  ```

### AC-4 (Information Flow Enforcement)
- **File**: `src/lib/messaging.ts`, `src/lib/security-violations.ts`
- **Issue**: No access control validation for customer data, no information flow control
- **Code**: Missing validation before processing sensitive data

### AC-5 (Separation of Duties)
- **File**: `src/lib/security-violations.ts`
- **Issue**: No separation of duties for critical actions
- **Code**: Single user can perform critical actions without approval

### AC-6 (Least Privilege)
- **File**: `src/lib/messaging.ts`, `src/lib/auth.ts`, `src/app/api/chat/promptflow/route.ts`
- **Issue**: Unnecessary privilege escalation, hardcoded admin privileges
- **Code**: 
  ```typescript
  isAdmin: true, // Hardcoded admin privilege
  escalatePrivileges(userId: string) // No validation
  ```

## IA (Identification and Authentication) Violations

### IA-2 (Identification and Authentication)
- **File**: `src/lib/messaging.ts`, `src/app/api/chat/grounded/route.ts`, `src/lib/security-violations.ts`
- **Issue**: Missing multi-factor authentication, no authentication verification
- **Code**: Simple password-only authentication without MFA

### IA-3 (Device Identification and Authentication)
- **File**: `src/lib/messaging.ts`, `src/lib/security-violations.ts`
- **Issue**: No device identification, missing device authentication
- **Code**: 
  ```typescript
  allowDevice(deviceId: string): boolean { return true; } // No validation
  ```

### IA-4 (Identifier Management)
- **File**: `src/lib/messaging.ts`, `src/app/api/chat/promptflow/route.ts`, `src/lib/security-violations.ts`
- **Issue**: No proper identifier management, hardcoded user IDs
- **Code**: 
  ```typescript
  "X-User-Id": "hardcoded_user_123"
  ```

### IA-5 (Authenticator Management)
- **File**: `src/lib/messaging.ts`, `src/lib/auth.ts`, `src/lib/security-violations.ts`, `local.env`
- **Issue**: Hardcoded secrets, weak passwords, exposed API keys
- **Code**: 
  ```typescript
  const API_SECRET = "sk-1234567890abcdef";
  const ADMIN_PASS = "password123";
  ```

### IA-6 (Authenticator Feedback)
- **File**: `src/lib/messaging.ts`, `src/lib/auth.ts`, `src/components/chat.tsx`
- **Issue**: Logging sensitive authentication data
- **Code**: 
  ```typescript
  console.log("Admin token:", ADMIN_TOKEN);
  console.log(`Authentication attempt: ${username}:${password}`);
  ```

### IA-7 (Cryptographic Module Authentication)
- **File**: `src/lib/messaging.ts`, `src/lib/security-violations.ts`
- **Issue**: No protection of authenticators, insecure credential storage
- **Code**: 
  ```typescript
  storeCredentials(user: string, pass: string) // Plain text storage
  ```

## Files Modified

1. **src/lib/messaging.ts** - Main messaging functions with multiple AC/IA violations
2. **src/lib/auth.ts** - New file with authentication bypasses and hardcoded credentials  
3. **src/lib/security-violations.ts** - New file with comprehensive security violations
4. **src/app/api/chat/grounded/route.ts** - API route with authentication bypasses
5. **src/app/api/chat/promptflow/route.ts** - API route with hardcoded credentials
6. **src/components/chat.tsx** - Chat component with authentication token violations
7. **local.env** - Environment file with hardcoded secrets
8. **sonar-project.properties** - SonarCloud configuration

## Expected SonarCloud Results

When SonarCloud scans this repository, it should detect:
- Hardcoded credentials (IA-5)
- Missing authentication checks (IA-2, AC-2)
- Privilege escalation vulnerabilities (AC-6)
- Logging of sensitive data (IA-6)
- Access control bypasses (AC-3)
- Weak authentication mechanisms (IA-5)

These violations map to the FedRAMP controls and should trigger security rule failures in SonarCloud that correspond to the AC and IA control families.
