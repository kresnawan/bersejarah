// Reexport the native module. On web, it will be resolved to Bersejarah_moduleModule.web.ts
// and on native platforms to Bersejarah_moduleModule.ts
export { default } from './src/Bersejarah_moduleModule';
export { default as Bersejarah_moduleView } from './src/Bersejarah_moduleView';
export * from  './src/Bersejarah_module.types';
