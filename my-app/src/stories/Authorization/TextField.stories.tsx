import { Meta } from '@storybook/react';
import { Story } from '@storybook/react';
import { TextField, TextFieldProps } from '@mui/material';

export default {
  title: 'COMPONENTS/Sign In-Out Components/TextField',
  component: TextField,
  argTypes: {
    id: {
      name: 'id',
      type: { name: 'string', required: true },
      description: 'The id of the input element',
      table: {
        type: {
          summary: 'string'
        }
      },
      control: {
        type: 'select'
      },
      options: ['login', 'password']
    },
    label: {
      name: 'label',
      type: { name: 'string', required: true },
      description: 'The label content',
      table: {
        type: {
          summary: 'ReactNode'
        }
      },
      control: {
        type: 'select'
      },
      options: ['login', 'name', 'password']
    },
    variant: {
      name: 'variant',
      type: { name: 'string', required: true },
      description: 'The variant to use',
      table: {
        type: {
          summary: 'string'
        },
        defaultValue: { summary: 'outlined' }
      },
      control: {
        type: null
      }
    },
    required: {
      name: 'required',
      type: { name: 'boolean', required: true },
      description: 'If true, the label is displayed as required and the input element is required',
      table: {
        type: {
          summary: 'boolean'
        },
        defaultValue: { summary: 'true' }
      },
      control: {
        type: 'boolean'
      }
    },
    type: {
      name: 'type',
      type: { name: 'string', required: true },
      description: 'Type of the input element',
      table: {
        type: {
          summary: 'HTMLInputTypeAttribute'
        }
      },
      control: {
        type: 'select'
      },
      options: ['text', 'password']
    },
    sx: {
      name: 'sx',
      type: { name: 'string' },
      description:
        'The sx prop is a shortcut for defining custom styles that has access to the theme',
      table: {
        type: {
          summary: 'SxProps<Theme>'
        },
        defaultValue: { summary: 'width: "50ch"' }
      },
      control: {
        type: null
      }
    },
    error: {
      name: 'error',
      type: { name: 'boolean', required: true },
      description: 'If true, the label is displayed in an error state',
      table: {
        type: {
          summary: 'boolean'
        },
        defaultValue: { summary: 'false' }
      },
      control: {
        type: 'boolean'
      }
    },
    helperText: {
      name: 'helperText',
      type: { name: 'string', required: true },
      description: 'The helper text content',
      table: {
        type: {
          summary: 'ReactNode'
        }
      },
      control: {
        type: null
      }
    },
    register: {
      name: 'register',
      type: { name: 'string' },
      table: {
        type: {
          summary: 'UseFormRegister<T>'
        }
      },
      control: {
        type: null
      }
    }
  }
} as Meta<TextFieldProps>;

const Template: Story<TextFieldProps> = (args) => (
  <TextField
    {...args}
    sx={{
      width: '50ch'
    }}
  />
);

export const Default = Template.bind({});

Default.args = {
  id: 'login',
  label: 'name',
  variant: 'outlined',
  required: true,
  type: 'text',
  sx: {
    width: '50ch'
  },
  error: false
};
