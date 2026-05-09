"use server";

export async function submitContact(prevState, formData) {
  const name = formData.get("name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !phone) {
    return { success: false, error: "required" };
  }

  if (!/^\+?[\d\s\-()]{7,20}$/.test(phone)) {
    return { success: false, error: "invalid_phone" };
  }

  // TODO: send to CRM / email / Strapi
  console.log("Contact submission:", { name, phone, message });

  return { success: true };
}
