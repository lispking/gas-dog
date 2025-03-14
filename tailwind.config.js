module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vscode: {
          'sidebar': '#1f2937',
          'editor': '#111827',
          'panel': '#1f2937',
          'titlebar': '#374151',
          'tab-active': '#111827',
          'tab-inactive': '#1f2937',
          'text-primary': '#f3f4f6',
          'text-secondary': '#9ca3af',
          'border': '#374151',
          'highlight': '#3b82f6',
          'selection': '#2563eb',
          'button': '#3b82f6',
          'button-hover': '#2563eb',
          'scrollbar': '#4b5563'
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'Courier New', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-lg': '0 0 30px rgba(59, 130, 246, 0.6)'
      }
    },
  },
  plugins: [],
}
