import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY || "";

let tossPaymentsInstance: Awaited<ReturnType<typeof loadTossPayments>> | null =
  null;

export async function getTossPayments() {
  if (!CLIENT_KEY) {
    throw new Error("NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY is not configured");
  }

  if (!tossPaymentsInstance) {
    tossPaymentsInstance = await loadTossPayments(CLIENT_KEY);
  }

  return tossPaymentsInstance;
}

export async function requestBillingAuth(customerKey: string) {
  const tossPayments = await getTossPayments();
  const payment = tossPayments.payment({ customerKey });

  const baseUrl = window.location.origin;

  await payment.requestBillingAuth({
    method: "CARD",
    successUrl: `${baseUrl}/settings/billing/success`,
    failUrl: `${baseUrl}/settings/billing/fail`,
  });
}
