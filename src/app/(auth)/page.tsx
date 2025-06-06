import { redirect } from 'next/navigation';

const AuthPage = () => {
  redirect('/login');
};

export default AuthPage;
