import { onLogin } from "../../ui/auth/login";
import { setupNewsletterSubscription } from "../../ui/homepage";

const form = document.forms.login;

form.addEventListener("submit", onLogin);
setupNewsletterSubscription();
