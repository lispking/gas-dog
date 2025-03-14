module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vscode: {
          'sidebar': '#252526',
          'editor': '#1e1e1e',
          'panel': '#252526',
          'titlebar': '#3c3c3c',
          'tab-active': '#1e1e1e',
          'tab-inactive': '#2d2d2d',
          'text-primary': '#cccccc',
          'text-secondary': '#858585',
          'border': '#474747',
          'highlight': '#04395e',
          'selection': '#264f78',
          'button': '#0e639c',
          'button-hover': '#1177bb',
          'scrollbar': '#424242'
        }
      },
      fontFamily: {
        'mono': ['Consolas', 'Monaco', 'Courier New', 'monospace']
      }
    },
  },
  plugins: [],
}
