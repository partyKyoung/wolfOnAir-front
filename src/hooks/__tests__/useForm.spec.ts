import { ChangeEvent } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import useForm from '../useForm';

interface FormValues {
  name: string;
  value: string;
}

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function validate(values: any): any {
  const errors = {} as FormValues;

  if (!values.name) {
    errors.name = 'no value';
  } else if (values.name === 'error') {
    errors.name = 'It is Error!';
  }

  if (!values.value) {
    errors.value = 'no value';
  }

  return errors;
} 

async function asyncValidateName (name: string) {
  return timeout(1000).then(() => {
    if (['john', 'paul', 'george', 'ringo'].includes(name)) {
      return { name: 'That name is taken' }
    }

    return { name: '' }
  });
}

describe("useForm", () => {
  test('state 값들이 정상적으로 initialize 된다.', () => {
    const { result } = renderHook(() => useForm({
      initialValues: {
        name: '',
        value: ''
      },
      validate,
      asyncValidate: {
        name: asyncValidateName
      }
    }));
    const [values] = result.current;

    expect(values.name).toEqual('');
    expect(values.value).toEqual('');
  });

  test('state 값들이 정상적으로 변경된다.', () => {
    const { result } = renderHook(() => useForm({
      initialValues: {
        name: '',
        value: ''
      },
      validate,
      asyncValidate: {
        name: asyncValidateName
      }
    }));
    const [,, onChange] = result.current;

    act(() => {
      onChange({
        target: {
          value: 'test',
          name: 'value'
        }
      } as ChangeEvent<HTMLInputElement>);  
    });
   
    const [values] = result.current;

    expect(values.value).toEqual('test');
  });

  test('state 값들의 validation check를 정상적으로 할 수 있다.', async () => {
    const { result } = renderHook(() => useForm({
      initialValues: {
        name: '',
        value: ''
      },
      validate,
      asyncValidate: {
        name: asyncValidateName
      }
    }));
    const [,,, onBlur] = result.current;

    act(() => {
      onBlur({
        target: {
          value: 'error',
          name: 'value'
        }
      } as ChangeEvent<HTMLInputElement>);
    })

    const [, errors,,,, isValid] = result.current;

    expect(errors.value).toEqual('error!');
    expect(isValid).toEqual(false);

    await act(async () => {
      await onBlur({
        target: {
          value: 'error',
          name: 'value'
        }
      } as ChangeEvent<HTMLInputElement>);
    })

    const [, errors2,,,, isValid2] = result.current;

    expect(errors2.value).toEqual('That rname is taken');
    expect(isValid2).toEqual(false);

    await act(async () => {
      await onBlur({
        target: {
          value: 'error',
          name: 'value'
        }
      } as ChangeEvent<HTMLInputElement>);
    })

    const [, errors3,,,, isValid3] = result.current;

    expect(errors3.value).toEqual('');
    expect(isValid3).toEqual(true);
  })


  // test('onSubmit 함수를 정상적으로 실행할 수 있다.', () => {})
});
