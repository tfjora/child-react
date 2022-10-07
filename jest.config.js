/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

import { jsWithTsESM as tsjPreset } from 'ts-jest/presets';

const config = {
    globals: {
        'ts-jest': {
            isolatedModules: true,
            tsconfig: 'tsconfig.test.json',
        },
    },
    moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx', 'json', 'node', 'scss'],
    modulePaths: ['<rootDir>/src'],
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.[t]s?(x)'],
    testPathIgnorePatterns: ['/node_modules/', '/dist', '(/__tests__/(testData.js))'],
    transform: {
        ...tsjPreset.transform,
    },
    verbose: true,
};

export default config;
