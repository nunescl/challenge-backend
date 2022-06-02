import express, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./config/data-source";
import { env } from "./config/environment-variables";
import { errorHandler } from "./middlewares";
import CategoryRoutes from './routes/router-category'
import ProductRoutes from './routes/router-product'

const PORT = env.PORT || 3000
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req: Request, res: Response)=>{res.json({status: 'sucess', version:'1.0.0'}).status(200)});
app.use('/categories', CategoryRoutes);
app.use('/products', ProductRoutes);
app.use(errorHandler);

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
}).catch ((error) => console.log(error))
