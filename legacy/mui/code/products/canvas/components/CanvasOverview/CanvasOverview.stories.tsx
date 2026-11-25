'use client';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Figma-style board of live stories. The board itself is `sync/canvas/index.html`,
 * served at `/canvas/`; its frames come from `sync/canvas/frames.json`.
 */
function CanvasOverview() {
  return (
    <iframe
      title="Cariva Canvas"
      src="./canvas/index.html"
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', border: 0 }}
    />
  );
}

const meta: Meta<typeof CanvasOverview> = {
  title: 'Canvas/Overview',
  component: CanvasOverview,
  parameters: { layout: 'fullscreen', controls: { disable: true }, docs: { disable: true } },
};

export default meta;
export const Board: StoryObj<typeof CanvasOverview> = {};
