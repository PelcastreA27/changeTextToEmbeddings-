import {Router} from 'express';
import embbedingRouter from './embedding.route';
//import { authenticateJWT, authorizeRoles } from '../../middlewares/authMiddleware';


const router = Router();

router.use("/api/embbeding", embbedingRouter);

export default router;