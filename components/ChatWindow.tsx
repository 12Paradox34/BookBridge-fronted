import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { Message, Listing } from '../types';

interface ChatWindowProps {
  activeListing: Listing;
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ activeListing, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      text: `Hi, is "${activeListing.title}" still available?`,
      senderId: 'current_user',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // Simulate seller reply
  useEffect(() => {
    if (messages.length === 1 && messages[0].senderId === 'current_user') {
      const timer = setTimeout(() => {
        const reply: Message = {
          id: 'm2',
          text: `Yes, it is! I am in ${activeListing.location}. When can you pick it up?`,
          senderId: activeListing.seller.id,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, reply]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [messages, activeListing]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      senderId: 'current_user',
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-brand-cardDark w-full max-w-md h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-brand-blue p-4 flex items-center text-white shadow-md">
          <button onClick={onClose} className="mr-3 hover:bg-brand-darkBlue p-1 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <img src={activeListing.seller.avatar} alt="Seller" className="w-10 h-10 rounded-full border-2 border-white mr-3" />
          <div>
            <h3 className="font-bold">{activeListing.seller.name}</h3>
            <p className="text-xs text-blue-100 opacity-90 truncate w-48">Selling: {activeListing.title}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-brand-bgDark space-y-3">
          {messages.map((msg) => {
            const isMe = msg.senderId === 'current_user';
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  isMe 
                  ? 'bg-brand-blue text-white rounded-br-none' 
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                  <div className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white dark:bg-brand-cardDark border-t dark:border-gray-700">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent focus:outline-none text-gray-800 dark:text-white placeholder-gray-500"
            />
            <button 
              onClick={handleSend}
              className="ml-2 text-brand-blue hover:text-brand-darkBlue transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};