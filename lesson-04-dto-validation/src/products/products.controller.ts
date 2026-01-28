import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    // Default get will get all products
    @Get()
    getAllProducts() {
        return this.productsService.findAll();
    }

    // Get specific product with id
    @Get(':id')
    getProduct(@Param('id') id: number) {
        return this.productsService.findOne(id);
    }

    @Post()
    addProduct(@Body() body: CreateProductDto) {
        return this.productsService.create(body);
    }

    @Patch(':id')
    updateProduct(@Param('id') id:number, @Body() updateProduct: UpdateProductDto) {
        return this.productsService.update(id, updateProduct);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        return this.productsService.delete(id);
    }
}
