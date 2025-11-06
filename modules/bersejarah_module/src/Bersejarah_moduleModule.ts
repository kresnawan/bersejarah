import { NativeModule, requireNativeModule } from 'expo';

import { Bersejarah_moduleModuleEvents } from './Bersejarah_module.types';

declare class Bersejarah_moduleModule extends NativeModule<Bersejarah_moduleModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<Bersejarah_moduleModule>('Bersejarah_module');
