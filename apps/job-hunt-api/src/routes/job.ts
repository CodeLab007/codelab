import express from 'express';
import authMiddlewareFunction from '../middlewares/auth-middleware';
import { Create,Get,Delete,List,Update} from '../controllers/job';
const router = express.Router();


router.post('/create',authMiddlewareFunction(), Create);

router.get('/get/:id',authMiddlewareFunction(), Get);

router.delete('/delete/:id',authMiddlewareFunction(), Delete);

router.put('/update/:id',authMiddlewareFunction(), Update);

router.post('/list',authMiddlewareFunction(), List);



export default router;
