import { useState } from "react";

type valitationFuncType = (value: string, compareValue?: string) => string;
type valitationAsyncFuncType = (value: string) => Promise<string>;

function useValidationInput(
  defaultValue: string,
  valitationFunc?: valitationFuncType | valitationAsyncFuncType
) {
  const [value, setValue] = useState(defaultValue);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setValid] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!valitationFunc) {
      return;
    }

    try {
      const errorMessage = await valitationFunc(e.target.value);

      setErrorMessage(errorMessage);
      setValid(errorMessage === '');
    } catch (e) {
      setErrorMessage("알수없는 오류가 발생하였습니다.");
      setValid(false);
    }
  };

  const onSetError = (isValid: boolean, errorMessage: string) => {
    setErrorMessage(errorMessage);
    setValid(isValid);
  };

  const onReset = () => {
    setValue(defaultValue);
    setErrorMessage("");
    setValid(false);
  };

  return [
    value,
    errorMessage,
    isValid,
    onChange,
    onBlur,
    onSetError,
    onReset
  ] as [
    string,
    string,
    boolean,
    typeof onChange,
    typeof onBlur,
    typeof onSetError,
    typeof onReset
  ];
}

export default useValidationInput;
