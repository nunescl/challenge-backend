import { Request, Response } from "express";
import { CreateCategoryDto } from "../dtos/category/create-category.dto";
import { CreatedCategoryDto } from "../dtos/category/created-category.dto";
import { UpdateCategoryDto } from "../dtos/category/update-category.dto";
import { CategoryService } from "../services/category.service";
import { HttpStatus } from "../utils/enums/http-status.enum";

interface CreateCategoryBody extends Request {
  body: CreateCategoryDto;
}

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async getAll(req: Request, res: Response) {
    const categories = await this.categoryService.getAll();
    return res.status(HttpStatus.OK).json(categories);
  }

  async create({body:{name}}:CreateCategoryBody, res: Response): Promise<Response<CreatedCategoryDto>> {
    const createdCategory = await this.categoryService.create({name});
    return res.status(HttpStatus.CREATED).json(createdCategory);
  }

  async update({params, body}: Request, res: Response): Promise<Response<UpdateCategoryDto>>{
    const category = await this.categoryService.update(params.id, body.name);
    return res.status(HttpStatus.NO_CONTENT).json(category);
  }
  
  async delete(req: Request, res: Response){
    const { id } = req.params;
    const category = await this.categoryService.delete(id);

    return res.status(HttpStatus.NO_CONTENT).json(category);
  }
}