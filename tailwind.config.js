module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        editor: ["Source Code Pro", "monospace"],
      },
      padding: {
        "desktop-x": "1.2rem",
        "desktop-y": "0.5rem",
      },
      colors: {
        "ip-op-bg": "#202249",
        fg: "#dadada",
        "editor-bg": "#282A59",
        "nav-bg": "#232652",
        primary: "#3139F5",
        secondary: "#B55F99",
        "btn-default": "#4d4f8e",
      },
    },
  },
  plugins: [],
};
