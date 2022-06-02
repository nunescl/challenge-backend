import { CategoryEntity } from '../../entities/category.entity';
import { ProductEntity } from '../../entities/product.entity';
import { CreateProductDto } from './create-product.dto';

export class CreatedProductDto extends CreateProductDto {
  id!: string;
  created_at!: Date;
  updated_at!: Date;
  category?: CategoryEntity

  constructor({ 
    id, 
    name, 
    description, 
    english_description, 
    value,
    personCount,
    image,
    disponibility,
    lacFree,
    glutenFree,
    veg, 
    created_at, 
    updated_at,
    category }: ProductEntity) 
    {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.english_description = english_description;
    this.value = value;
    this.personCount = personCount;
    this.image = image;
    this.disponibility = disponibility;
    this.lacFree = lacFree;
    this.glutenFree = glutenFree;
    this.veg = veg;
    this.created_at = created_at; 
    this.updated_at = updated_at;
    this.category = category;
  }
}
