import React from 'react'
import { SidebarBtnElement } from '../SidebarBtnElement';
import { FormElements } from './Elements';

export function FormElementsSidebar() {
  return (
    <div>
      Elements
        <SidebarBtnElement formElement={FormElements.TextField} />
    </div>
  );
}
