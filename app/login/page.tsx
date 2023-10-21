import { getServerSession } from 'next-auth';
import Form from './form';
import { redirect } from 'next/navigation';


async function Login() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return <Form />;
}

export default Login;
