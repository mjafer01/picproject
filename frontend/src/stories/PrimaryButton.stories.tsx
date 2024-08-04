import { Meta, StoryFn } from '@storybook/react';
import { PrimaryButton } from '../components';
import { ButtonProps } from '../styles/Button';
import { DownloadOutlined } from '@ant-design/icons';

export default {
  title: 'Components/PrimaryButton',
  component: PrimaryButton,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['primary', 'ghost', 'dashed', 'link', 'text', 'default'],
      },
    },
    shape: {
      control: {
        type: 'select',
        options: ['default', 'circle', 'round'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['large', 'middle', 'small'],
      },
    },
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => (
  <PrimaryButton {...args}>Click Me</PrimaryButton>
);

export const Default = Template.bind({});
Default.args = {
  width: 100,
  height: 50,
  type: 'primary',
  disabled: false,
  loading: false,
  ghost: false,
  danger: false,
  block: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const WithMarginLeft = Template.bind({});
WithMarginLeft.args = {
  ...Default.args,
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  icon: <DownloadOutlined />,
};
