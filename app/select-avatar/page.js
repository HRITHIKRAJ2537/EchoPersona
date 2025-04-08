// app/select-avatar/page.js
'use client';
import '@/app/globals.css';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SelectAvatar() {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [inputText, setInputText] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Get the text from localStorage
        const text = localStorage.getItem('synthesisText');
        if (!text) {
            router.push('/Home');
        } else {
            setInputText(text);
        }
    }, [router]);

    // Sample avatar data - in a real app, these would come from your API
    const avatars = [
        { id: 1, name: 'Emma', imageUrl: 'img.png', gender: 'female' },
        { id: 2, name: 'Michael', imageUrl: '/api/placeholder/120/150', gender: 'male' },
        { id: 3, name: 'Sofia', imageUrl: '/api/placeholder/120/150', gender: 'female' },
        { id: 4, name: 'James', imageUrl: '/api/placeholder/120/150', gender: 'male' },
        { id: 5, name: 'Alex', imageUrl: '/api/placeholder/120/150', gender: 'neutral' },
        { id: 6, name: 'Custom', imageUrl: '/api/placeholder/120/150', gender: 'custom' }
    ];

    const handleNext = () => {
        if (selectedAvatar) {
            localStorage.setItem('selectedAvatar', JSON.stringify(selectedAvatar));
            router.push('/select-voice');
        }
    };

    const handleBack = () => {
        router.push('/Home');
    };

    // Avatar container animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const avatarVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-white p-4 shadow-md">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Select an Avatar</h1>
                    <div className="text-sm text-gray-500">Step 1 of 2</div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Text preview */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <h3 className="font-semibold text-gray-700 mb-2">Your text:</h3>
                        <p className="text-gray-600 italic">{inputText}</p>
                    </div>

                    {/* Avatars grid */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {avatars.map((avatar) => (
                            <motion.div
                                key={avatar.id}
                                variants={avatarVariants}
                                className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer
                          ${selectedAvatar?.id === avatar.id ? 'ring-4 ring-blue-500' : ''}`}
                                onClick={() => setSelectedAvatar(avatar)}
                            >
                                <div className="aspect-square relative">
                                    <img
                                        src={avatar.imageUrl}
                                        alt={avatar.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-3 text-center">
                                    <h3 className="font-medium">{avatar.name}</h3>
                                    <p className="text-sm text-gray-500 capitalize">{avatar.gender}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Navigation buttons */}
                    <div className="flex justify-between">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            <ChevronLeft size={20} />
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!selectedAvatar}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors
                       ${selectedAvatar
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        >
                            Next
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}