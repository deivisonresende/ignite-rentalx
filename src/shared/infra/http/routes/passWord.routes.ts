import { ResetPasswordController } from "@modules/accounts/useCases/resetPasswordUser/resetPasswordController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/sendForgotPasswordMailController";
import { Router } from "express";

const passWordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passWordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passWordRoutes.post("/reset", resetPasswordController.handle);

export { passWordRoutes };
