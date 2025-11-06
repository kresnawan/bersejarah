import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './Bersejarah_module.types';

type Bersejarah_moduleModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class Bersejarah_moduleModule extends NativeModule<Bersejarah_moduleModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(Bersejarah_moduleModule, 'Bersejarah_moduleModule');
