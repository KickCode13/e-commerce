import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);

/**
 * Cria uma sessão de checkout com Stripe para múltiplos produtos.
 * @param {Array} items - Lista de objetos com name, price e quantity.
 * @returns {Object} session - Sessão do Stripe criada.
 */
export async function createCheckoutSession(items) {
  const line_items = items.map(({ name, price, quantity }) => {
    const parsedPrice = Math.round(parseFloat(price) * 100);
    const parsedQuantity = parseInt(quantity, 10);
    
    return {
      price_data: {
        currency: "brl",
        product_data: { name },
        unit_amount: parsedPrice,
      },
      quantity: parsedQuantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["US", "BR"],
    },
    success_url: `${process.env.BASE_URL}/product/complete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/cancel`,
  });

  return session;
}