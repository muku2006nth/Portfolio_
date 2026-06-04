import 'server-only';
import { Locale } from './types';

const dictionaries = {
    en: () => import('@/dictionaries/en.json').then((module) => module.default),
    tr: () => import('@/dictionaries/tr.json').then((module) => module.default),
};

const contents = {
    en: () => import('@/contents/en.json').then((module) => module.default),
    tr: () => import('@/contents/tr.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]();
};

export const getContents = async (locale: Locale) => {
    return contents[locale]();
};
