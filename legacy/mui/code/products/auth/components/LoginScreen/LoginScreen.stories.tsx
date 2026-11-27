'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { LoginScreen } from './LoginScreen';

const meta: Meta<typeof LoginScreen> = {
  title: 'Screens/Auth/LoginScreen',
  component: LoginScreen,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof LoginScreen>;

export const Default: Story = {};
export const Error: Story = { args: { error: true } };
export const Compact: Story = { args: { compact: true } };
