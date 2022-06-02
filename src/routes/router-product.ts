import { Request, Response, NextFunction, Router } from "express";
import multer from "multer";
import { AppDataSource } from "../config/data-source";
import { multerConfig } from "../config/multer";
import { ProductController } from "../controllers/product.controller";
import { CreateProductDto } from "../dtos/product/create-product.dto";
import { UpdateProductDto } from "../dtos/product/update-product.dto";
import { validator } from "../middlewares";
import { ProductService } from "../services/product.service";

const router = Router()

const productController = new ProductController(
  new ProductService(AppDataSource)
)

router.post('/', 
  multer(multerConfig).single('image'),
  CreateProductDto.validators(),
  validator,
  (req: Request, res: Response, next: NextFunction)=>{
    productController.create(req, res).catch((error:Error) => {next(error)});
});

router.get('/', (req: Request, res: Response, next: NextFunction)=>{
  productController.getAll(req, res).catch((error:Error) => {
    next(error)
  });
});

router.get('/:name', (req: Request, res: Response, next: NextFunction)=>{
  productController.getAll(req, res).catch((error:Error) => {
    next(error)
  });
});

router.put('/update/:id', 
  multer(multerConfig).single('image'),
  UpdateProductDto.validators(),
  validator,
  (req: Request, res: Response, next: NextFunction)=> {
    productController.update(req, res).catch((error:Error) => {next(error)});
});

router.delete('/delete/:id', (req: Request, res: Response, next: NextFunction)=>{
  productController.delete(req, res).catch((error:Error) => {
  next(error)
  });
})

export default router
