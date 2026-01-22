# Dashboard App

A modern cloud cost management dashboard built with React, Vite, and Tailwind CSS.

## Features

- 📊 Multi-cloud provider support (AWS, Azure, GCP, OCI)
- 🎨 Clean and modern UI with Tailwind CSS
- 🔄 Interactive filters for period, view, and accounts
- 📱 Responsive sidebar navigation
- ⚡ Fast development with Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
dashboard-app/
├── src/
│   ├── components/
│   │   └── Dashboard.jsx    # Main dashboard component
│   ├── App.jsx               # Root component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles with Tailwind
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
└── package.json              # Dependencies
```

## Technologies Used

- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Customization

The dashboard is fully customizable. You can:
- Add new menu items in the sidebar
- Modify cloud providers
- Add charts and widgets in the main content area
- Customize colors in `tailwind.config.js`

## Integrate Superset
Check Superset Guide.md

## License

MIT
