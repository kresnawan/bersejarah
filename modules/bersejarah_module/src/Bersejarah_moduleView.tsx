import { requireNativeView } from 'expo';
import * as React from 'react';

import { Bersejarah_moduleViewProps } from './Bersejarah_module.types';

const NativeView: React.ComponentType<Bersejarah_moduleViewProps> =
  requireNativeView('Bersejarah_module');

export default function Bersejarah_moduleView(props: Bersejarah_moduleViewProps) {
  return <NativeView {...props} />;
}
