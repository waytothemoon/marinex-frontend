import { useEffect, useState } from 'react';

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
  const [user, setUser] = useState<UserProps>({
    name: 'Unknown',
    email: 'Unknown',
    avatar: '/assets/images/users/avatar-1.png',
    thumb: '/assets/images/users/avatar-thumb-1.png',
    role: 2
  });

  useEffect(() => {
    if (session) {
      const token = session.token;

      const newUser: UserProps = {
        name: token.fullName || 'Unknown',
        email: token.email || 'Unknown',
        avatar: '/assets/images/users/avatar-1.png',
        thumb: '/assets/images/users/avatar-thumb-1.png',
        role: Number(token.role)
      };
      setUser(newUser);
    }
  }, [session]);

  return user;
};

export default useUser;
