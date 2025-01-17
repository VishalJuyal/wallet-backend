// import express from "express";
import bcrypt from "bcrypt";
import userTable from "../models/userTable";
import { Request, Response } from "express";

const getUsers = async (req: Request, res: Response) => {
  try {
    const userData = await userTable.find();
    console.log(userData);
    return res.status(200).json({
      status: 200,
      data: userData,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const loginUser = async (body: any) => {
  try {
    const { email, password } = body;

    const user = await userTable.findOne({ email });
    if (!user) {
      throw { statusCode: 404, message: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw { statusCode: 401, message: "Invalid password" };
    }

    console.log("Login successful:", user);
    return { message: "Login successful", userId: user._id };
  } catch (error) {
    throw error;
  }
};

const registerUser = async (body: any) => {
  try {
    const { fullName, email, password, roleId } = body;
    const existingUser = await userTable.findOne({ email });
    if (existingUser) {
      throw { statusCode: 409, message: "User already exists" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userTable.create({
      fullName,
      email,
      password: hashedPassword,
      roleId,
    });
    return { message: "User created successfully", userId: newUser._id };
  } catch (error) {
    throw error;
  }
};

const updateUser = async (body: any) => {
  try {
    const updateResponse = await userTable.findOneAndUpdate(
      { _id: body._id },
      { roleId: body.roleId }
    );
    if (!updateResponse) {
      throw new Error("Error while updating user");
    }
    return updateResponse;
  } catch (error) {
    throw error;
  }
};

export default { getUsers, loginUser, registerUser, updateUser };
