import { onRegister } from "../../ui/auth/register";
import { setupNewsletterSubscription } from "../../ui/homepage";

const form = document.forms.register;

form.addEventListener("submit", onRegister);
setupNewsletterSubscription();
