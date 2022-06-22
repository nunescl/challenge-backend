import { Request, Response } from "express"
import { resolve } from "path";
import { CreatedProductDto } from '../dtos/product/created-product.dto';
import { UpdatedProductDto } from '../dtos/product/updated-product.dto';
import { ProductService } from '../services/product.service';
import { HttpStatus } from '../utils/enums/http-status.enum'

export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  async create({body, file}:Request, res: Response): Promise<Response<CreatedProductDto>> {
    const createdProduct = await this.productService.create({...body, 
      image:file?.filename,
      disponibility: body.disponibility === "true" ? true : false,
      lacFree: body.lacFree === "true" ? true : false,
      glutenFree: body.glutenFree === "true" ? true : false,
      veg: body.veg === "true" ? true : false,
    });
    return res.status(HttpStatus.CREATED).json(createdProduct);
  }

  async getAll(req: Request, res: Response): Promise<Response<CreatedProductDto>> {
    const products = await this.productService.getAll(req.query);
    return res.status(HttpStatus.OK).json(products);
  }
  
  async show({params}: Request, res: Response){
    const product = await this.productService.show(params.id);
    return res.status(HttpStatus.OK).json(product)
  }

  async update({params, body, file}: Request, res: Response):
  Promise<Response<UpdatedProductDto>>{
    const product = await this.productService.update(params.id, {...body,
      image:file?.filename,
      disponibility: body.disponibility === "true" ? true : false,
      lacFree: body?.lacFree,
      glutenFree: body?.glutenFree,
      veg: body?.veg,

    });
    return res.status(HttpStatus.NO_CONTENT).json(product);
  }

  async delete({params}: Request, res: Response){
    const product = await this.productService.delete(params.id);
    return res.status(HttpStatus.NO_CONTENT).json(product);
  }
  
  async getImageByName(
    {params}: Request, res: Response
  ): Promise<any>{
    const directory = resolve(__dirname, '..', 'uploads')
    return res.status(HttpStatus.OK).sendFile(`${directory}/${params.name}`)
  }
}

