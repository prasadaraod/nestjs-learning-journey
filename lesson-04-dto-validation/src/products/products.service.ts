import { Injectable, NotFoundException } from '@nestjs/common';
import { title } from 'process';

@Injectable()
export class ProductsService {
    private products = [
        {
            id: 1,
            title: 'Laptop',
            price: 50000
        },
        {
            id: 2,
            title: 'Mouse',
            price: 1000
        }
    ];
    
    findAll() {
        return this.products;
    }

    findOne(id: number) {
        const product = this.products.find((p) => p.id === id);
        if(!product) {
            throw new NotFoundException(`Product with ${id} not found`);
        }
        return product;
    }

    create(newProduct : any) {
        let nextId: number;
        let maxId = 0;
        if (this.products.length > 0) {
            for(const product of this.products) {
                if(product.id > maxId) {
                    maxId = product.id;
                }
            }
            nextId = maxId + 1;
        } else {
            nextId = 1;
        }
        const id = this.products.length + 1;
        const product = { id: nextId, ...newProduct };
        this.products.push(product);
        return product;
    }

    update(id: number, updateData: { title?:string, price?: number }) {
        const index = this.products.findIndex(p => p.id === id);
        if( index === -1) {
            throw new NotFoundException(`Product with ${id} not found`);
        }
        const currentProduct = this.products[index];
        const updatedProduct = { ...currentProduct, ...updateData };
        this.products[index] = updatedProduct;
        return updatedProduct;
    }

    delete(id:number) {
        const index = this.products.findIndex(p => p.id === id);
        if( index === -1) {
            throw new NotFoundException(`Product with ${id} not found`);
        }
        this.products.splice(index,1);
        return { message: 'Product deleted' };
    }
}
