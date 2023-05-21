import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { FirebaseDataService } from './firebase-data.service';
import { Product } from 'src/app/models/product';

export interface User0 {
    id: string;
    name: string;
    email: string;
    phone: string;
    points: number;
    shoppingCart: Map<string, number>;
    fav: []
}

@Injectable({
  providedIn: 'root'
})
// mañana mirar quien se hace responsable de que sea usada 
export class SqliteDataService {
   private db: SQLiteObject;

  constructor(private sqlite: SQLite) { }

  async initDatabase() {
    try {
      this.db = await this.sqlite.create({
        name: 'mydatabase.db',
        location: 'default'
      });

      // Crear tabla de productos
      await this.db.executeSql(`
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY,
          category TEXT,
          description TEXT,
          discount REAL,
          hasPoints INTEGER,
          image TEXT,
          name TEXT,
          price REAL
        )
      `, []);

      console.log('Base de datos inicializada');
    } catch (error) {
      console.error('Error al inicializar la base de datos', error);
    }
  }
async addFavProduct(producto:Product) {
  try {
    const data = [producto.category, producto.description, producto.discount, producto.hasPoints, producto.image, producto.name, producto.price];
    const result = await this.db.executeSql(`INSERT INTO products (category, description, discount, hasPoints, image, name, price) VALUES (?, ?, ?, ?, ?, ?, ?)`, data);
    console.log('Producto añadido a la tabla', result);
  } catch (error) {
    console.error('Error al añadir el producto a la tabla', error);
  }
}
async removeFavProduct(productId) {
  try {
    const result = await this.db.executeSql(`DELETE FROM products WHERE id = ?`, [productId]);
    console.log('Producto eliminado de la tabla', result);
  } catch (error) {
    console.error('Error al eliminar el producto de la tabla', error);
  }
}
async addMultipleFavProducts(productos:Product[]) {
  try {
    const values = productos.map(producto => `('${producto.category}', '${producto.description}', ${producto.discount}, ${producto.hasPoints}, '${producto.image}', '${producto.name}', ${producto.price})`).join(',');
    const result = await this.db.executeSql(`INSERT INTO products (category, description, discount, hasPoints, image, name, price) VALUES ${values}`, []);
    console.log('Productos añadidos a la tabla', result);
  } catch (error) {
    console.error('Error al añadir los productos a la tabla', error);
  }
}
async getFavProduct(productId) {
  try {
    const result = await this.db.executeSql(`SELECT * FROM products WHERE id = ?`, [productId]);
    if (result.rows.length > 0) {
      const producto = result.rows.item(0);
      console.log('Producto recuperado de la tabla', producto);
      return producto;
    } else {
      console.error('No se encontró ningún producto con el ID especificado');
      return null;
    }
  } catch (error) {
    console.error('Error al recuperar el producto de la tabla', error);
    return null;
  }
}
async getAllFavProducts() {
  try {
    const result = await this.db.executeSql(`SELECT * FROM products`, []);
    const productos = [];
    for (let i = 0; i < result.rows.length; i++) {
      const producto = result.rows.item(i);
      productos.push(producto);
    }
    console.log('Productos recuperados de la tabla', productos);
    return productos;
  } catch (error) {
    console.error('Error al recuperar los productos de la tabla', error);
    return null;
  }
}


}
