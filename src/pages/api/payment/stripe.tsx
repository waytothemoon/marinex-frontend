import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await await getSession({ req });
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || '', { apiVersion: '2023-08-16' });

  if (session && session.token.accessToken) {
    const { amount } = req.query;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      customer: session.token.cusId
    });

    if (paymentIntent) {
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    }
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}
