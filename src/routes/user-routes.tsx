import { Router } from 'express'
import * as UserController from '../controllers/user-controller';

const router: Router = Router()

//TODELETE
// Add a new user
router.post("/", UserController.CreateNewUser);

// Find one user
//router.get("/:userID", User.getUserByID);

router.get("/:userEmail", UserController.GetUserByEmail);

// Find all users
router.get("/", UserController.GetAllUsers);

/* ACCESSIBLE UNIQUEMENT SI ON EST LE USER MANIPULE */

// Update one user
router.put("/:userID", UserController.UpdateUser);

// Delete one user

module.exports = router;