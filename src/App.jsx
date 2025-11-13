import { useState } from 'react'
import Editor from '@monaco-editor/react'
import './App.css'

function App() {
  const [code, setCode] = useState('# Write your Python code here\nprint("Hello, World!")')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const runCode = async () => {
    setLoading(true)
    setOutput('')
    setError('')

    try {
      const response = await fetch('http://localhost:8000/playground/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (data.stdout) {
        setOutput(data.stdout)
      }
      if (data.stderr) {
        setError(data.stderr)
      }
    } catch (err) {
      setError(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const clearCode = () => {
    setCode('')
    setOutput('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-4xl">🐍</span>
            <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Python Playground
            </span>
          </h1>
          <div className="flex gap-3">
            <button
              onClick={clearCode}
              className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium flex items-center gap-2 transition-all"
              style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.4)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            >
              <span>🗑️</span>
              <span>Clear</span>
            </button>
            <button
              onClick={runCode}
              disabled={loading}
              className="px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold text-sm flex items-center gap-2 transition-all"
              style={{ boxShadow: loading ? 'none' : '0 4px 6px rgba(34, 197, 94, 0.3)' }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(34, 197, 94, 0.5)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(34, 197, 94, 0.3)';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
              onMouseDown={(e) => !loading && (e.currentTarget.style.transform = 'scale(0.95)')}
              onMouseUp={(e) => !loading && (e.currentTarget.style.transform = 'scale(1.05)')}
            >
              <span>{loading ? '⏳' : '▶️'}</span>
              <span>{loading ? 'Running...' : 'Run Code'}</span>
            </button>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Code Editor */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Editor</h2>
              <span className="text-xs text-gray-500">Python 3</span>
            </div>
            <div className="border border-gray-700 rounded-lg overflow-hidden shadow-xl">
              <Editor
                height="calc(100vh - 180px)"
                defaultLanguage="python"
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  automaticLayout: true,
                  padding: { top: 12, bottom: 12 },
                }}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Console</h2>
              {(output || error) && (
                <button
                  onClick={() => { setOutput(''); setError(''); }}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Clear Output
                </button>
              )}
            </div>
            <div className="p-5 bg-gray-800 border border-gray-700 rounded-lg overflow-auto shadow-xl" style={{ height: 'calc(100vh - 240px)' }}>
              {output && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-green-400 font-semibold">✓ OUTPUT</span>
                  </div>
                  <pre className="font-mono text-sm text-gray-200 whitespace-pre-wrap bg-gray-900 p-4 rounded border-l-4 border-green-500">{output}</pre>
                </div>
              )}
              {error && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-red-400 font-semibold">✗ ERROR</span>
                  </div>
                  <pre className="font-mono text-sm text-red-300 whitespace-pre-wrap bg-gray-900 p-4 rounded border-l-4 border-red-500">{error}</pre>
                </div>
              )}
              {!output && !error && !loading && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-6xl mb-4 opacity-20">💻</div>
                  <p className="text-gray-500 text-sm">No output yet</p>
                  <p className="text-gray-600 text-xs mt-2">Run your code to see results here</p>
                </div>
              )}
              {loading && (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-5xl mb-3 animate-pulse">⚡</div>
                  <p className="text-blue-400 animate-pulse font-medium">Executing code...</p>
                </div>
              )}
            </div>
            
            {/* Quick Info */}
            <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg text-xs">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-base">💡</span>
                <div className="text-gray-400 space-y-1">
                  <p><strong className="text-gray-300">Tips:</strong> Use Ctrl+Enter to run • 5s timeout limit</p>
                  <p className="text-gray-500">Standard library available • Safe execution environment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
