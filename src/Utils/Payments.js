import Stripe from "stripe";
export const Payment = async ({
  payment_method_types = ["card"],
  line_items,
  mode = "payment",
  success_url = process.env.success_url,
  cancel_url = process.env.cancel_url,
  metadata = {},
  customer_email='',
  discounts=[],
} = {}) => {
  const stripe = new Stripe(process.env.secret_key);
  const session = await stripe.checkout.sessions.create({
    payment_method_types,
    line_items,
    mode,
    success_url,
    cancel_url,
    metadata,
    customer_email,
    discounts,
  });
  return session;
};

// {
//     price_data:{
//         currency:'usd',
//         product_data:{
//             name
//         },
//         unit_amount:price
//     },
//     quantity
// }
