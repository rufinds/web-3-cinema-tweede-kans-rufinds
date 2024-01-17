const prisma = require("../config/prisma_db");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!user) {
        return res.status(404).send("Gebruiker niet gevonden.");
      }

      res.json(user);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  createUser: async (req, res) => {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return res.status(400).json(validationErrors.array());
      }

      const newUser = req.body;
      const hashedPassword = await bcrypt.hash(newUser.password, 12);

      const user = await prisma.user.create({
        data: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          password: hashedPassword,
        },
      });

      res.status(201).json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const updatedUserData = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: updatedUserData,
      });

      res.json(updatedUser);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      await prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.status(204).send();
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  login: async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const credentials = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: credentials.email,
      },
    });

    if (!user) {
      return res.status(404).send("Gebruiker niet gevonden.");
    }

    const result = await bcrypt.compare(credentials.password, user.password);

    if (result) {
      const payload = {
        sub: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("web3_token", token, {
        httpOnly: true,
        secure: false,
      });

      res.status(200).json(user);
    } else {
        res.status(401).send("Wachtwoord komt niet overeen.");
      }
    },
  
    verify: async (req, res) => {
      const userMail = req.user;
      res.json(userMail);
    },
  };
  
  module.exports = userController;
  