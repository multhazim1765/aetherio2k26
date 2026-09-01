import { redirect } from 'next/navigation';
import { GOOGLE_FORM_REGISTRATION_URL } from '@/lib/data/events';

export const metadata = {
  title: "Register | AETHERION'26 — National Symposium",
  description: "Official registration for AETHERION'26 Technical & Non-Technical Symposium events.",
};

export default function RegisterPage() {
  redirect(GOOGLE_FORM_REGISTRATION_URL);
}
