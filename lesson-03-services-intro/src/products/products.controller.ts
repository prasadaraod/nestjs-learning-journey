import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

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
    getProduct(@Param('id') id: string) {
        return this.productsService.findOne(+id);
    }

    @Post()
    addProduct(@Body() body: { title: string, price: number }) {
        return this.productsService.create(body);
    }

    @Patch(':id')
    updateProduct(@Param('id') id:string, @Body() body: { title?:string , price?:number}) {
        return this.productsService.update(+id, body);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return this.productsService.delete(+id);
    }
}
