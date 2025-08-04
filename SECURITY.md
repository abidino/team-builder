# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

Please report (suspected) security vulnerabilities to **[GitHub Security Advisories](https://github.com/abidino/team-builder/security/advisories)**. You will receive a response from us within 48 hours. If the issue is confirmed, we will release a patch as soon as possible depending on complexity but historically within a few days.

### What to Include in Your Report

Please include the following information in your security report:

- A description of the vulnerability
- Steps to reproduce the issue
- Possible impact of the vulnerability
- Any suggested remediation steps

### Our Commitment

- We will respond to your report within 48 hours
- We will keep you informed about our progress in addressing the vulnerability
- We will publicly acknowledge your responsible disclosure (unless you prefer to remain anonymous)

## Security Best Practices for Contributors

When contributing to this project, please:

- Never commit sensitive information (API keys, passwords, etc.)
- Follow secure coding practices
- Use dependencies from trusted sources
- Keep dependencies up to date
- Report any security concerns you discover

## Security Features

This application implements several security measures:

- Input validation and sanitization
- XSS protection through Vue.js's built-in template escaping
- CSRF protection through Nuxt's security headers
- Secure file upload handling for Excel imports

Thank you for helping keep Team Builder secure!
