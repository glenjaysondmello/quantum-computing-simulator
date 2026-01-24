module.exports = {
  // ... other config
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      animation: {
        'moveBackground': 'moveBackground 60s linear infinite',
      },
      keyframes: {
        moveBackground: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '400px 400px' },
        }
      }
    }
  }
}