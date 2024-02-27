import React from 'react'
import { Button } from './ui/button'
import { ScanEye } from 'lucide-react';

export function PreviewDialogBtn() {
  return (
    <Button className="gap-2 shadow-none">
      <ScanEye className="w-4 h-4"  />
      Preview
    </Button>
  );
}
