import React from 'react';
import { ComponentStory, ComponentMeta, Meta } from '@storybook/react';
import { SignInForm } from '../units/auth/SignInForm';
import { Provider } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import store from '../redux/store';
import { RespRes } from '../redux/toastSlice';
import { Story } from '@storybook/react';
import { Box, Button, Container, TextField, TextFieldProps, Typography } from '@mui/material';
import { truncate } from 'fs';

export default {
  title: 'Sign In-Out Components/TextField',
  component: TextField,
  argTypes: {
    id: {
      name: 'id',
      type: { name: 'string', required: true },
      table: {
        type: {
          summary: 'string'
        },
        defaultValue: { summary: 'login' }
      },
      control: {
        type: null
      }
    },
    label: {
      name: 'label',
      type: { name: 'string', required: true },
      description: 'Depends on user language',
      table: {
        type: {
          summary: 'ReactNode'
        }
      },
      control: {
        type: null
      }
    },
    variant: {
      name: 'variant',
      type: { name: 'string', required: true },
      table: {
        type: {
          summary: 'string'
        },
        defaultValue: { summary: 'variant' }
      },
      control: {
        type: null
      }
    }
  }
} as Meta<TextFieldProps>;

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
