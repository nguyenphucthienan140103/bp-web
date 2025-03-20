// Mock product data
const products = [
  // Electronics Category
  {
    id: 1,
    name: "Iphone 16ProMax",
    price: 699.99,
    description: "Latest smartphone with advanced features",
    image:
      "https://minhtuanmobile.com/uploads/products/240910084128-iphone-16-pro-max-desert-titanium-pdp-image-position-1a-desert-titanium-color-vn-vi.jpg",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 299.99,
    description: "Advanced fitness and health tracking",
    image:
      "https://pisenvietnam.vn/upload/product/smart-watch-dong-ho-thong-minh-pisen1_0357.jpg",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 149.99,
    description: "High-quality wireless audio experience",
    image: "https://cdn.mos.cms.futurecdn.net/fsDKHB3ZyNJK6zMpDDBenB.jpg",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Laptop Pro",
    price: 1299.99,
    description: "Powerful laptop for professionals",
    image:
      "https://macvn.com.vn/wp-content/uploads/2024/08/Macbook-Pro-13inch-2019-USED-1-1200x846.jpg",
    category: "Electronics",
  },

  // Fashion Category
  {
    id: 5,
    name: "Designer Backpack",
    price: 89.99,
    description: "Stylish and practical everyday backpack",
    image:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1721748590-547965_FADID_9762_001_089_0000_Light.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
    category: "Fashion",
  },
  {
    id: 6,
    name: "Trendy Sneakers",
    price: 129.99,
    description: "Comfortable and stylish sneakers for everyday wear",
    image: "https://i.ebayimg.com/images/g/uK4AAOSwPtdjsqdF/s-l1600.webp",
    category: "Fashion",
  },
  {
    id: 7,
    name: "Urban Jacket",
    price: 159.99,
    description: "Modern urban style jacket perfect for any occasion",
    image:
      "https://dytbw3ui6vsu6.cloudfront.net/media/catalog/product/resize/914x1200/ADLV/24FW-OT-PD-LG-BDC-PNK/24FW-OT-PD-LG-BDC-PNK-002.webp",
    category: "Fashion",
  },
  {
    id: 8,
    name: "Designer Jeans",
    price: 79.99,
    description: "Premium quality jeans with perfect fit",
    image: "https://www.mytheresa.com/media/1094/1238/100/a7/P00685865.jpg",
    category: "Fashion",
  },

  // Accessories Category
  {
    id: 9,
    name: "Classic Watch",
    price: 199.99,
    description: "Elegant timepiece with leather strap",
    image:
      "https://watchwear.eu/wp-content/uploads/2022/03/Steel-Solar-Green-Brown-Classic-01.jpg",
    category: "Accessories",
  },
  {
    id: 10,
    name: "Leather Wallet",
    price: 49.99,
    description: "Genuine leather wallet with multiple card slots",
    image: "https://www.mytheresa.com/media/1094/1238/100/0f/P01020451.jpg",
    category: "Accessories",
  },
  {
    id: 11,
    name: "Sunglasses Pro",
    price: 129.99,
    description: "Premium sunglasses with UV protection",
    image:
      "https://kinhhaitrieu.com/wp-content/uploads/2013/08/Furla-SFU427J_300X-2-768x768.jpg",
    category: "Accessories",
  },
  {
    id: 12,
    name: "Silver Necklace",
    price: 89.99,
    description: "Elegant sterling silver necklace with pendant",
    image:
      "https://laimut.com/wp-content/uploads/Day-Chuyen-Swarovski-Chinh-Hang-Mixed-Cuts-Mesmera-Necklace-01.jpg",
    category: "Accessories",
  },
];

// API Service class to handle all data operations
class ApiService {
  constructor() {
    this.products = products;
  }

  // Get all products
  async getAllProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 500); // Simulate network delay
    });
  }

  // Get featured products (first 3 products from each category)
  async getFeaturedProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const featured = [];
        const categories = [...new Set(this.products.map((p) => p.category))];

        categories.forEach((category) => {
          const categoryProducts = this.products
            .filter((p) => p.category === category)
            .slice(0, 1);
          featured.push(...categoryProducts);
        });

        resolve(featured);
      }, 500);
    });
  }

  // Get product by ID
  async getProductById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = this.products.find((p) => p.id === id);
        if (product) {
          resolve(product);
        } else {
          reject(new Error("Product not found"));
        }
      }, 300);
    });
  }

  // Get products by category
  async getProductsByCategory(category) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredProducts = this.products.filter(
          (p) => p.category === category
        );
        resolve(filteredProducts);
      }, 500);
    });
  }

  // Search products
  async searchProducts(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const searchResults = this.products.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve(searchResults);
      }, 500);
    });
  }
}

// Create and export a single instance of ApiService
const apiService = new ApiService();
