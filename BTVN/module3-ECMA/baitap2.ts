// Class đại diện cho sản phẩm
class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public category: string
  ) { }
}

// Interface định nghĩa các phương thức quản lý sản phẩm
interface IProductManager {
  addProduct(product: Product): void;
  removeProduct(id: number): void;
  getProductById(id: number): Product | undefined;
  listAllProducts(): Product[];
  getProductNameAndCategory(id: number): Pick<Product, 'name' | 'category'> | undefined;
  getProductWithoutPrice(id: number): Omit<Product, 'price'> | undefined;
  updateProduct(id: number, updatedInfo: Partial<Product>): void;
  findProductsByCategory(category: string): Product[];
  calculateTotalInventoryValue(): number;
}

// Class triển khai quản lý sản phẩm
class ProductManager implements IProductManager {
  private products: Product[] = [];

  // Thêm sản phẩm mới
  addProduct(product: Product): void {
    if (this.products.some(p => p.id === product.id)) {
      throw new Error(`Sản phẩm mã ${product.id} đã tồn tại!`);
    }
    this.products.push(product);
    console.log(`Thêm sản phẩm ${product.name} thành công!`);
  }

  // Xóa sản phẩm
  removeProduct(id: number): void {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Sản phẩm mã ${id} không tồn tại!`);
    }
    this.products.splice(index, 1);
    console.log(`Xóa sản phẩm mã ${id} thành công!`);
  }

  // Lấy thông tin sản phẩm theo mã
  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  // Liệt kê tất cả sản phẩm
  listAllProducts(): Product[] {
    return this.products;
  }

  // Lấy tên và danh mục sản phẩm
  getProductNameAndCategory(id: number): Pick<Product, 'name' | 'category'> | undefined {
    const product = this.getProductById(id);
    if (!product) {
      return undefined;
    }
    return { name: product.name, category: product.category };
  }

  // Lấy thông tin sản phẩm không bao gồm giá
  getProductWithoutPrice(id: number): Omit<Product, 'price'> | undefined {
    const product = this.getProductById(id);
    if (!product) {
      return undefined;
    }
    return { id: product.id, name: product.name, category: product.category };
  }

  // Cập nhật thông tin sản phẩm
  updateProduct(id: number, updatedInfo: Partial<Product>): void {
    const product = this.getProductById(id);
    if (!product) {
      throw new Error(`Sản phẩm mã ${id} không tồn tại!`);
    }
    Object.assign(product, updatedInfo);
    console.log(`Cập nhật sản phẩm mã ${id} thành công!`);
  }

  // Tìm kiếm sản phẩm theo danh mục
  findProductsByCategory(category: string): Product[] {
    return this.products.filter(p => p.category === category);
  }

  // Tính tổng giá trị hàng tồn kho
  calculateTotalInventoryValue(): number {
    return this.products.reduce((total, product) => total + product.price, 0);
  }
}

// Ví dụ sử dụng
const productManager = new ProductManager();

try {
  // Thêm sản phẩm
  productManager.addProduct(new Product(1, "Laptop", 15000000, "Electronics"));
  productManager.addProduct(new Product(2, "Phone", 8000000, "Electronics"));
  productManager.addProduct(new Product(3, "Shirt", 500000, "Clothing"));

  // Cập nhật sản phẩm
  productManager.updateProduct(1, { name: "Gaming Laptop" });

  // Lấy thông tin sản phẩm
  console.log("Thông tin sản phẩm 1:", productManager.getProductById(1));
  console.log("Tên và danh mục sản phẩm 1:", productManager.getProductNameAndCategory(1));
  console.log("Thông tin sản phẩm 1 không có giá:", productManager.getProductWithoutPrice(1));

  // Tìm kiếm theo danh mục
  console.log("Sản phẩm trong danh mục Electronics:", productManager.findProductsByCategory("Electronics"));

  // Tính tổng giá trị tồn kho
  console.log("Tổng giá trị tồn kho:", productManager.calculateTotalInventoryValue());

  // Liệt kê tất cả sản phẩm
  console.log("Danh sách sản phẩm:", productManager.listAllProducts());

  // Xóa sản phẩm
  productManager.removeProduct(2);
  console.log("Danh sách sản phẩm sau khi xóa:", productManager.listAllProducts());
} catch (error) {
  console.error("Lỗi:", (error as Error).message);
}