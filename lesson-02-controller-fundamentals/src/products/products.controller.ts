import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get()
    getAllProducts() :any {
        return { message:" get all products" };
    }

    @Post()
    createProduct(@Body() taskData: any): any {
        return {
            message: "Task created Success fully",
            data: taskData
        };
    }

    @Get(':id')
    getProduct(@Param('id') id:string): any {
        return `this return task by id ${id}`;
    }

    @Put(':id')
    updateProduct(@Param('id') id:string, @Body() updateData: any):any {
        return {
            message: `Product ${id} successfully updated`,
            updateData: updateData
        };
    }

    @Delete(':id')
    deleteProduct(@Param('id') id:string) : any {
        return { message: `Product ${id} deleted Successfully`}
    }
}
