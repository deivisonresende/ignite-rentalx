import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ListAllUsersController } from "@modules/accounts/useCases/listUsers/listAllUsersController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/profileUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";
import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { ensureAdmin } from "../middlewares/ensureAdmin";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const listAllUsersController = new ListAllUsersController();

const profileUserController = new ProfileUserController();

usersRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createUserController.handle
);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

usersRoutes.get(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  listAllUsersController.handle
);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
