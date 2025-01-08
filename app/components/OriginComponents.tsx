"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Feather, ChevronDown, Sparkles, LucideIcon } from "lucide-react";

export interface PoetryExampleProps {
  title: string;
  content: string;
  translation?: string;
  form: string;
}

export interface HistoricalEraProps {
  era: string;
  description: string;
  date: string;
  icon: LucideIcon;
  index: number;
  examples: PoetryExampleProps[];
  color: string;
  accentColor: string;
}

const PoetryExample = ({ title, content, translation, form }: PoetryExampleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4 bg-white/30 backdrop-blur-sm rounded-lg p-4 border border-gray-100"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-2">
          <Feather className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
          <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">{title}</span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-all group-hover:text-emerald-500 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3">
              <div className="italic text-gray-600 font-serif">{content}</div>
              {translation && (
                <div className="text-sm text-gray-500 border-t border-gray-100 pt-2">
                  Translation: {translation}
                </div>
              )}
              <div className="text-xs text-emerald-600/80 font-medium">
                Form: {form}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const HistoricalEra = ({ 
  era, 
  description, 
  date, 
  icon: Icon, 
  index,
  examples,
  color,
  accentColor 
}: HistoricalEraProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden bg-gradient-to-br ${color} backdrop-blur-sm p-6 rounded-xl border border-gray-100`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative flex items-start gap-4">
        <div className={`p-3 bg-gradient-to-br ${accentColor} rounded-lg shrink-0 shadow-sm transition-shadow duration-300 group-hover:shadow-md`}>
          <Icon className="w-6 h-6 text-gray-500/80" />
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-emerald-600/80 mb-1 font-medium tracking-wide"
          >
            {date}
          </motion.div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-medium text-gray-700 mb-2"
          >
            {era}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600/90 leading-relaxed"
          >
            {description}
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-sm text-emerald-600/80 hover:text-emerald-600 flex items-center gap-2 group/btn"
          >
            <Sparkles className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            {isExpanded ? "Hide Examples" : "View Examples"}
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {examples.map((example, idx) => (
                  <PoetryExample key={idx} {...example} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export { HistoricalEra, PoetryExample };