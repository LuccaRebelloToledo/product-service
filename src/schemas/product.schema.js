const { z } = require('zod');

const createProductSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, { message: "Name cannot be empty" }),
  price: z.number({ required_error: "Price is required" }).positive({ message: "Price must be a positive number" }),
  description: z.string().optional(),
  stock: z.number({ required_error: "Stock is required" }).int().nonnegative().default(0, { message: "Stock must be a non-negative integer" }),
});

const updateProductSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, { message: "Name cannot be empty" }).optional(),
  price: z.number({ required_error: "Price is required" }).positive({ message: "Price must be a positive number" }).optional(),
  description: z.string().optional(),
  stock: z.number({ required_error: "Stock is required" }).int().nonnegative({ message: "Stock must be a non-negative integer" }).optional(),
});

const idSchema = z.object({
  id: z.string({ required_error: "ID is required" }).regex(/^[a-f0-9]{24}$/, { message: "ID must be a 24-character hexadecimal string" }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  idSchema,
};