import { Request, Response, NextFunction, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { CategoryController } from "../controllers/category.controller";
import { CreateCategoryDto } from "../dtos/category/create-category.dto";
import { validator } from "../middlewares";
import { CategoryService } from "../services/category.service";

const router = Router()

const categoryController = new CategoryController(
  new CategoryService(AppDataSource)
)

router.get('/', (req: Request, res: Response, next: NextFunction)=>{
  categoryController.getAll(req, res).catch((error:Error) => {
    next(error)
  });
});

router.post('/', 
  CreateCategoryDto.validators(),
  validator,
  (req: Request, res: Response, next: NextFunction)=>{
    categoryController.create(req, res).catch((error:Error) => {next(error)});
});

router.put('/update/:id', 
  CreateCategoryDto.validators(),
  validator,
  (req: Request, res: Response, next: NextFunction)=>{
    categoryController.update(req, res).catch((error:Error) => {next(error)});
});

router.delete('/delete/:id', (req: Request, res: Response, next: NextFunction)=>{
  categoryController.delete(req, res).catch((error:Error) => {
  next(error)
  });
})

export default router
