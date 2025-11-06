import * as React from 'react';

import { Bersejarah_moduleViewProps } from './Bersejarah_module.types';

export default function Bersejarah_moduleView(props: Bersejarah_moduleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
