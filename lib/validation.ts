export type Fulfillment = "pickup" | "delivery";

export type CheckoutValues = {
  name: string;
  phone: string;
  fulfillment: Fulfillment;
  address: string;
  notes: string;
};

export type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>;

export const EMPTY_CHECKOUT: CheckoutValues = {
  name: "",
  phone: "",
  fulfillment: "pickup",
  address: "",
  notes: "",
};

const PHONE_PATTERN = /^[+()\-\s\d]{7,20}$/;

export function validateCheckout(values: CheckoutValues): {
  valid: boolean;
  errors: CheckoutErrors;
} {
  const errors: CheckoutErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = "Please enter the name for this order.";
  } else if (name.length < 2) {
    errors.name = "Please enter at least 2 characters.";
  } else if (name.length > 80) {
    errors.name = "That name is a little too long.";
  }

  const phone = values.phone.trim();
  if (!phone) {
    errors.phone = "Please enter a contact number for this order.";
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = "Use digits, spaces, or + ( ) - only.";
  } else if (phone.replace(/\D/g, "").length < 7) {
    errors.phone = "That phone number looks too short.";
  }

  if (values.fulfillment === "delivery") {
    const address = values.address.trim();
    if (!address) {
      errors.address = "Delivery orders need a delivery address.";
    } else if (address.length < 8) {
      errors.address = "Please add a little more detail for the rider.";
    }
  }

  if (values.notes.trim().length > 400) {
    errors.notes = "Please keep notes under 400 characters.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
