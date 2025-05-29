const { sendErrorResponse } = require("../helpers/send_error_res");
const User = require("../models/user.model");
const Role = require("../models/roles.model");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwt.service");
const config = require("config");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    if (!user) {
      return sendErrorResponse(
        { message: "Email yoki parol notogri" },
        res,
        400
      );
    }
    const verifiedPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );
    if (!verifiedPassword) {
      return sendErrorResponse(
        { message: "Email yoki parol notogri" },
        res,
        400
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.roles,
    };

    const tokens = jwtService.generateTokens(payload);

    const hashed_token = await bcrypt.hash(tokens.accessToken, 7);
    user.hashedToken = hashed_token;

    await user.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_time"),
      httpOnly: true,
    });
    res
      .status(200)
      .send({ message: "User logged in", accessToken: tokens.accessToken });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const logout = async (req, res) => {
  try {    
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return sendErrorResponse({ message: "Cookieda refreshToken topilmadi" }, res, 400);
      // return res
      //   .status(400)
      //   .send({ message: "Cookieda refreshToken topilmadi" });
    }
    const decodedToken = await jwtService.verifyRefreshToken(refreshToken);

    // const users = await User;
    const user = await User.update(
      { hashedToken: null },
      {
        where: { id: decodedToken.id },
        returning: true,
      }
    );
    if (!user) {
      return res.status(400).send({ message: "Token notogri" });
    }
    res.clearCookie("refreshToken");
    res.send({ user });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const refreshToken = async (req, res) => {};

module.exports = {
  login,
  logout,
};
