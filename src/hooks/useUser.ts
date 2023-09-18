// next
import { useSession } from 'next-auth/react';

interface UserProps {
  name: string;
  email: string;
  avatar: string;
  thumb: string;
  role: number;
}

const useUser = () => {
  const { data: session } = useSession();
  if (session) {
    const user = session?.token;

    const newUser: UserProps = {
      name: user.fullName || 'Unknown',
      email: user.email || 'Unknown',
      avatar: '/assets/images/users/avatar-1.png',
      thumb: '/assets/images/users/avatar-thumb-1.png',
      role: user.role
    };

    return newUser;
  }
  return false;
};

export default useUser;
