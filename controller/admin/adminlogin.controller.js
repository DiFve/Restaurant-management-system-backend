const bcrypt = require("bcryptjs");
const Users = require("../../model/user");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

module.exports = {
  register: async (req, res) => {
    const { email, password, role, foodType } = req.body;
    try {
      if (!(email && password)) {
        return res.status(400).send("Required email and password.");
      }
      const existUser = await Users.findOne({ email });

      if (existUser) {
        return res.status(409).send("This email was taken.");
      }

      hashPW = await bcrypt.hash(password, 10);
      const user = await Users.create({
        email: email,
        password: hashPW,
        role: role,
        foodType: foodType,
      });

      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );
      //user.token = token;
      const userToken = {
        token: token,
      };
      return res.status(201).json(userToken);
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        return res
          .status(400)
          .json({ message: "Required email and password." });
      }

      const user = await Users.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(409).json({ message: "Email or Password incorrect" });
      }

      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "10s",
          }
        );
        const userToken = {
          token: token,
        };
        return res.status(200).json(userToken);
      } else {
        res.status(409).json({ message: "Email or Password incorrect" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  home: async (req, res) => {
    return res.status(200).send(req.user);
  },
};
