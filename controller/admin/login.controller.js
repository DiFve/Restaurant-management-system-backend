const bcrypt = require("bcryptjs");
const Users = require("../../model/user");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    const { email, password, role, foodType, table } = req.body;
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
        table: table,
      });

      const token = jwt.sign(
        { user_id: user._id, email, role, foodType, table },
        process.env.TOKEN_KEY,
        {
          expiresIn: "10s",
        }
      );
      await Users.findByIdAndUpdate(user._id, { token: token });
      if (user.table === 0) {
        return res.status(201).json({ token: token });
      } else {
        return token;
      }
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
      //console.log(user);
      if (!user) {
        return res.status(409).json({ message: "Email or Password incorrect" });
      }

      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          {
            user_id: user._id,
            email: user.email,
            role: user.role,
            foodType: user.foodType,
            table: user.table,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "1h",
          }
        );
        await Users.findByIdAndUpdate(user._id, { token: token });
        return res.status(200).json({ token: token });
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
