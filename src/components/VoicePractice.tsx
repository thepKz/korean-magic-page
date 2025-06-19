import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Play, Pause, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface VoicePracticeProps {
  text: string;
  romanization: string;
  onPracticeComplete?: (score: number) => void;
}

const VoicePractice: React.FC<VoicePracticeProps> = ({ 
  text, 
  romanization, 
  onPracticeComplete 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isListening, setIsListening] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'ko-KR';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedText(transcript);
        calculateScore(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setFeedback('음성 인식에 실패했습니다. 다시 시도해주세요.');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const calculateScore = (recognized: string) => {
    // Simple scoring algorithm based on text similarity
    const targetWords = text.replace(/[^\w\s]/gi, '').split(' ');
    const recognizedWords = recognized.replace(/[^\w\s]/gi, '').split(' ');
    
    let matches = 0;
    targetWords.forEach(word => {
      if (recognizedWords.some(rWord => rWord.includes(word) || word.includes(rWord))) {
        matches++;
      }
    });

    const calculatedScore = Math.round((matches / targetWords.length) * 100);
    setScore(calculatedScore);

    if (calculatedScore >= 80) {
      setFeedback('훌륭합니다! 발음이 정확해요! 🎉');
    } else if (calculatedScore >= 60) {
      setFeedback('좋아요! 조금 더 연습하면 완벽해질 거예요! 👍');
    } else {
      setFeedback('다시 한 번 시도해보세요. 천천히 또박또박 말해주세요. 💪');
    }

    if (onPracticeComplete) {
      onPracticeComplete(calculatedScore);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setFeedback('마이크 접근 권한이 필요합니다.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const playRecording = () => {
    if (recordedAudio) {
      const audio = new Audio(recordedAudio);
      setIsPlaying(true);
      audio.play();
      audio.onended = () => setIsPlaying(false);
    }
  };

  const playOriginal = () => {
    // Text-to-speech for the original text
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.8;
      setIsPlaying(true);
      speechSynthesis.speak(utterance);
      utterance.onend = () => setIsPlaying(false);
    }
  };

  const reset = () => {
    setRecordedAudio(null);
    setRecognizedText('');
    setScore(null);
    setFeedback('');
    setIsRecording(false);
    setIsPlaying(false);
    setIsListening(false);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Volume2 className="w-6 h-6 text-blue-400" />
        <h3 className="korean-text text-white text-xl font-medium">발음 연습</h3>
      </div>

      {/* Target Text */}
      <div className="bg-black/20 rounded-lg p-4 mb-6">
        <div className="text-center mb-4">
          <p className="korean-text text-white text-2xl font-medium mb-2">{text}</p>
          <p className="text-gray-400 font-mono text-sm">{romanization}</p>
        </div>
        
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playOriginal}
            disabled={isPlaying}
            className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 px-4 py-2 rounded-lg border border-blue-400/30 text-blue-300 transition-colors disabled:opacity-50"
          >
            <Volume2 className="w-4 h-4" />
            <span className="korean-text">원음 듣기</span>
          </motion.button>
        </div>
      </div>

      {/* Recording Controls */}
      <div className="flex justify-center gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isRecording ? stopRecording : startRecording}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isRecording ? (
            <>
              <MicOff className="w-5 h-5" />
              <span className="korean-text">녹음 중지</span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              <span className="korean-text">녹음 시작</span>
            </>
          )}
        </motion.button>

        {recordedAudio && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playRecording}
            disabled={isPlaying}
            className="flex items-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 px-4 py-2 rounded-lg border border-purple-400/30 text-purple-300 transition-colors disabled:opacity-50"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="korean-text">내 발음</span>
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="flex items-center gap-2 bg-gray-500/20 hover:bg-gray-500/30 px-4 py-2 rounded-lg border border-gray-400/30 text-gray-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="korean-text">다시</span>
        </motion.button>
      </div>

      {/* Recording Status */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-6"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2"
            />
            <p className="korean-text text-red-400">녹음 중... 또박또박 말해주세요</p>
          </motion.div>
        )}

        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-6"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="korean-text text-blue-400"
            >
              음성 인식 중...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recognition Results */}
      <AnimatePresence>
        {recognizedText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-black/20 rounded-lg p-4 mb-6"
          >
            <h4 className="korean-text text-white font-medium mb-2">인식된 텍스트:</h4>
            <p className="korean-text text-blue-300 text-lg">{recognizedText}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score and Feedback */}
      <AnimatePresence>
        {score !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`rounded-lg p-4 border ${
              score >= 80 
                ? 'bg-green-500/20 border-green-400/30' 
                : score >= 60
                ? 'bg-yellow-500/20 border-yellow-400/30'
                : 'bg-red-500/20 border-red-400/30'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              {score >= 80 ? (
                <CheckCircle className="w-6 h-6 text-green-400" />
              ) : (
                <XCircle className="w-6 h-6 text-red-400" />
              )}
              <div>
                <div className="text-2xl font-bold text-white">{score}점</div>
                <div className="text-sm text-gray-400 korean-text">발음 점수</div>
              </div>
            </div>
            <p className="korean-text text-white">{feedback}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips */}
      <div className="mt-6 bg-blue-500/10 rounded-lg p-4 border border-blue-400/20">
        <h4 className="korean-text text-blue-300 font-medium mb-2">💡 발음 팁</h4>
        <ul className="korean-text text-blue-200 text-sm space-y-1">
          <li>• 조용한 환경에서 연습하세요</li>
          <li>• 천천히 또박또박 발음하세요</li>
          <li>• 마이크에 너무 가깝지 않게 말하세요</li>
          <li>• 원음을 여러 번 들어보세요</li>
        </ul>
      </div>
    </div>
  );
};

export default VoicePractice;