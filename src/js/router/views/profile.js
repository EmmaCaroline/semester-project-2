import { authGuard } from "../../utilities/authGuard";
import { readProfileData } from "../../ui/profile/profile";

authGuard();
readProfileData();
