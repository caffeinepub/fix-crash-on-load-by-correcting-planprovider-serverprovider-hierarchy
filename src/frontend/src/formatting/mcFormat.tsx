import React, { ReactElement } from 'react';

const COLOR_MAP: Record<string, string> = {
  '0': '#000000',
  '1': '#0000AA',
  '2': '#00AA00',
  '3': '#00AAAA',
  '4': '#AA0000',
  '5': '#AA00AA',
  '6': '#FFAA00',
  '7': '#AAAAAA',
  '8': '#555555',
  '9': '#5555FF',
  'a': '#55FF55',
  'b': '#55FFFF',
  'c': '#FF5555',
  'd': '#FF55FF',
  'e': '#FFFF55',
  'f': '#FFFFFF'
};

export function renderMinecraftText(text: string): ReactElement {
  const parts: ReactElement[] = [];
  let currentColor = '#FFFFFF';
  let buffer = '';
  let i = 0;
  
  while (i < text.length) {
    if (text[i] === '&' && i + 1 < text.length) {
      const code = text[i + 1].toLowerCase();
      
      if (COLOR_MAP[code]) {
        if (buffer) {
          parts.push(<span key={parts.length} style={{ color: currentColor }}>{buffer}</span>);
          buffer = '';
        }
        currentColor = COLOR_MAP[code];
        i += 2;
        continue;
      }
    }
    
    buffer += text[i];
    i++;
  }
  
  if (buffer) {
    parts.push(<span key={parts.length} style={{ color: currentColor }}>{buffer}</span>);
  }
  
  return <>{parts}</>;
}
