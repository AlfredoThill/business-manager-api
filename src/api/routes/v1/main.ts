import { Router } from 'express';
import AuthController from '../../controllers/AuthController';
import { Validate, Requirements } from '../../middlewares/validator';

const mainRouter: Router = Router();

mainRouter.route('/login').post(Validate(Requirements.login), AuthController.login);

export default mainRouter;
