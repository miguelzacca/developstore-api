import config from "../config.js";
import { IObjKey, IController } from "../types/global.js";
import utils from "../utils.js";

class UserControllers {
  public getUser: IController = async (req, res) => {
    const { token } = req.cookies;

    try {
      const id = utils.jwtVerify(token, "id");

      const user = await utils.findUserByField({ id }, true);

      if (!user) {
        return res.status(404).json({ msg: config.userMsg.notFound });
      }

      res.status(200).json(user);
    } catch (err) {
      utils.handleError(res, err);
    }
  };

  public patchUser: IController = async (req, res) => {
    const { token } = req.cookies;

    try {
      const id = utils.jwtVerify(token, "id");

      const sanitizedInput = utils.sanitizeInput(req.body);
      const input: IObjKey = utils.validateInput(sanitizedInput, "patch");

      let user = await utils.findUserByField({ id });

      if (!user) {
        return res.status(404).json({ msg: config.userMsg.notFound });
      }

      user = await utils.updateUserField(user, input);

      user.save();

      res.status(200).json({ msg: config.userMsg.updated });
    } catch (err) {
      utils.handleError(res, err);
    }
  };

  public deleteUser: IController = async (req, res) => {
    const { token } = req.cookies;

    try {
      const id = utils.jwtVerify(token, "id");

      const user = await utils.findUserByField({ id });

      if (!user) {
        return res.status(404).json({ msg: config.userMsg.notFound });
      }

      await user.destroy();

      res.clearCookie("token");

      res.status(200).json({ msg: config.userMsg.deleted });
    } catch (err) {
      utils.handleError(res, err);
    }
  };

  public changePasswd: IController = async (req, res) => {
    const { token } = req.cookies;

    try {
      const email = utils.jwtVerify(token, "email");
      const { passwd } = utils.validateInput(req.body, "changePasswd");

      let user = await utils.findUserByField({ email });

      if (!user) {
        return res.status(404).json({ msg: config.userMsg.notFound });
      }

      user = await utils.updateUserField(user, { passwd });

      user.save();

      res.status(200).json({ msg: config.userMsg.updated });
    } catch (err) {
      utils.handleError(res, err);
    }
  };
}

export default new UserControllers();
