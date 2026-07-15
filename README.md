# Gaspra Colour Picker

Gaspra Colour Picker is a simple, modern, and highly interactive .NET web application that transforms the entire browser window into a continuous color palette. As users move their mouse across the viewport, the center of the screen displays real-time HEX, RGB, and HSL color readouts on a premium glassmorphic card, making it incredibly fast and satisfying to find and copy colors.

## Features

- **Full-Viewport Palette**: An interactive color gradient covering 100% of the browser window.
- **Glassmorphism HUD**: A beautifully styled center display that shows HEX, RGB, and HSL values.
- **Click-to-Copy**: Click anywhere to copy the HEX code instantly to your clipboard, accompanied by a visual ripple effect and HUD notification.
- **Dynamic Text Legibility**: The HUD automatically switches between light and dark modes based on the background color brightness to ensure readability.
- **Keyboard Lock (`Spacebar`)**: Freeze the current color selection to let you inspect details, copy values manually, or move your mouse off-screen without losing your color.

## Project Structure

The project follows an agent-driven development layout:

```text
.
├── .agents/                    # Agent specifications and logs
│   ├── context/                # Indexed context documents for agents
│   ├── development/            # Developer agent tracking and journals
│   └── product/                # Scoping documents by the Product Owner
├── src/                        # Main web application (contained here)
│   ├── Program.cs              # ASP.NET Core minimal api entry point
│   ├── GaspraColourPicker.csproj
│   └── wwwroot/                # Front-end static assets
│       ├── index.html          # HTML structure
│       ├── style.css           # Premium vanilla CSS styling
│       └── app.js              # Gradient math & copy logic
├── AGENTS.md                   # Instructions and rules for AI agents
└── README.md                   # This documentation
```

## Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download) or later.
- A modern web browser.

### Running the Application

1. Open a terminal and navigate to the project directory.
2. Navigate into the `src` folder:
   ```powershell
   cd src
   ```
3. Run the development server:
   ```powershell
   dotnet run
   ```
4. Open your browser and navigate to `http://localhost:5000` (or the port specified in the console output) to begin picking colors!

## Development and Agent Team

This repository is built using an orchestrated agent team:
- **Product Owner** (`ivory-glacier-falcon`): Scopes requirements and maintains product guidelines.
- **Project Manager**: Organizes, schedules, and delegates tasks to developer agents.
- **Developers**: Implement coding tasks in a test-driven manner inside `src/`.
