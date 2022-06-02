import { body, ValidationChain } from 'express-validator';
import { RequestDto } from '../request-dto/request.dto';

export class CreateProductDto extends RequestDto {
  name!: string;
  description!: string;
  english_description!: string;
  image!: string;
  value!: number;
  personCount!: number;
  disponibility!: boolean;
  lacFree!: boolean;
  glutenFree!: boolean;
  veg!: boolean;
  categoryId!: string;

  static validators(): ValidationChain[] {
    return [
      body('name', 'Valor name não é uma string!').isString(),
      body('name', 'O campo name é obrigatório!')
        .not()
        .isEmpty({ ignore_whitespace: true }),

      body('description', 'Valor description não é uma string!').isString(),
      body('description', 'O campo description é obrigatório!')
        .not()
        .isEmpty({ ignore_whitespace: true }),

      body('english_description', 'Valor english_description não é uma string!').isString(),
      body('english_description', 'O campo english_description é obrigatório!')
        .not()
        .isEmpty({ ignore_whitespace: true }),

      body('categoryId', 'Valor categoryId não é UUID!').isUUID(),
      body('categoryId', 'O campo categoryId é obrigatório!')
        .not()
        .isEmpty({ ignore_whitespace: true }),

      body('value', 'Valor value não é um número!').isNumeric(),
      body('value', 'O campo value é obrigatório!')
        .not()
        .isEmpty({ ignore_whitespace: true }),
        
      body('personCount', 'Valor personCount não é um número!').isNumeric(),
      body('personCount', 'O campo personCount é obrigatório!')
        .not()
        .isEmpty({ ignore_whitespace: true }),

      body('disponibility', 'Valor disponibility deve ser preenchido com true ou false!').isBoolean(),
      body('disponibility', 'O campo disponibility é obrigatório!')
        .not()
        .isEmpty({ ignore_whitespace: true }),
      
      body('lacFree', 'Valor lacFree deve ser preenchido com true ou false!').isBoolean(),
      body('lacFree', 'O campo lacFree é obrigatório!')
        .not()
        .isEmpty({ ignore_whitespace: true }),
      
      body('glutenFree', 'Valor glutenFree deve ser preenchido com true ou false!').isBoolean(),
      body('glutenFree', 'O campo glutenFree é obrigatório!')
        .not()
        .isEmpty({ ignore_whitespace: true }),
      
      body('veg', 'Valor veg deve ser preenchido com true ou false!').isBoolean(),
      body('veg', 'O campo veg é obrigatório!')
        .not()
        .isEmpty({ ignore_whitespace: true }),
    ];
  }
}
