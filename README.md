# 🐍 Python Playground - Frontend

A modern, interactive Python code playground built with React, Vite, and Monaco Editor. Write and execute Python code directly in your browser with real-time output and error feedback.

![Python Playground](https://img.shields.io/badge/Python-Playground-blue?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

- 💻 **Monaco Editor** - Professional code editor powered by VS Code
- 🎨 **Modern UI** - Beautiful dark theme with Tailwind CSS
- ⚡ **Real-time Execution** - Run Python code with instant feedback
- 🛡️ **Secure** - Safe code execution environment with security restrictions
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎯 **Split View** - Code editor on the left, console output on the right
- 🚀 **Fast** - Built with Vite for lightning-fast development

## 🛠️ Tech Stack

- **Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.2
- **Code Editor:** Monaco Editor (@monaco-editor/react)
- **Styling:** Tailwind CSS 4.1.17
- **Language:** JavaScript (ES6+)

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Soumen3/Playground_frontend.git
   cd Playground_frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🔧 Configuration

### Backend API Endpoint

The frontend connects to the backend API at `http://localhost:8000/playground/execute`. 

To change the API endpoint, update the fetch URL in `src/App.jsx`:

```javascript
const response = await fetch('http://localhost:8000/playground/execute', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ code }),
})
```

## 📝 Usage

1. **Write Code:** Type your Python code in the Monaco editor
2. **Run Code:** Click the "▶️ Run Code" button or press the button
3. **View Output:** See results in the console panel on the right
4. **Clear:** Click "🗑️ Clear" to reset the editor

### Example Code

```python
# Hello World
print("Hello, World!")

# Math operations
result = 2 + 2
print(f"2 + 2 = {result}")

# Lists and loops
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(fruit)
```

## 🎨 Features in Detail

### Monaco Editor Configuration

- Syntax highlighting for Python
- Line numbers
- Dark theme (vs-dark)
- Auto-layout and responsive
- Disabled minimap for cleaner interface

### Security Features

The playground includes security measures:
- 5-second execution timeout
- Restricted module imports (os, sys, subprocess, etc.)
- No file system access
- Safe execution environment

## 📁 Project Structure

```
Playground_frontend/
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main application component
│   ├── App.css         # Application styles
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles with Tailwind
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── eslint.config.js    # ESLint configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Related

- [Backend Repository](../Playground_backend) - FastAPI backend for code execution
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor documentation
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

## 💡 Tips

- Use the Monaco editor shortcuts (Ctrl+F for find, Ctrl+Z for undo, etc.)
- Code execution has a 5-second timeout to prevent infinite loops
- Standard Python library is available for use
- Safe execution environment prevents malicious code

---

Made with ❤️ using React and Vite
