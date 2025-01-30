import React, { useState } from 'react';
import { Upload, FileAudio, AlertCircle, Loader } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const InterviewAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState('upload'); // upload, transcribing, analyzing, complete

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      // 验证文件类型
      if (!uploadedFile.type.startsWith('audio/')) {
        setError('请上传音频文件');
        return;
      }
      
      // 验证文件大小 (限制为 25MB)
      if (uploadedFile.size > 25 * 1024 * 1024) {
        setError('文件大小不能超过 25MB');
        return;
      }

      setError('');
      setFile(uploadedFile);
      setStep('transcribing');
      
      // 这里后续会添加实际的API调用
      // 现在仅作为演示
      setLoading(true);
      await simulateTranscription();
    }
  };

  // 模拟转录过程
  const simulateTranscription = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTranscript('这是模拟的转录文本...');
      setStep('analyzing');
      await simulateAnalysis();
    } catch (err) {
      setError('转录失败，请重试');
      setLoading(false);
    }
  };

  // 模拟分析过程
  const simulateAnalysis = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnalysis('这是模拟的分析结果...');
      setStep('complete');
      setLoading(false);
    } catch (err) {
      setError('分析失败，请重试');
      setLoading(false);
    }
  };

  const renderProgress = () => {
    const steps = {
      upload: '准备上传',
      transcribing: '正在转录',
      analyzing: '正在分析',
      complete: '分析完成'
    };

    return (
      <div className="w-full mt-4">
        <div className="flex justify-between mb-2">
          {Object.entries(steps).map(([key, value], index) => (
            <div 
              key={key}
              className={`text-sm ${step === key ? 'text-blue-600 font-bold' : 
                Object.keys(steps).indexOf(step) > index ? 'text-green-600' : 'text-gray-400'}`}
            >
              {value}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded">
          <div 
            className="h-full bg-blue-600 rounded transition-all duration-500"
            style={{ 
              width: `${(Object.keys(steps).indexOf(step) + 1) * 100 / Object.keys(steps).length}%` 
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">面试分析系统</h1>
        
        {/* 错误提示 */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {/* 文件上传区域 */}
        <div className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
          loading ? 'border-gray-300' : 'border-gray-300 hover:border-blue-500'
        }`}>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
            id="audio-upload"
            disabled={loading}
          />
          <label htmlFor="audio-upload" className={loading ? 'cursor-not-allowed' : 'cursor-pointer'}>
            <div className="flex flex-col items-center space-y-4">
              {loading ? (
                <Loader className="w-12 h-12 text-blue-500 animate-spin" />
              ) : (
                <FileAudio className="w-12 h-12 text-gray-400" />
              )}
              <span className="text-gray-600">
                {loading ? '处理中...' : '点击或拖拽上传面试音频'}
              </span>
            </div>
          </label>
        </div>

        {/* 进度显示 */}
        {file && renderProgress()}

        {/* 转录结果 */}
        {transcript && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold mb-2">转录文本：</h2>
            <p className="text-left whitespace-pre-wrap">{transcript}</p>
          </div>
        )}

        {/* 分析结果 */}
        {analysis && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="font-semibold mb-2">AI分析：</h2>
            <p className="text-left whitespace-pre-wrap">{analysis}</p>
          </div>
        )}

        {/* 重新上传按钮 */}
        {step === 'complete' && (
          <button
            onClick={() => {
              setFile(null);
              setTranscript('');
              setAnalysis('');
              setStep('upload');
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            重新上传
          </button>
        )}
      </div>
    </div>
  );
};

export default InterviewAnalyzer;
