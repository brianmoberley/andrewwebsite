import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JwtPayload } from "@construction/types";

export const generateToken = (
  userId: string,
  email: string,
  role: string,
  expiresIn = "7d"
): string => {
  return jwt.sign(
    {
      userId,
      email,
      role,
    },
    process.env.JWT_SECRET || "",
    {
      expiresIn,
    }
  );
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
  } catch {
    return null;
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch {
    return null;
  }
};
