import {
  ClButton,
  ClCheckbox,
  ClCheckInputFormik,
  ClCol,
  ClContainer,
  ClDropzone,
  ClDropzoneFormik,
  ClRadioInputFormik,
  ClRow,
  ClSelectInput,
  ClSelectInputFormik,
  ClSliderInputFormik,
  ClTextInput,
  ClTextInputFormik,
} from '@codelab/ui';
import { useLocalStorage } from '@codelab/hooks';
import Head from 'next/head';

import { Form, Formik } from 'formik';
// import { ClAvatar } from '@codelab/ui/src/components/avatar/Avatar';

export default function Home() {
  //set ts type to default or dark
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  const handleThemeChange = () => {
    if (theme === 'default') {
      setTheme('dark');
    } else {
      setTheme('default');
    }
  };
  const checks = [
    { label: 'Check1', value: 'check1' },
    { label: 'Check2', value: 'check2' },
  ];
  const radios = [
    { label: 'radio1', value: 'radio1' },
    { label: 'radio2', value: 'radio2' },
  ];
  const selectOptions = [
    {
      groupLabel: 'Fruits',
      options: [
        { label: 'Apple', value: 'apple' },
        { label: 'Mango', value: 'mango' },
      ],
    },
    {
      groupLabel: 'Meat',
      options: [
        { label: 'Mutton', value: 'mutton' },
        { label: 'Chicken', value: 'chicken' },
      ],
    },
  ];
  return (
    <div className={`theme--${theme}`}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <ClContainer>
          <Formik
            initialValues={{
              images: [
                { preview: 'https://source.unsplash.com/300x300',id:1 },
                { preview: 'https://source.unsplash.com/200x300',id:2 },
              ],
            }}
            onSubmit={(values) => console.log(values)}
          >
            <Form>
              <ClRow>
                <ClCol sm={4}>
                  <ClTextInputFormik placeholder={'Name'} name='name' />
                </ClCol>

                <ClCol sm={4}>
                  <ClTextInputFormik
                    Control='textarea'
                    placeholder={'Select Food'}
                    name='description'
                  />
                </ClCol>
                <ClCol sm={4}>
                  <ClSliderInputFormik name='price' />
                </ClCol>
                <ClCol sm={12}>
                  <ClDropzoneFormik
                    name='images'
                    uploadConfig={{ url: 'http://localhost:4000/api/upload/products', method: 'post' }}
                  />
                </ClCol>
                <ClCol>
                  <ClButton>Submit</ClButton>
                </ClCol>
              </ClRow>
            </Form>
          </Formik>
        </ClContainer>

        {/* <ClAvatar variant={'success'} size='xxl'>
          <span>AB</span>
        </ClAvatar> */}
      </main>
    </div>
  );
}
