import express from "express"
import { getUsers, addUser, getUserById, deleteUser, updateUser} from '../controllers/user.js'

const router = express.Router();

router.get("/", getUsers)

router.post("/", addUser)

router.get('/:id', getUserById);

router.delete('/:id', deleteUser);

router.put('/:id', updateUser);

export default router;