import React, { useState } from 'react'
import Papa from 'papaparse'

export default function InterviewAnalyzer() {
  const [file, setFile] = useState(null)
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    setFile(file)
    
    if (file) {
      setLoading(true)
      setError(null)
      
      try {
        const text = await file.text()
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            setResults(results.data)
            setLoading(false)
          },
          error: (error) => {
            setError('Error parsing CSV file')
            setLoading(false)
          }
        })
      } catch (err) {
        setError('Error reading file')
        setLoading(false)
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Interview Analyzer</h1>
      
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Interview CSV
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>

            {loading && (
              <div className="text-center">
                Processing...
              </div>
            )}

            {error && (
              <div className="text-red-500">
                {error}
              </div>
            )}

            {results && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(results[0]).map((header) => (
                          <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.map((row, index) => (
                        <tr key={index}>
                          {Object.values(row).map((value, i) => (
                            <td
                              key={i}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
