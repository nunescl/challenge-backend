import { DataSource, FindOperator, ILike, Like, Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { CreatedProductDto } from '../dtos/product/created-product.dto';
import { UpdateProductDto } from '../dtos/product/update-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { HttpException } from '../handler-exceptions/http-exception.provider';
import { HttpStatus } from '../utils/enums/http-status.enum';

export class ProductService {
  private productRepository: Repository<ProductEntity>;

  constructor(private readonly connection: DataSource) {
    this.productRepository = this.connection.getRepository(ProductEntity);
  }

  async create({name, description, englishDescription, image, value, personCount, disponibility, lacFree, glutenFree, veg, categoryId}: CreateProductDto): Promise<CreatedProductDto> {
    try {
      const createProduct = this.productRepository.create({category:{id:categoryId}, name, description, englishDescription, image, value, personCount, disponibility, lacFree, glutenFree, veg});
      const savedProduct = await this.productRepository.save(createProduct);
      return new CreatedProductDto(savedProduct);
    } catch (error) {
      throw new HttpException('Houve um erro ao adicionar curso!', HttpStatus.BAD_REQUEST);
    }
  }
  
  async getAll({name, categoryName, disponibility, lacFree, glutenFree, veg}:{
    name?:string | FindOperator<string>,
    categoryName?:string | FindOperator<string>
    disponibility?:boolean,
    lacFree?:boolean,
    glutenFree?:boolean,
    veg?:boolean,
    }): Promise<CreatedProductDto[]> {    
      const filters = {name, categoryName, disponibility, lacFree, glutenFree, veg}
        if(name)
          {filters['name'] = ILike(`%${name}%`)}
        if(categoryName)
          {filters['categoryName'] = ILike(`%${categoryName}%`)}
        if(disponibility)
          {filters['disponibility'] = 
            typeof disponibility === "string" && disponibility === "true" ? true : false}
        if(lacFree)
          {filters['lacFree'] = 
            typeof lacFree === "string" && lacFree === "true" ? true : false}
        if(glutenFree)
          {filters['glutenFree'] = 
            typeof glutenFree === "string" && glutenFree === "true" ? true : false}
        if(veg)
          {filters['veg'] = 
            typeof veg === "string" && veg === "true" ? true : false}
    try {
      const products = await this.productRepository.find({relations: ["category"], where: filters});
      return products.map((product) => new CreatedProductDto(product));
    } catch (error) {
      throw new HttpException('Houve um erro ao listar produtos!', HttpStatus.BAD_REQUEST,);
    }
  }

  async show(id:string): Promise<CreatedProductDto> {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
      });
      if (!product){
        throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND);
      }
      return new CreatedProductDto(product);
    } catch (error) {
      throw new HttpException('Houve um erro ao listar produtos!', HttpStatus.BAD_REQUEST,);
    }
  }

  async update(id:string, params: UpdateProductDto): Promise<void> {
    try {
      const product = await this.productRepository.findOne({
        where: {id}
      })
      if(!product) {
        throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND,)
      }; 
      await this.productRepository.update(id, {...product, ...params})
    } catch (error) {
      if(error instanceof HttpException) throw error;
      throw new HttpException('Houve um erro ao atualizar produtos!', HttpStatus.BAD_REQUEST,);
    }
  }

  async delete(id:string){
    try {
      const products = await this.productRepository.delete(id)
      return products;
    } catch (error) {
      throw new HttpException('Houve um erro ao deletar o produto!', HttpStatus.BAD_REQUEST,);
    }
  }
}
