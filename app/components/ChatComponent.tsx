"use client";

import React, { useState } from "react";
import { useCompletion } from "ai/react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Sparkles, Loader, Tag, X } from "lucide-react";

export default function EnhancedChatComponent() {
    const [text, setText] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const tags = [
        { id: "free-verse", label: "Free Verse", icon: "🌿" },
        { id: "formal", label: "Formal", icon: "📜" },
        { id: "poetic", label: "Poetic", icon: "🎭" },
        { id: "short", label: "Short", icon: "✨" }
    ];

    const {
        completion,
        input,
        isLoading,
        handleInputChange,
        handleSubmit,
        setInput,
    } = useCompletion({
        body: { text, tag: selectedTag },
        onFinish: (prompt, completion) => setText(completion.trim()),
        onError: (error) => toast.error(error.message),
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200"
        >
            <form
                className="relative flex flex-col space-y-4"
                onSubmit={(e) => {
                    handleSubmit(e);
                    setInput("");
                }}
            >
                <div className="relative">
                    <div className="absolute left-4 -top-3 flex items-center space-x-2">
                        {selectedTag ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center space-x-1 bg-emerald-100 px-3 py-1 rounded-full text-sm text-emerald-600 shadow-sm"
                            >
                                <span>{tags.find(t => t.id === selectedTag)?.icon}</span>
                                <span>{tags.find(t => t.id === selectedTag)?.label}</span>
                                <X 
                                    className="w-4 h-4 cursor-pointer hover:text-emerald-800" 
                                    onClick={() => setSelectedTag("")}
                                />
                            </motion.div>
                        ) : (
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600 hover:bg-gray-200 transition-colors shadow-sm"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <Tag className="w-4 h-4" />
                                <span>Select Style</span>
                            </motion.button>
                        )}
                    </div>

                    {isDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute left-4 top-8 bg-white rounded-lg shadow-xl p-2 z-10 grid grid-cols-2 gap-2 min-w-40 border border-gray-200"
                        >
                            {tags.map((tag) => (
                                <motion.button
                                    key={tag.id}
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                        selectedTag === tag.id
                                            ? "bg-emerald-100 text-emerald-600"
                                            : "hover:bg-gray-100 text-gray-600"
                                    }`}
                                    onClick={() => {
                                        setSelectedTag(tag.id);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    <span>{tag.icon}</span>
                                    <span>{tag.label}</span>
                                </motion.button>
                            ))}
                        </motion.div>
                    )}

                    <TextareaAutosize
                        value={isLoading && completion.length > 0 ? completion.trim() : text}
                        onChange={(e) => {
                            if (!isLoading) setText(e.target.value);
                        }}
                        className="w-full rounded-xl bg-gray-50 border border-gray-300 px-4 pt-12 pb-4 min-h-32 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm hover:shadow-md resize-none"
                        placeholder="Plant your poetic seeds here..."
                        aria-label="Text"
                        onKeyDown={(e) => {
                            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                                e.preventDefault();
                                e.currentTarget.form?.requestSubmit();
                            }
                        }}
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <motion.input
                        className="flex-1 bg-gray-50 rounded-full py-2 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-gray-300 shadow-sm hover:shadow-md"
                        placeholder="How shall we tend to your words?"
                        onChange={handleInputChange}
                        value={input}
                        aria-label="Prompt"
                        required
                    />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Submit"
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                    >
                        {isLoading ? (
                            <Loader className="w-5 h-5 animate-spin" />
                        ) : (
                            <Sparkles className="w-5 h-5" />
                        )}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
}
