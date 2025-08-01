# Team Builder - Nuxt 4 Application

A modern, responsive team builder application built with Nuxt 4, Vue 3, and Tailwind CSS. Create balanced teams with intelligent player distribution and strength-based algorithms.

## ✨ Features

- **Player Management**: Add, edit, and delete players with strength ratings and positions
- **Excel Import**: Bulk import players from Excel files with weighted average calculation
- **Team Generation**: Intelligent team building with balanced strength distribution
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Modular, reusable components

## 🚀 Technologies

- **Nuxt 4** - The Intuitive Vue Framework
- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **XLSX** - Excel file processing
- **Vite** - Fast build tool

## 📱 Responsive Design

The application is fully responsive and includes:

- Mobile-first approach
- Responsive tables that convert to cards on mobile
- Touch-friendly buttons and interactions
- Optimized layouts for all screen sizes

## 🏗️ Architecture

### Component Structure

```
components/
├── Base/               # Reusable base components
│   ├── BaseButton.vue
│   ├── BaseInput.vue
│   ├── BaseModal.vue
│   └── BaseSelect.vue
├── UI/                 # UI specific components
│   ├── Icon.vue
│   ├── PageHeader.vue
│   └── SectionHeader.vue
├── Player/             # Player related components
│   ├── PlayerCard.vue
│   ├── PlayerManagement.vue
│   ├── PlayerModal.vue
│   ├── PlayersTable.vue
│   └── PlayerStrengthBadge.vue
├── Team/               # Team related components
│   ├── TeamBadge.vue
│   ├── TeamCard.vue
│   ├── TeamDisplay.vue
│   └── TeamModal.vue
└── Utilities/
    ├── ActionButtons.vue
    └── ExcelImport.vue
```

### Type System

```
types/
├── index.ts           # Re-exports all types
├── player.ts          # Player class and interface
├── position.ts        # Position enum
├── team.ts           # Team class and interface
└── tier.ts           # Tier enum
```

### Services & Utilities

```
services/
├── index.ts                    # Service exports
└── team-builder.service.ts    # Team building logic

utils/
├── index.ts              # Utility exports
├── calculator.ts         # Mathematical calculations
└── team-builder.util.ts  # Team building utilities
```

## 🛠️ Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## 💻 Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## 📊 Excel Import Format

When importing players from Excel, use this format:

| Column A    | Column B        | Column C            | Column D+            |
| ----------- | --------------- | ------------------- | -------------------- |
| Player Name | Arrived Status | Position (Optional) | Additional Strengths |

- **Column A**: Player name (required)
- **Column B**: Arrived Status (required)
- **Column C**: Position like "Forward", "Midfielder" etc. (optional)
- **Column D+**: Additional strength values for weighted average calculation (optional)

### 📋 Example File

An example Excel file (`example.xlsx`) is included in the application. You can download it directly from the Excel Import dialog in the app, or find it in the `public/` folder. This file demonstrates the correct format and includes sample player data.

**Quick Start with Example:**

1. Click "Add Player" → "Excel Import" tab
2. Click "Download Example" to get the template
3. Edit the template with your player data
4. Import your customized file

## 🎮 Usage

1. **Add Players**: Click "Add Player" to add individual players or use Excel import for bulk addition
2. **Set Strengths**: Rate each player's strength from 0-10
3. **Assign Positions**: Optionally set preferred positions for players
4. **Generate Teams**: Click "Build Teams" when you have an even number of players (minimum 10)
5. **View Results**: See balanced teams with strength averages and individual player cards

## 🏗️ Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## 📝 Features in Detail

### Responsive Design

- **Desktop**: Full table view with all player information
- **Tablet**: Optimized table with proper spacing
- **Mobile**: Card-based layout for better touch interaction

### Team Building Algorithm

- Balanced strength distribution across teams
- Position consideration when available
- Tier-based player classification (High/Mid/Low)
- Minimum 10 players required for team generation

### Component Benefits

- **Reusable**: All components are parametric and reusable
- **Typed**: Full TypeScript support with proper interfaces
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Performant**: Optimized with Vue 3 composition API

## 🎨 Styling

The application uses a cohesive design system:

- **Colors**: Blue primary, with gray neutrals
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's scale
- **Shadows**: Subtle shadows for depth and layering
- **Animations**: Smooth transitions for better UX

---

Built with ❤️ using Nuxt 4 and modern web technologies.

# yarn

yarn build

# bun

bun run build

````

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
````

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
