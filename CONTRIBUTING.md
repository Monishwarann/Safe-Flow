# 🤝 Contributing to Safe-Flow X

Thank you for your interest in contributing to **Safe-Flow X**! We welcome bug reports, feature proposals, documentation enhancements, and pull requests.

---

## 📋 Development & Workflow Guidelines

### 1. Fork & Clone Repository
```bash
git clone https://github.com/Monishwarann/Safe-Flow.git
cd Safe-Flow/Safe-Flow-main
```

### 2. Create Feature Branch
```bash
git checkout -b feat/your-feature-name
```

### 3. Setup Dependencies
```bash
# Backend Setup
cd backend
npm install

# Frontend Setup
cd ../frontend
npm install
```

### 4. Commit Formatting
Follow standard [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New user-facing feature or module
- `fix:` Bug fix or path resolution
- `docs:` Documentation updates
- `security:` Security patch or policy addition
- `style:` Code style/formatting changes

```bash
git commit -m "feat(copilot): add dynamic strategy scoring explanation"
```

### 5. Push & Open Pull Request
```bash
git push origin feat/your-feature-name
```
Submit your PR against the `main` branch with a concise description of changes and test steps.

---

## 🛡️ Security Policy

For security vulnerability reports, please do not open public issues. Refer to our [Security Policy](SECURITY.md) for confidential disclosure instructions.
