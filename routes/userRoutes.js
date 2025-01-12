import Router from 'express'
const router=Router();
import userController from '../controllers/userController.js';
import checkUserAuth from '../middleware/checkuserauth.js';


//public routes

router.post('/register',userController.userRegistration)
router.post('/login',userController.userLogin)
//router.post('/resetpassword',userController.resetpassmail)
//router.post('/forgotpassword',userController.userpassReset)

//private routes
router.post('/changepassword',checkUserAuth,userController.changePassword)
//router.get('/logged',checkAuth,userController.loggedUser)

export default router