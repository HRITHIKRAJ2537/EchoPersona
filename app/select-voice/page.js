// app/select-voice/page.js
'use client';
import '@/app/globals.css';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2 } from 'lucide-react';

export default function SelectVoice() {
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [inputText, setInputText] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [playingVoice, setPlayingVoice] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const router = useRouter();
    const audioRef = useRef(null);

    useEffect(() => {
        // Get the text and avatar from localStorage
        const text = localStorage.getItem('synthesisText');
        const avatar = localStorage.getItem('selectedAvatar');

        if (!text || !avatar) {
            router.push('/Home');
        } else {
            setInputText(text);
            setSelectedAvatar(JSON.parse(avatar));
        }
    }, [router]);

    // Sample voice data - in a real app, these would come from your API
    const voices = [
        { id: 1, name: 'Emma', gender: 'female', accent: 'American', preview: '/path/to/audio1.mp3' },
        { id: 2, name: 'Michael', gender: 'male', accent: 'British', preview: '/path/to/audio2.mp3' },
        { id: 3, name: 'Sofia', gender: 'female', accent: 'Spanish', preview: '/path/to/audio3.mp3' },
        { id: 4, name: 'James', gender: 'male', accent: 'Australian', preview: '/path/to/audio4.mp3' },
        { id: 5, name: 'Alex', gender: 'neutral', accent: 'American', preview: '/path/to/audio5.mp3' },
        { id: 6, name: 'Custom', gender: 'custom', accent: 'Upload', preview: null }
    ];

    const handleBack = () => {
        router.push('/select-avatar');
    };

    const handleGenerate = async () => {
        if (!selectedVoice) return;

        setIsGenerating(true);

        // For demonstration - in a real app, this would be an API call
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Store info about the generated video
            localStorage.setItem('generatedVideo', JSON.stringify({
                text: inputText,
                avatar: selectedAvatar,
                voice: selectedVoice,
                videoUrl: '/api/placeholder/640/480', // This would be a real URL in production
                timestamp: new Date().toISOString()
            }));

            // Navigate to results page
            router.push('/result');
        } catch (error) {
            console.error('Error generating video:', error);
            alert('There was an error generating your video. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const playVoiceSample = (voice) => {
        if (playingVoice === voice.id) {
            audioRef.current.pause();
            setPlayingVoice(null);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            // In a real app, set the src to the voice.preview
            audioRef.current = new Audio(voice.preview || 'https://example.com/demo-voice.mp3');
            audioRef.current.play();
            setPlayingVoice(voice.id);

            audioRef.current.onended = () => {
                setPlayingVoice(null);
            };
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
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
                    <h1 className="text-2xl font-bold text-blue-600">Select a Voice</h1>
                    <div className="text-sm text-gray-500">Step 2 of 2</div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Preview section */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4">
                            {selectedAvatar && (
                                <div className="aspect-square relative rounded-lg overflow-hidden">
                                    <img
                                        src={selectedAvatar.imageUrl}
                                        alt={selectedAvatar.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                        <p className="text-white font-medium">{selectedAvatar.name}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="md:w-3/4">
                            <h3 className="font-semibold text-gray-700 mb-2">Your text:</h3>
                            <p className="text-gray-600 italic mb-4">{inputText}</p>

                            {selectedVoice && (
                                <div className="mt-4">
                                    <h3 className="font-semibold text-gray-700 mb-2">Selected voice:</h3>
                                    <p className="text-blue-600">{selectedVoice.name} ({selectedVoice.accent} {selectedVoice.gender})</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Voice list */}
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {voices.map((voice) => (
                            <motion.div
                                key={voice.id}
                                variants={itemVariants}
                                className={`bg-white rounded-lg shadow-md p-4 cursor-pointer flex items-center
                          ${selectedVoice?.id === voice.id ? 'ring-2 ring-blue-500' : ''}`}
                                onClick={() => setSelectedVoice(voice)}
                            >
                                <div className="flex-1">
                                    <h3 className="font-medium">{voice.name}</h3>
                                    <p className="text-sm text-gray-500">{voice.accent} {voice.gender}</p>
                                </div>
                                {voice.preview && (
                                    <button
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            playVoiceSample(voice);
                                        }}
                                    >
                                        {playingVoice === voice.id ? (
                                            <Pause size={20} className="text-blue-600" />
                                        ) : (
                                            <Play size={20} className="text-blue-600" />
                                        )}
                                    </button>
                                )}
                                {!voice.preview && voice.id === 6 && (
                                    <button
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            alert('Upload your own voice feature coming soon!');
                                        }}
                                    >
                                        <Volume2 size={20} className="text-blue-600" />
                                    </button>
                                )}
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
                            onClick={handleGenerate}
                            disabled={!selectedVoice || isGenerating}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors
                       ${selectedVoice && !isGenerating
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        >
                            {isGenerating ? 'Generating...' : 'Generate Video'}
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}