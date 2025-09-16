import { SignInData } from './form.config';

export const useSignInHook = () => {
  const handleSubmit = async (data: SignInData) => {
    // eslint-disable-next-line no-console
    console.log(data, 'from submit method');
  };

  return {
    handleSubmit
  };
};
