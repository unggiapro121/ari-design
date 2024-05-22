import type { StoryObj } from '@storybook/react';
import * as React from 'react';
import * as yup from 'yup';

import Form from '../Form/Form';

import Autocomplete, {
  AutocompleteItem,
  ItemRendererProps,
} from './Autocomplete';
import styles from './Autocomplete.module.scss';

export default {
  title: 'Inputs/Autocompletes',
  component: Autocomplete,
};

type Story = StoryObj<typeof Autocomplete>;

export const Primary: Story = {
  args: {
    id: 'primary',
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
      { label: 'Option 4', value: 'option-4' },
      { label: 'Option 5', value: 'option-5' },
    ],
    inputProps: {
      placeholder: 'Type to search',
    },
  },
  render: (args) => <Autocomplete {...args} />,
};

const exampleOptions: AutocompleteItem[] = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
  { label: 'Option 4', value: 'option-4' },
  { label: 'Option 5', value: 'option-5' },
];

export const ControlledForm: Story = {
  args: {
    id: 'form',
    options: exampleOptions,
  },
  render: (args) => {
    const [value, setValue] = React.useState<any>();

    const [defaultValue, setDefaultValue] = React.useState({
      autocomplete: exampleOptions[0],
    });

    const basicSchema = yup.object({
      autocomplete: yup.object().nullable().required('Required field!'),
    });

    return (
      <Form
        schema={basicSchema}
        onChange={setValue}
        defaultValues={defaultValue}
      >
        <p>Selected value from form: {value?.autocomplete?.label}</p>

        <Form.Autocomplete label="Autocomplete" name="autocomplete" {...args} />
        <br />
        <button type="submit">Submit</button>
        <button
          onClick={() => setDefaultValue({ autocomplete: exampleOptions[1] })}
        >
          Set option 2
        </button>
      </Form>
    );
  },
};

export const MinSearch: Story = {
  args: {
    id: 'min-search',
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
      { label: 'Option 4', value: 'option-4' },
      { label: 'Option 5', value: 'option-5' },
    ],
    inputProps: {
      placeholder: 'Type to search',
    },
    minSearchLength: 3,
  },
  render: (args) => <Autocomplete {...args} />,
};

export const Footer: Story = {
  args: {
    id: 'footer',
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
      { label: 'Option 4', value: 'option-4' },
      { label: 'Option 5', value: 'option-5' },
      { label: 'Option 6', value: 'option-6' },
      { label: 'Option 7', value: 'option-7' },
      { label: 'Option 8', value: 'option-8' },
    ],
    inputProps: {
      placeholder: 'Type to search',
    },
    dropdownStyle: {
      maxHeight: '200px',
    },
    customFooter: () => (
      <div style={{ padding: 10 }}>
        <small>Custom Footer</small>
        <br />
        <button>Click me</button>
      </div>
    ),
  },
  render: (args) => <Autocomplete {...args} />,
};

export const CustomStyles: Story = {
  args: {
    id: 'custom-styles',
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
      { label: 'Option 4', value: 'option-4' },
      { label: 'Option 5', value: 'option-5' },
    ],
    inputProps: {
      placeholder: 'Type to search',
    },
    style: {
      maxWidth: '300px',
    },
    dropdownStyle: {
      maxHeight: '150px',
      backgroundColor: 'lightblue',
    },
  },
  render: (args) => <Autocomplete {...args} />,
};

// There's no state management in this story, just an example to show empty state
export const Empty: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
      { label: 'Option 4', value: 'option-4' },
      { label: 'Option 5', value: 'option-5' },
    ],
    inputValue: 'random input value',
    showEmptyItem: true,
  },
  render: (args) => <Autocomplete {...args} />,
};

// There's no state management in this story, just an example to show default values
export const DefaultValue: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
      { label: 'Option 4', value: 'option-4' },
      { label: 'Option 5', value: 'option-5' },
    ],
    value: { label: 'Option 1', value: 'option-1' },
  },
  render: (args) => <Autocomplete {...args} />,
};

export const Async: Story = {
  args: {
    options: [],
    minSearchLength: 3,
  },
  render: (args) => {
    const runFilter = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return [
        { label: 'Option 1', value: 'option-1' },
        { label: 'Option 2', value: 'option-2' },
        { label: 'Option 3', value: 'option-3' },
        { label: 'Option 4', value: 'option-4' },
        { label: 'Option 5', value: 'option-5' },
      ];
    };

    return (
      <>
        <Autocomplete {...args} customSearch={runFilter} />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quod rem? Ipsum provident voluptate animi? Sequi ipsum quasi iste.
          Voluptatibus non, eveniet nobis tenetur accusamus sapiente nulla alias
          impedit deleniti!
        </p>
      </>
    );
  },
};

export const Controlled: Story = {
  args: {
    options: exampleOptions,
  },
  render: (args) => {
    const [value, setValue] = React.useState<AutocompleteItem | null>(
      exampleOptions[0],
    );
    const [inputValue, setInputValue] = React.useState<string | undefined>('');
    const ref = React.useRef<HTMLInputElement>(null);

    return (
      <>
        <p>selected label: {value?.label}</p>
        <p>selected value: {value?.value}</p>
        <p>input value: {inputValue}</p>
        <Autocomplete
          {...args}
          value={value}
          inputValue={inputValue}
          onChange={setValue}
          onInputChange={setInputValue}
          ref={ref}
        />
        <br />
        <button
          onClick={() => {
            setValue(null);
            setInputValue('');
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            setValue({ label: 'Option 1', value: 'option-1' });
          }}
        >
          Set Option 1
        </button>
        <button
          onClick={() => {
            ref.current?.focus();
          }}
        >
          Focus
        </button>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
          aspernatur ratione. Ex et numquam, iure nostrum dignissimos fugiat est
          voluptate quam vitae autem voluptas labore omnis quia, quas dolores
          quos?
        </p>
        <input />
      </>
    );
  },
};

export const CustomItem: Story = {
  args: {
    id: 'custom-item',
    options: [
      { label: '3128', value: {}, suburb: 'Box Hill', state: 'VIC' },
      { label: '3128', value: {}, suburb: 'Box Hill Central', state: 'VIC' },
      { label: '3128', value: {}, suburb: 'Box Hill South', state: 'VIC' },
      { label: '3128', value: {}, suburb: 'Houston', state: 'VIC' },
      { label: '3128', value: {}, suburb: 'Wattle Park', state: 'VIC' },
    ] as any,
  },
  render: (args) => {
    interface CustomPostcodeItemProps extends AutocompleteItem {
      suburb?: string;
      state?: string;
    }

    const CustomPostcodeItem = (
      props: ItemRendererProps<CustomPostcodeItemProps>,
    ) => {
      return (
        <div
          className={styles.postcodeItem}
          style={{
            backgroundColor: props.isSelected ? 'lightblue' : 'transparent',
          }}
        >
          <span className={styles.postcodeItemSuburb}>
            {props.option.suburb}
          </span>
          <span className={styles.postcodeItemPostcode}>
            {props.option.label}
          </span>
          <span className={styles.postcodeItemState}>{props.option.state}</span>
        </div>
      );
    };

    return (
      <>
        <Autocomplete customDropdownItem={CustomPostcodeItem} {...args} />
      </>
    );
  },
};
