// next
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserRole } from 'types/auth';

// third-party
import axios from 'utils/axios';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'signin',
      name: 'Signin',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const res = await axios.post('/api/v1/user/login', {
            password: credentials?.password,
            email: credentials?.email
          });

          if (res.data && res.data.msg === 'Email verification has sent to your email') {
            throw new Error('email not verified');
          }

          return { email: credentials?.email, id: '' };
        } catch (error: any) {
          throw new Error('Invalid Email or Password');
        }
      }
    }),
    CredentialsProvider({
      id: 'signup',
      name: 'Signup',
      credentials: {
        firstName: { label: 'First Name', type: 'text', placeholder: 'Enter First Name' },
        lastName: { label: 'Last Name', type: 'text', placeholder: 'Enter Last Name' },
        email: { label: 'Email', type: 'text', placeholder: 'Enter Email' },
        phoneNumber: { label: 'Phone Number', type: 'text', placeholder: 'Enter Phone Number' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter Password' },
        referralCode: { label: 'Referral Code', type: 'password', placeholder: 'Enter Referral Code' },
        role: { label: 'Role', type: 'text', placeholder: 'Enter Role' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('/api/v1/user/register', {
            firstName: credentials?.firstName,
            lastName: credentials?.lastName,
            email: credentials?.email,
            phoneNumber: credentials?.phoneNumber,
            password: credentials?.password,
            referralCode: credentials?.referralCode,
            role: credentials?.role
          });
          return {
            id: user.data._id,
            email: user.data.email
          };
        } catch (error: any) {
          var errors;
          if (error.response.data) {
            errors = JSON.stringify(error.response.data);
          } else {
            errors = JSON.stringify({ submit: error.message });
          }
          throw new Error(errors);
        }
      }
    }),
    CredentialsProvider({
      id: 'verifyOtp',
      name: 'VerifyOtp',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Enter Email' },
        otp: { label: 'OTP', type: 'text', placeholder: 'Enter OTP Code' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('/api/v1/user/verify-otp', {
            email: credentials?.email,
            otp: credentials?.otp
          });
          return {
            id: '',
            email: credentials?.email,
            accessToken: user.data.token,
            fullName: user.data.fullName,
            role:
              user.data.role === 'investor' ? UserRole.INVESTOR : user.data.role === 'prowner' ? UserRole.PROJECT_OWNER : UserRole.ADMIN,
            kycStatus: user.data.kycStatus,
            walletAddress: user.data.walletAddress,
            cusId: user.data.cus_id
          };
        } catch (error: any) {
          var errors;
          if (error.response.data) {
            errors = JSON.stringify(error.response.data.msg);
          } else {
            errors = JSON.stringify(error.message);
          }
          throw new Error(errors);
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account, trigger, session }) => {
      if (account?.provider === 'signup' && user) {
        token.id = user.id;
        token.email = user.email;
      }
      if (account?.provider === 'verifyOtp' && user) {
        token.email = user.email;
        token.accessToken = (user as any).accessToken;
        token.fullName = (user as any).fullName;
        token.role = (user as any).role;
        token.kycStatus = (user as any).kycStatus;
        token.walletAddress = (user as any).walletAddress;
        token.cusId = (user as any).cusId;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.token = token;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.REACT_APP_JWT_TIMEOUT!)
  },
  jwt: {
    secret: process.env.REACT_APP_JWT_SECRET
  },
  pages: {
    signIn: '/signin',
    newUser: '/signup',
    verifyRequest: '/verifyOtp'
  }
};
export default NextAuth(authOptions);
