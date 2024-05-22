import { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import * as React from 'react';
import * as yup from 'yup';

import Button, {
  ButtonColor,
  ButtonType,
  ButtonVariant,
} from '../Button/Button';
import { DropDownValueInterface } from '../Dropdown/Dropdown';
import StickyBottomBar from '../StickyBottomBar/StickyBottomBar';

import Form from './Form';

const meta: Meta<typeof Form> = {
  title: 'Inputs/Form',
  component: Form,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

// Schemas

const schema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  idType: yup.string().required('Required'),
  email: yup.string().required('Email is required').email('Email is not valid'),
  age: yup.string().required('Age is required'),
  about: yup.string().required('Required'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^(\+)?\d*$/, 'Phone number is not valid'),
  termsAndConditions: yup
    .string()
    .nullable()
    .is(['Yes'], 'You must accept the terms and conditions')
    .required('Terms and conditions are required'),
  isCool: yup
    .boolean()
    .is([true], 'You must be cool!')
    .required('being cool is required'),
  epic: yup
    .boolean()
    .is([true], 'You must be EPIC!')
    .required('being epic is mandatory'),
  favWebsite: yup.object().required('Required'),
  termsRead: yup.boolean().required('You must read the terms'),
  picture: yup.mixed().required('Please upload a picture'),
});

// Handlers

const idOptions: DropDownValueInterface[] = [
  { label: 'Passport', value: 'passport' },
  { label: 'Licence', value: 'licence' },
  { label: 'Medicare', value: 'medicare' },
  {
    label: 'A really long text option that should display as ellipsis',
    value: 'ellipsis',
  },
];

const testHandler = (input?: string) => {
  const data = [
    { label: 'google', value: 1 },
    { label: 'amazon', value: 2 },
    { label: 'ebay', value: 3 },
    { label: 'facebook', value: 4 },
    { label: 'twitter', value: 5 },
    { label: 'instagram', value: 6 },
    { label: 'youtube', value: 7 },
    { label: 'linkedin', value: 8 },
    { label: 'pinterest', value: 9 },
    { label: 'reddit', value: 10 },
    { label: 'tumblr', value: 11 },
  ];

  return data.filter(({ label }) => label.includes(input ?? ''));
};

export const AutoScrollTemplate: Story = {
  render: (args) => (
    <Form {...args}>
      <Form.Input label="First Name" name="firstName" hasFocus={true} />
      <div style={{ height: 500 }} />
      <Form.Input label="Last Name" name="lastName" hasFocus={true} />
      <div style={{ height: 500 }} />
      <Form.DropDown
        label="ID Type"
        name="idType"
        options={idOptions}
        placeHolder={'Choose your ID...'}
      />
      <div style={{ height: 500 }} />
      <Form.Checkbox label="I am cool" name="isCool" color={'black'} />
      <div style={{ height: 500 }} />
      <Form.DatePicker label="Date of Birth" name="age" />
      <div style={{ height: 500 }} />
      <Form.RadioGroup
        label="Do you agree to T&Cs?"
        ariaLabel={'Do you agree to the terms and conditions?'}
        name="termsAndConditions"
        color="blue"
        radioType="button"
        values={['Yes', 'No']}
      />
      <div style={{ height: 500 }} />
      <Form.Scroll
        style={{ height: 400 }}
        label="terms and services"
        name="termsRead"
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda est
        mollitia culpa dolorum molestias magni distinctio numquam dicta? Ex
        molestias nemo expedita mollitia cupiditate exercitationem repellendus
        similique pariatur dignissimos aspernatur! Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Possimus nam qui sit optio, esse ipsam
        suscipit nisi eaque natus quas numquam ratione maxime incidunt unde
        neque magnam porro similique mollitia! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Aut voluptatum officiis officia laudantium
        veritatis facilis facere, accusantium iusto nobis ad esse repellat quos
        tempore unde perspiciatis soluta voluptatibus cumque cupiditate? Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Facere maxime
        assumenda repellat omnis distinctio voluptatum error enim nemo pariatur
        illo unde nostrum, beatae mollitia molestias illum inventore. Sunt,
        suscipit animi. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Sunt qui voluptatem pariatur numquam commodi at sint tempora neque
        facere blanditiis. Eum, dolorem. Saepe odit laudantium natus assumenda.
        Nostrum, laudantium illo? Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Quibusdam incidunt facilis sed, necessitatibus eum quo
        maiores architecto expedita facere saepe tempora at asperiores
        dignissimos sint quis debitis officia fugiat nostrum. Lorem ipsum dolor,
        sit amet consectetur adipisicing elit. Qui quisquam vitae deleniti est
        ex repudiandae repellendus veritatis, facere necessitatibus et
        perferendis in natus cum. Tenetur distinctio voluptatibus fuga autem
        libero! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
        reiciendis praesentium, fugit eos architecto commodi aperiam dicta odit
        molestiae perspiciatis, similique officia minima delectus, aliquid
        magnam! Possimus optio vero molestias! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Perferendis totam aliquid doloremque
        libero beatae. Explicabo asperiores adipisci eum, alias, exercitationem
        tenetur et blanditiis quibusdam, fugiat sunt esse? Doloremque,
        perferendis iure. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Ratione rem assumenda sequi culpa impedit neque asperiores rerum.
        Veniam nam laborum eum? Placeat architecto aperiam, corporis illum
        itaque vel sunt voluptas.
      </Form.Scroll>
      <div style={{ height: 500 }} />
      <Form.Toggle label="Are you epic?" name="epic" color="blue" />
      <Form.Toggle
        label="Do you have a last name?"
        name="hasLastName"
        color="blue"
      />
      <Form.Condition fieldName="hasLastName" condition={(v) => v === true}>
        <Form.Input label="Last name" name="lastName" />
      </Form.Condition>
      <div style={{ height: 500 }} />
      <Form.TypeAhead
        label="Fav Website"
        name="favWebsite"
        handler={testHandler}
        suffix=".com"
      />
      <StickyBottomBar>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '10px' }}>
            <Button
              label="Reset"
              type={ButtonType.Reset}
              variant={ButtonVariant.Tertiary}
              color={ButtonColor.Red}
            />{' '}
          </div>
          <Button
            label="Submit"
            type={ButtonType.Submit}
            variant={ButtonVariant.Primary}
            color={ButtonColor.Red}
          />
        </div>
      </StickyBottomBar>
    </Form>
  ),
  args: {
    schema,
  },
};

export const BasicExample: Story = {
  render: (args) => (
    <Form {...args}>
      <Form.Input label="First Name" name="firstName" />
      <Form.Input label="Last Name" name="lastName" />
      <Form.DropdownSearch
        label={'Account Number'}
        name={'accountName'}
        data={['one', 'two', 'three']}
        filterOptions
      />
      <Form.FileUpload label="Upload Image" name="picture" />
      <Form.DropDown
        label="ID Type"
        name="idType"
        options={idOptions}
        placeHolder={'Choose your ID...'}
      />
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '10px' }}>
          <Button
            label="Reset"
            type={ButtonType.Reset}
            variant={ButtonVariant.Tertiary}
            color={ButtonColor.Red}
          />{' '}
        </div>
        <Button
          label="Submit"
          type={ButtonType.Submit}
          variant={ButtonVariant.Primary}
          color={ButtonColor.Red}
        />
      </div>
    </Form>
  ),
  args: {
    schema: yup.object({
      firstName: yup.string().required('First Name is required'),
      lastName: yup.string().required('Last Name is required'),
      idType: yup.string().required('Required'),
      picture: yup.mixed().required('Please upload a picture'),
      accountName: yup.string().required('Required'),
    }),
  },
};

export const Example: Story = {
  render: (args) => (
    <Form {...args}>
      <Form.Input label="First Name" name="firstName" />
      <Form.Input label="Last Name" name="lastName" />
      <Form.Input label="Email" name="email" />
      <Form.Input label="Phone" inputType="tel" name="phone" />
      <Form.DropDown label="ID Type" name="idType" options={idOptions} />
      <Form.DropDown
        label="Document Color"
        name="docColor"
        options={idOptions}
        placeHolder={'Choose a color...'}
      />
      <Form.Scroll
        style={{ height: 400 }}
        label="terms and services"
        name="termsRead"
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda est
        mollitia culpa dolorum molestias magni distinctio numquam dicta? Ex
        molestias nemo expedita mollitia cupiditate exercitationem repellendus
        similique pariatur dignissimos aspernatur! Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Possimus nam qui sit optio, esse ipsam
        suscipit nisi eaque natus quas numquam ratione maxime incidunt unde
        neque magnam porro similique mollitia! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Aut voluptatum officiis officia laudantium
        veritatis facilis facere, accusantium iusto nobis ad esse repellat quos
        tempore unde perspiciatis soluta voluptatibus cumque cupiditate? Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Facere maxime
        assumenda repellat omnis distinctio voluptatum error enim nemo pariatur
        illo unde nostrum, beatae mollitia molestias illum inventore. Sunt,
        suscipit animi. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Sunt qui voluptatem pariatur numquam commodi at sint tempora neque
        facere blanditiis. Eum, dolorem. Saepe odit laudantium natus assumenda.
        Nostrum, laudantium illo? Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Quibusdam incidunt facilis sed, necessitatibus eum quo
        maiores architecto expedita facere saepe tempora at asperiores
        dignissimos sint quis debitis officia fugiat nostrum. Lorem ipsum dolor,
        sit amet consectetur adipisicing elit. Qui quisquam vitae deleniti est
        ex repudiandae repellendus veritatis, facere necessitatibus et
        perferendis in natus cum. Tenetur distinctio voluptatibus fuga autem
        libero! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
        reiciendis praesentium, fugit eos architecto commodi aperiam dicta odit
        molestiae perspiciatis, similique officia minima delectus, aliquid
        magnam! Possimus optio vero molestias! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Perferendis totam aliquid doloremque
        libero beatae. Explicabo asperiores adipisci eum, alias, exercitationem
        tenetur et blanditiis quibusdam, fugiat sunt esse? Doloremque,
        perferendis iure. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Ratione rem assumenda sequi culpa impedit neque asperiores rerum.
        Veniam nam laborum eum? Placeat architecto aperiam, corporis illum
        itaque vel sunt voluptas.
      </Form.Scroll>
      <Form.TypeAhead
        label="Fav Website"
        name="favWebsite"
        handler={testHandler}
        suffix=".com"
      />
      <Form.DatePicker label="How old are you?" name="age" />
      <Form.RadioGroup
        label="Do you agree to T&Cs?"
        ariaLabel={'Do you agree to the terms and conditions?'}
        name="termsAndConditions"
        color="blue"
        radioType="button"
        values={['Yes', 'No']}
      />
      <Form.RadioGroup
        label="Do you agree to T&Cs?"
        ariaLabel={'Do you agree to the terms and conditions?'}
        name="termsAndConditions2"
        color="blue"
        direction={'column'}
        values={[
          { label: 'True', value: 'true', tooltip: 'tooltip text' },
          {
            label: 'False',
            value: 'false',
            children: (
              <Form.DropDown
                label="ID Type"
                name="idType"
                options={idOptions}
              />
            ),
          },
        ]}
      />
      <Form.Toggle label="Are you epic?" name="epic" color="blue" />
      <Form.Condition fieldName="epic" condition={(v) => v === true}>
        <p>Wow that's awesome</p>
        <Form.Input label="Tell us what you think" name="feedback" />
      </Form.Condition>
      <Form.Checkbox
        label="Do you accept that you are cool?"
        name="isCool"
        color="blue"
      />
      <Form.TextArea label="Tell us about yourself" name="about" rows={3} />
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '10px' }}>
          <Button
            label="Reset"
            type={ButtonType.Reset}
            variant={ButtonVariant.Tertiary}
            color={ButtonColor.Red}
          />{' '}
        </div>
        <Button
          label="Submit"
          type={ButtonType.Submit}
          variant={ButtonVariant.Primary}
          color={ButtonColor.Red}
        />
      </div>
    </Form>
  ),
  args: {
    schema,
  },
};

export const DefaultValues: Story = {
  render: (args) => (
    <Form {...args}>
      <Form.Input label="First Name" name="firstName" disabled={true} />
      <Form.DropDown
        label="Document Color"
        name="docColor"
        options={idOptions}
        placeHolder={'Choose a color...'}
        disabled
      />
      <Form.DropDown
        label="Document Color"
        name="docColor2"
        options={idOptions}
        placeHolder={'Choose a color...'}
      />
      <Form.DatePicker
        label="Shipping Date"
        name="shipping"
        disabled={true}
        format={'DD/MM/YYYY'}
      />
      <Form.RadioGroup
        label="Do you agree to T&Cs?"
        ariaLabel={'Do you agree to the terms and conditions?'}
        name="termsAndConditions2"
        color="blue"
        direction={'column'}
        values={[
          { label: 'True', value: 'true', tooltip: 'tooltip text' },
          { label: 'False', value: 'false' },
        ]}
        disabled
        disabledType="radio"
      />
      <Form.RadioGroup
        label={
          <>
            Do you agree to T&Cs? <a href="#">Terms & Conditions</a>
          </>
        }
        ariaLabel={'Do you agree to the terms and conditions?'}
        name="termsAndConditions"
        color="blue"
        radioType="button"
        values={['Yes', 'No']}
      />
      <Form.Checkbox
        label="Do you accept that you are cool?"
        name="isCool"
        color="blue"
      />
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '10px' }}>
          <Button
            label="Reset"
            type={ButtonType.Reset}
            variant={ButtonVariant.Tertiary}
            color={ButtonColor.Red}
          />{' '}
        </div>
        <Button
          label="Submit"
          type={ButtonType.Submit}
          variant={ButtonVariant.Primary}
          color={ButtonColor.Red}
        />
      </div>
    </Form>
  ),
  args: {
    schema,
    defaultValues: {
      firstName: 'Frank',
      docColor: 'passport',
      shipping: dayjs('2022-03-02'),
      isCool: true,
      termsAndConditions: 'Yes',
    },
  },
};

/**
 * Fields for `disabledSchema`
 */
const DisabledFields = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  OVERLAP: 'overlap',
  EMPLOYER: 'employer',
  CONSOLES: 'consoles',
  FRAMEWORK: 'framework',
} as const;

const disabledSchema = yup.object({
  [DisabledFields.FIRST_NAME]: yup.string(),
  [DisabledFields.LAST_NAME]: yup.string(),
  [DisabledFields.OVERLAP]: yup.string(),
  [DisabledFields.EMPLOYER]: yup.string(),
});

export const Disabled: Story = {
  args: {
    defaultValues: {
      [DisabledFields.FIRST_NAME]:
        'John',
      [DisabledFields.LAST_NAME]:
        'Doe',
      [DisabledFields.OVERLAP]: 'long',
      [DisabledFields.EMPLOYER]: 'short',
      [DisabledFields.FRAMEWORK]: 'react',
      [DisabledFields.CONSOLES]: 'nintendo',
    },
    schema: disabledSchema,
    onStateChange: undefined,
  },
  render: (args) => {
    return (
      <Form {...args}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 30ch)',
            gap: '12px',
          }}
        >
          <Form.Input name={DisabledFields.FIRST_NAME} label="First Name" disabled />
          <Form.Input name={DisabledFields.LAST_NAME} label="Last Name" disabled />
          <Form.DropDown name={DisabledFields.OVERLAP} label="Long Employer Name" options={[{
            label: 'An employer who\'s name may overlap',
            value: 'long',
          }]} disabled />
          <Form.DropDown name={DisabledFields.EMPLOYER} label="Show Employer Name" options={[
            {
              label: 'Microsoft',
              value: 'short',
            },
            {
              label: 'Apple',
              value: 'apple',
            },
          ]} disabled />
          <Form.DropdownSearch name={DisabledFields.CONSOLES} label="Consoles" data={[
            {
              label: 'Playstation',
              value: 'playstation',
            },
            {
              label: 'Nintendo',
              value: 'nintendo',
              disabled: true,
            },
            {
              label: 'XBOX',
              value: 'xbox',
            },
          ]} selectMultiple allowClear={false} />
          <Form.DropdownSearch name={DisabledFields.FRAMEWORK} label="Framework" data={[
            {
              label: 'ReactJS',
              value: 'react',
            },
            {
              label: 'NodeJS',
              value: 'node',
            },
          ]} disabled />
        </div>
      </Form>
    );
  },
};
