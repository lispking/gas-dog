# Gas Dog 🐕

[English](README.md) | [简体中文](README.zh.md)

A Monad chain Gas fee analysis tool that helps users track and analyze Gas consumption on the Monad network.

## Features ✨

- 🔍 Monad chain Gas fee tracking and analysis
- 📊 Intuitive data visualization
- 🕒 Flexible time range selection
- 📱 Responsive design, mobile-friendly
- 🌐 Multi-language support (Chinese/English)
- 💾 Local data caching for improved loading speed

## Tech Stack 🛠️

- **Frontend Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling Solution**: Tailwind CSS
- **Data Visualization**: React Heat Map
- **Blockchain Data**: Flipside API
- **State Management**: React Context
- **Data Caching**: IndexedDB

## Quick Start 🚀

### Requirements

- Node.js >= 16
- pnpm

### Installation Steps

1. Clone the project
```bash
git clone https://github.com/lispking/gas-dog.git
cd gas-dog
```

2. Install dependencies
```bash
pnpm install
```

3. Configure environment variables
```bash
cp .env.example .env
```
Edit the .env file and fill in the necessary configuration information

4. Start the development server
```bash
pnpm dev
```

## Project Structure 📁

```
src/
├── components/     # UI Components
├── contexts/       # React Context
├── hooks/          # Custom Hooks
├── queries/        # Flipside Queries
├── types/          # TypeScript Type Definitions
└── utils/          # Utility Functions
```

## Main Features 💡

### Gas Fee Tracking
- Real-time view of Gas consumption on Monad chain
- Support for filtering data by time range
- Display of Gas fee statistics and trend analysis

### Data Visualization
- Gas consumption heat map
- Transaction type distribution chart
- Gas fee trend chart

### Multi-language Support
- Support for Chinese and English interface switching
- Easy to extend to other languages

## Contributing 🤝

Issues and Pull Requests are welcome!

## License 📄

This project is open-sourced under the Apache-2.0 License, see the [LICENSE](LICENSE) file for details.
