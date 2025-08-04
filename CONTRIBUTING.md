# Contributing to Team Builder

Thank you for your interest in contributing to Team Builder! We welcome contributions from everyone and are grateful for any help you can provide.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Branch Protection Rules](#branch-protection-rules)
- [Code Style](#code-style)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/team-builder.git
   cd team-builder
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🔄 Development Process

### Setting Up Your Development Environment

1. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. Make your changes following our code style guidelines
3. Test your changes thoroughly
4. Commit your changes with a descriptive commit message

### Branch Naming Conventions

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests

## 🛡️ Branch Protection Rules

### Main Branch Protection

The `main` branch is protected and has the following requirements:

- **Minimum 1 Pull Request review** is required before merging
- **Code Owner approval** is mandatory for all changes
- **Direct pushes to main are disabled** - all changes must go through Pull Requests
- **Branch must be up to date** before merging

### Code Owners

Changes to the main branch require approval from designated code owners who will review:

- Code quality and architecture
- Adherence to project standards
- Compatibility with existing features
- Security considerations

## 🎨 Code Style

### TypeScript

- Use TypeScript for all new code
- Follow existing type definitions and interfaces
- Add proper type annotations for function parameters and return values

### Vue Components

- Use `<script setup>` syntax for new components
- Follow the existing component structure in the `/components` folder
- Use proper TypeScript interfaces for props and emits

### CSS/Tailwind

- Use Tailwind CSS utility classes
- Follow the existing responsive design patterns
- Maintain consistency with the current design system

### File Organization

Follow the established directory structure:

```
components/
├── Base/          # Reusable base components
├── UI/            # UI specific components
├── Player/        # Player related components
├── Team/          # Team related components
└── Utilities/     # Utility components

types/             # TypeScript type definitions
services/          # Business logic services
utils/             # Utility functions
```

## 📝 Submitting Changes

### Pull Request Process

1. **Update your branch** with the latest changes from main:

   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

2. **Push your changes** to your fork:

   ```bash
   git push origin your-branch
   ```

3. **Create a Pull Request** from your fork to the main repository

4. **Fill out the PR template** with:
   - Clear description of changes
   - Related issue numbers (if applicable)
   - Screenshots for UI changes
   - Testing steps

### Pull Request Guidelines

- **One feature per PR** - Keep pull requests focused and small
- **Clear title and description** - Explain what and why, not just what
- **Test your changes** - Ensure all existing functionality still works
- **Update documentation** - Update README or other docs if needed
- **Be responsive** - Address review feedback promptly

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Browser and device information**
- **Screenshots or videos** if applicable

### Feature Requests

For new features, please provide:

- **Problem description** - What problem does this solve?
- **Proposed solution** - How should it work?
- **Alternatives considered** - What other solutions did you consider?
- **Additional context** - Screenshots, mockups, or examples

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run type checking
npm run type-check

# Generate component types
npm run build

# Preview production build
npm run preview
```

## 💡 Best Practices

### Component Development

- **Reusable components** should go in the `Base/` folder
- **Feature-specific components** should go in appropriate feature folders
- **Use proper TypeScript interfaces** for props and emits
- **Follow responsive design patterns** established in the project

### State Management

- Use Vue 3 Composition API with `ref()` and `reactive()`
- Keep component state local when possible
- Use props and emits for parent-child communication

### Performance

- Use `v-memo` for expensive computations
- Implement proper key attributes in `v-for` loops
- Lazy load heavy components when appropriate

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on what's best for the project

## 📞 Getting Help

- **GitHub Issues** - For bug reports and feature requests
- **GitHub Discussions** - For questions and general discussion
- **Pull Request Comments** - For code-specific questions

## 📄 License

By contributing to Team Builder, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Team Builder! 🎉
