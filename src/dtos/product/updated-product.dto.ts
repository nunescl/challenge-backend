import { CategoryEntity } from '../../entities/category.entity';
import { ProductEntity } from '../../entities/product.entity';
import { UpdateProductDto } from './update-product.dto';

export class UpdatedProductDto extends UpdateProductDto {
  id!: string;
  created_at!: Date;
  updated_at!: Date;
  category?: CategoryEntity

  constructor({ 
    id, 
    name, 
    description, 
    englishDescription, 
    price,
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
    this.englishDescription = englishDescription;
    this.price = price;
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
