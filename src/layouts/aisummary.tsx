import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Text, Input, ActionIcon } from 'rizzui';
import { AiOutlineQuestionCircle, AiOutlineSend, AiOutlineClose } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '@/axiosInstance';
import ReactMarkdown from 'react-markdown'; // Import react-markdown

// Define the type for the conversation item
type Conversation = {
  question: string;
  response: string;
  timestamp: string;
};

// Conversation Item Component with improved design
const ConversationItem = ({ conv }: { conv: Conversation }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4"
  >
    <div className="flex justify-between items-center mb-2">
      <Text className="text-xs text-gray-500">{conv.timestamp}</Text>
    </div>

    <div className="mb-3 border-b border-gray-100 pb-3">
      <Text className="text-sm font-medium text-gray-700 mb-1">You</Text>
      <Text className="text-sm text-gray-800">{conv.question}</Text>
    </div>

    <div>
      <div className="text-sm rounded-xl p-3 bg-blue-50 text-blue-800 border border-blue-100">
        <Text className="font-semibold text-blue-900 mb-1">AI Assistant</Text>
        {/* Render markdown content */}
        <div className="markdown-content">
          <ReactMarkdown>{conv.response}</ReactMarkdown>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function AiSummary() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Conversation[]>([]);

  const conversationRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  // Automatically scroll to bottom when conversation updates
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversationHistory, isLoading]);

  const handleSubmit = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setResponse('');

    try {
      const res = await axiosInstance.post('/users/ai-assistant/', { query: question });
      const aiResponse = res.data.response;

      const newConversation = [
        ...conversationHistory,
        { 
          question, 
          response: aiResponse, 
          timestamp: new Date().toLocaleString(),
        }
      ];

      setConversationHistory(newConversation);
      setResponse(aiResponse);
    } catch (error) {
      const newConversation = [
        ...conversationHistory,
        { 
          question, 
          response: 'Apologies, our AI encountered a processing challenge.', 
          timestamp: new Date().toLocaleString(),
        }
      ];
      setConversationHistory(newConversation);
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  const quickPrompts = [
    "Analyze current receivables status", 
    "Identify cash flow bottlenecks", 
    "Improve collection efficiency"
  ];

  return (
    <div className="relative">
      <ActionIcon
        aria-label="AI Insights"
        variant="outline"
        className="relative h-[34px] w-[34px] shadow-md dark:bg-gray-100 md:h-9 md:w-9"
        onClick={() => setIsOpen(true)}
      >
        <AiOutlineQuestionCircle className="h-[18px] w-auto" />
      </ActionIcon>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setQuestion('');
          setResponse('');
        }}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="w-full max-w-4xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="p-5 flex justify-between items-center bg-blue-500">
            <Text className="text-lg font-bold text-white">AI Insights Assistant</Text>
            <Button 
              variant="text" 
              size="sm" 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-600/20 transition-colors"
            >
              <AiOutlineClose className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col p-6">
            {/* Conversation area */}
            <div 
              ref={conversationRef}
              className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-4 mb-4 space-y-4"
            >
              <AnimatePresence>
                {conversationHistory.map((conv, index) => (
                  <ConversationItem key={index} conv={conv} />
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-gray-500 italic text-center py-4 bg-white rounded-lg shadow-sm"
                >
                  AI is crafting a thoughtful response...
                </motion.div>
              )}
            </div>

            {/* Quick Prompts - moved above the search input */}
            <div className="mb-4">
              <div className="flex space-x-2 overflow-x-auto">
                {quickPrompts.map((prompt, index) => (
                  <Button 
                    key={index} 
                    size="sm" 
                    variant="outline"
                    onClick={() => setQuestion(prompt)}
                    className="whitespace-nowrap hover:bg-blue-50 transition-colors"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
              <div className="h-px bg-gray-200 mt-2"></div>
            </div>

            {/* Input area - now at the bottom */}
            <div className="relative">
              <Input
                ref={inputRef}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask me anything about your finances"
                className="w-full pr-12"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && question.trim()) {
                    handleSubmit();
                  }
                }}
                suffix={
                  <Button
                    variant="text"
                    size="sm"
                    onClick={handleSubmit}
                    disabled={!question.trim() || isLoading}
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                  >
                    <AiOutlineSend className="text-blue-600" />
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
