// pages/index.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import TextInput from '../components/TextInput';

export default function HomePage() {
    const [inputText, setInputText] = useState('');
    const router = useRouter();

    const handleSubmit = (text) => {
        if (text.trim()) {
            // Store the text in localStorage or state management solution
            localStorage.setItem('synthesisText', text);
            router.push('/select-avatar');
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col">
                <motion.div
                    className="flex-1 flex flex-col items-center justify-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h1
                        className="text-4xl font-bold mb-8 text-center text-blue-600"
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    >
                        AI Talking Head Synthesis
                    </motion.h1>

                    <motion.p
                        className="text-lg text-center max-w-2xl mb-12 text-gray-600"
                        initial={{ y: -30 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 70 }}
                    >
                        Enter your text below to create a realistic talking head video with synchronized lip movements
                    </motion.p>
                </motion.div>

                {/* Text Input Area - Fixed at bottom similar to ChatGPT */}
                <div className="w-full p-4 bg-white border-t border-gray-200">
                    <TextInput
                        value={inputText}
                        onChange={setInputText}
                        onSubmit={handleSubmit}
                        placeholder="Type your text for the talking head to speak..."
                    />
                </div>
            </main>
        </div>
    );
}