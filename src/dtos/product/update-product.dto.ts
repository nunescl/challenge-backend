import { body, ValidationChain } from 'express-validator';
import { RequestDto } from '../request-dto/request.dto';

export class UpdateProductDto extends RequestDto {
  name?: string;
  description?: string;
  englishDescription?: string;
  image?: string;
  price?: number;
  personCount?: number;
  disponibility?: boolean;
  lacFree?: boolean;
  glutenFree?: boolean;
  veg?: boolean;
  categoryId?: string;
 

  static validators(): ValidationChain[] {
    return [
    
    ];
  }
}
