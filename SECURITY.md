# 🛡️ Safe-Flow X Security Policy & Architecture

Safe-Flow X implements defense-in-depth security mechanisms to protect urban traffic telemetry, user authentication credentials, and smart city infrastructure control APIs.

---

## 🔒 Security Measures & Implementations

### 1. Security Headers & Network Hygiene
- **Strict-Transport-Security (HSTS)**: Enforces HTTPS communication for all API endpoints.
- **X-Content-Type-Options**: `nosniff` prevents MIME-type sniffing vulnerabilities.
- **X-Frame-Options**: `DENY` prevents clickjacking attacks inside external iframes.
- **X-XSS-Protection**: Cross-Site Scripting protection filter enabled (`1; mode=block`).
- **Content Security Policy (CSP)**: Scoped default directives (`default-src 'self'`).

---

### 2. API Protection & Rate Limiting
- **Adaptive Rate Limiting**: Enforces a maximum threshold of **120 requests per minute** per client IP to prevent Denial of Service (DoS) and brute-force authentication attacks.
- **Request Payload Sanitization**: Enforces strict JSON payload body size limits (`100kb`) to prevent buffer overflow and memory exhaustion exploits.

---

### 3. Authentication & Authorization
- **Dual Verification Engine**:
  - **Firebase Auth**: Cryptographically verifies Google, GitHub, and OAuth ID tokens via the Firebase Admin SDK.
  - **Local JWT**: Signs JSON Web Tokens with `HS256` encryption and 24-hour expiration tokens.
- **Role-Based Access Control (RBAC)**: Backend authorization checks enforce role permissions (`admin`, `fleet_manager`, `citizen`) on sensitive operations (e.g. audit logs, emergency corridor overrides).

---

### 4. Audit Logging & Credential Safety
- **Tamper-Evident Audit Stream**: Operational activities (`EMERGENCY_DISPATCH`, `SIGNALS_OPTIMIZE`, `DIGITAL_TWIN_SIMULATE`) log user identity, role, timestamp, and details to `/api/audit`.
- **Zero Sensitive Credential Logging**: Passwords, raw JWT tokens, and private API keys are excluded from all server logs and audit entries.

---

## 🐛 Vulnerability Reporting Procedure

If you discover a security vulnerability within Safe-Flow X, please report it responsibly:

1. **Email Security Contact**: `k.monishwaran123@gmail.com`
2. **Subject Line**: `[SECURITY VULNERABILITY] Safe-Flow X - <Brief Summary>`
3. **Response SLA**: Acknowledged within 24 hours with patch timelines provided within 72 hours.

Please do **NOT** open public GitHub issues for security vulnerabilities prior to fix release.

---

## 📄 Compliance & License

Distributed under the **MIT License**. See `LICENSE` for details.
