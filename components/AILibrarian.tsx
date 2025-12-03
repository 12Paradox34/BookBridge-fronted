import React, { useState, useRef, useEffect } from 'react';
    import { Bot, X, Send, Sparkles, Loader } from 'lucide-react';
    import { askLibrarian } from '../services/geminiService';
    import { Listing } from '../types';
    
    interface AILibrarianProps {
      allListings: Listing[];
      onViewListing: (id: string) => void;
    }
    
    interface AIMessage {
      role: 'user' | 'ai';
      text: string;
      recommendations?: string[];
    }
    
    export const AILibrarian: React.FC<AILibrarianProps> = ({ allListings, onViewListing }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [messages, setMessages] = useState<AIMessage[]>([
        { role: 'ai', text: 'Namaste! I am the BookBridge Librarian. Looking for JEE prep guides or a good mystery novel? Ask me!' }
      ]);
      const [input, setInput] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const messagesEndRef = useRef<HTMLDivElement>(null);
    
      useEffect(() => {
        if (isOpen) {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }, [messages, isOpen]);
    
      const handleSend = async () => {
        if (!input.trim() || isLoading) return;
    
        const userText = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setIsLoading(true);
    
        try {
          const response = await askLibrarian(userText, allListings);
          setMessages(prev => [...prev, { 
            role: 'ai', 
            text: response.message,
            recommendations: response.recommendedBookIds
          }]);
        } catch (e) {
          setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I lost my connection to the library." }]);
        } finally {
          setIsLoading(false);
        }
      };
    
      if (!isOpen) {
        return (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-brand-orange hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105 z-40 flex items-center gap-2 group"
          >
            <Bot size={28} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">Ask Librarian</span>
          </button>
        );
      }
    
      return (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white dark:bg-brand-cardDark rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-orange to-red-500 p-4 rounded-t-2xl flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <h3 className="font-bold">AI Librarian</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1">
              <X size={20} />
            </button>
          </div>
    
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-brand-bgDark">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.role === 'user' 
                  ? 'bg-brand-orange text-white rounded-br-none' 
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
                
                {/* Render Recommendation Chips */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {msg.recommendations.map(id => {
                        const book = allListings.find(l => l.id === id);
                        if(!book) return null;
                        return (
                            <button 
                                key={id}
                                onClick={() => onViewListing(id)}
                                className="flex items-center gap-1 text-xs bg-brand-blue/10 text-brand-blue border border-brand-blue/30 px-2 py-1 rounded-md hover:bg-brand-blue/20"
                            >
                                <Sparkles size={10} /> View {book.title.substring(0, 15)}...
                            </button>
                        )
                    })}
                  </div>
                )}
              </div>
            ))}
             {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-none px-4 py-2 shadow-sm">
                    <Loader size={16} className="animate-spin text-brand-orange"/>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
    
          {/* Input */}
          <div className="p-3 border-t dark:border-gray-700 bg-white dark:bg-brand-cardDark rounded-b-2xl">
            <div className="flex items-center gap-2">
              <input
                className="flex-1 bg-gray-100 dark:bg-gray-800 text-sm p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-orange dark:text-white"
                placeholder="Ask for recommendations..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-brand-orange hover:bg-orange-600 text-white p-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      );
    };