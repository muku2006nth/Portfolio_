"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { Locale } from "@/lib/i18n";

type Content = Record<string, any>;

interface LanguageContextType {
    language: Locale;
    content: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function deepMerge(target: any, source: any): any {
    const result = { ...target };
    for (const key of Object.keys(source)) {
        if (
            source[key] &&
            typeof source[key] === "object" &&
            !Array.isArray(source[key]) &&
            target[key] &&
            typeof target[key] === "object" &&
            !Array.isArray(target[key])
        ) {
            result[key] = deepMerge(target[key], source[key]);
        } else {
            result[key] = source[key];
        }
    }
    return result;
}

const parseInlineMarkdown = (text: string): React.ReactNode => {
    const regex = /\*{3}(.+?)\*{3}|\*{2}(.+?)\*{2}|\*(.+?)\*/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }

        if (match[1] !== undefined) {
            parts.push(<span key={match.index} className="highlight-text-tertiary">{match[1]}</span>);
        } else if (match[2] !== undefined) {
            parts.push(<span key={match.index} className="highlight-text-secondary">{match[2]}</span>);
        } else if (match[3] !== undefined) {
            parts.push(<span key={match.index} className="highlight-text-primary">{match[3]}</span>);
        }

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    if (parts.length === 0) return text;
    if (parts.length === 1) return parts[0];
    return <>{parts}</>;
};

const parseMarkdownContent = (data: any): any => {
    if (typeof data === "string") {
        const hasMarkdown = /\*{1,3}[^*]+\*{1,3}/.test(data) || data.includes('\n\n');

        if (!hasMarkdown) return data;

        const paragraphs = data.split('\n\n');

        if (paragraphs.length > 1) {
            return (
                <>
                    {paragraphs.map((p: string, i: number) => (
                        <React.Fragment key={i}>
                            {i > 0 && <><br /><br /></>}
                            {parseInlineMarkdown(p)}
                        </React.Fragment>
                    ))}
                </>
            );
        }

        return parseInlineMarkdown(data);
    }

    if (Array.isArray(data)) {
        return data.map(parseMarkdownContent);
    }

    if (typeof data === "object" && data !== null) {
        const result: any = {};
        for (const key in data) {
            result[key] = parseMarkdownContent(data[key]);
        }
        return result;
    }

    return data;
};

interface LanguageProviderProps {
    children: React.ReactNode;
    lang: Locale;
    dictionary: Content;
    contents: Content;
}

export function LanguageProvider({ children, lang, dictionary, contents }: LanguageProviderProps) {
    const processedContent = useMemo(() => {
        const merged = deepMerge(dictionary, contents);
        return parseMarkdownContent(merged);
    }, [dictionary, contents]);

    const value = {
        language: lang,
        content: processedContent,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}