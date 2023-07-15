import db from "../../models";
import Bcryptjs from "../../utils/auth/bcryptjs";
import { generateTokens, verifyRefreshToken } from "../../utils/auth/token";
import { Label } from "../../utils/labels/label";

const resetToken = async (email) => {
  await db.Doctor.update(
    {
      refreshToken: null,
      accessToken: null,
    },
    { where: { email: email } }
  );
};

const createNewAccount = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let accountExisted = await db.Doctor.findOne({
        where: { email: data.email },
      });
      let response = {};
      if (!accountExisted) {
        let hashedPassword = await Bcryptjs.hashPassword(data.password);
        await db.Doctor.create({
          email: data.email,
          password: hashedPassword,
          fullName: data.fullName,
          gender: data.gender,
          phoneNumber: data.phoneNumber,
          image: data.image,
          provinceKey: data.provinceKey,
          positionKey: data.positionKey,
          price: data.price,
          clinicId: data.clinicId,
        });
        response = { message: Label.CREATE_ACCOUNT_SUCCESS, success: true };
      } else {
        response = { message: Label.EXISTED_EMAIL, success: false };
      }
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
};

const login = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let account = await db.Doctor.findOne({
        where: { email: data.email },
        raw: true,
      });
      let result = {};
      if (account) {
        let comparePassword = await Bcryptjs.comparePassword(data.password, account.password);
        if (comparePassword) {
          let token = generateTokens(account);
          await db.Doctor.update(
            {
              accessToken: token.accessToken,
              refreshToken: token.refreshToken,
            },
            { where: { email: data.email } }
          );
          result = {
            message: Label.LOGIN_SUCCESS,
            success: true,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
          };
        } else {
          result = {
            message: Label.WRONG_PASSWORD_OR_EMAIL,
            success: false,
          };
        }
      } else {
        result = {
          message: Label.WRONG_PASSWORD_OR_EMAIL,
          success: false,
        };
      }
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

const logout = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const account = await db.Doctor.findOne({
        where: { email: data.email },
      });
      await resetToken(account.email);
      resolve({
        success: true,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateRefreshToken = async (email, refreshToken) => {
  await db.Doctor.update(
    {
      refreshToken: refreshToken,
    },
    { where: { email: email } }
  );
};

const getNewAccessToken = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const refreshToken = req.body.refreshToken;
      const account = await db.Doctor.findOne({
        where: { refreshToken: refreshToken },
        raw: true,
      });
      if (!account) {
        resolve(res.sendStatus(403));
      }
      if (verifyRefreshToken(refreshToken)) {
        const tokens = generateTokens(account);
        updateRefreshToken(account.email, refreshToken);
        resolve(res.status(200).json(tokens));
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewAccount: createNewAccount,
  login: login,
  logout: logout,
  getNewAccessToken: getNewAccessToken,
};
