'use client';

import { useState, useEffect } from 'react';
import { CommandMenu } from './CommandMenu';

export function CommandMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only mount the command menu on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {children}
      {mounted && <CommandMenu open={open} setOpen={setOpen} />}
    </>
  );
} 