export const APP_CONFIG = {
    NAME: "Kintarowwwards",
    DESC: "Creative Developer Portfolio",
    PREFIX: "kintarowwwards_v1_",
} as const;

export const STORAGE_KEYS = {
    LANGUAGE: `${APP_CONFIG.PREFIX}-language`,
} as const;

export const LOCALE_CONFIG = {
    DEFAULT: "en",
    SUPPORTED: ["en", "tr"] as const,
} as const;

export const SUPPORTED_LOCALES = LOCALE_CONFIG.SUPPORTED;
export const DEFAULT_LOCALE = LOCALE_CONFIG.DEFAULT;