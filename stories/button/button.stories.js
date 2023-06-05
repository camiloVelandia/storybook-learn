import {createButton} from './button';
import ButtonDocs from './button.mdx'
import {userEvent, within} from '@storybook/testing-library'
import {expect} from '@storybook/jest'

export default {
  title: 'Design System/Atoms/Button',
  decorators:[(story)=>{
    const decorator  = document.createElement('div')
    decorator.style.margin= '24px'
    decorator.appendChild(story())
    return decorator
  }],
  parameters:{
    docs:{
      page:null,
      description:{
        component: ButtonDocs
      }
    },
    actions:{
      handles:['mouseover']
    },
    backgrounds:{
      default:'default',
      values:[
        {
          name:'blackfriday',
          value:'#000'
        },
        {
          name:'default',
          value:'#fff'
        },
      ]
    }
  },
  argTypes:{
    label:{
      name: 'label',
      control:{
        type: 'text',
      }
    },
    style:{
      name: 'style',
      options:['filled', 'outlined'],
      control:{
        type: 'radio',
      }
    },
    size:{
      name: 'style',
      options:['small', 'medium', 'large'],
      control:{
        type: 'radio',
      }
    },
    onClick:{
      description:'Event',
      action:'clicked'
    }
  }
};

const Template = ({label, ...args})=>{
  return createButton({label, ...args});
}

export const  Default = Template.bind({})
Default.args = {
  label: 'Button',
}

Default.play = async({args, canvasElement}) =>{
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole('button'))
  await expect(canvas.getByText('Button')).toBeInTheDocument()
}