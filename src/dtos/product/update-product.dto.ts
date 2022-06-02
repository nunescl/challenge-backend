import { body, ValidationChain } from 'express-validator';
import { RequestDto } from '../request-dto/request.dto';

export class UpdateProductDto extends RequestDto {
  name?: string;
  description?: string;
  english_description?: string;
  image?: string;
  value?: number;
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
