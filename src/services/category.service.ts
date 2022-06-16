import { Repository, DataSource } from "typeorm";
import { CreatedCategoryDto } from "../dtos/category/created-category.dto";
import { CreateCategoryDto } from "../dtos/category/create-category.dto";
import { CategoryEntity } from "../entities/category.entity";
import { HttpException } from "../handler-exceptions/http-exception.provider";
import { HttpStatus } from "../utils/enums/http-status.enum";

export class CategoryService {
  private categoryRepository: Repository<CategoryEntity>;
  
  constructor(private readonly connection: DataSource) {
    this.categoryRepository = this.connection.getRepository(CategoryEntity);
  }

  async getAll(): Promise<any>{
    try {
      const categories = await this.categoryRepository.find();
      return categories.map((category)=> new CreatedCategoryDto(category))
    } catch (error) {
      throw new HttpException('Houve um erro ao listar categorias', HttpStatus.BAD_REQUEST)
    }
  }

  async create({ name }: CreateCategoryDto): Promise<CreatedCategoryDto> {
    try {
      const createCategory = this.categoryRepository.create({ name });
      const savedCategory = await this.categoryRepository.save(createCategory);
      return new CreatedCategoryDto(savedCategory)
    } catch (error) {
      console.log(error)
      throw new HttpException('Houve um erro ao adicionar categoria!', HttpStatus.BAD_REQUEST)
    }
  }
  
  async update(id:string, name:string): Promise<void> {
    try {
      await this.categoryRepository.update(id, {name})
    } catch (error) {
      throw new HttpException('Houve um erro ao listar categorias!', HttpStatus.BAD_REQUEST,);
    }
  }

  async delete(id:string): Promise<void> {
    try {
      await this.categoryRepository.delete(id)
    } catch (error) {
      throw new HttpException('Houve um erro ao listar categorias!', HttpStatus.BAD_REQUEST,);
    }
  }
}
