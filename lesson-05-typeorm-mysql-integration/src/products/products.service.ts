import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private productsRepository: Repository<Product>){}

  create(createProductDto: CreateProductDto): Promise<Product> {
    // return 'This action adds a new product';
    const newProduct = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(newProduct);
  }

  findAll(): Promise<Product[]> {
    // return `This action returns all products`;
    return this.productsRepository.find();
  }

  async findOne(id: number):Promise<Product> {
    // return `This action returns a #${id} product`;
    const product = await this.productsRepository.findOneBy({id});
    if(!product) {
      throw new NotFoundException(`Product with ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    // return `This action updates a #${id} product`;
    const product = await this.findOne(id);
    // const updatedProduct = { ...product, ...updateProductDto };
    const updatedProduct = Object.assign(product, updateProductDto);
    return await this.productsRepository.save(updatedProduct);
  }

  async remove(id: number) {
    // return `This action removes a #${id} product`;
    const product = await this.findOne(id);
    this.productsRepository.remove(product);
    return { message: `Product with ${id} removed` };
  }
}
