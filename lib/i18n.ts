import { Locale } from './types';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './constants';

export function isValidLocale(locale: string): locale is Locale {
    return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

export function resolveLocale(lang: string | undefined): Locale {
    if (lang && isValidLocale(lang)) {
        return lang;
    }
    return DEFAULT_LOCALE;
}
