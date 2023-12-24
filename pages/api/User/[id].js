import User from "@/models/User";
import dbConnect from "@/util/dbConnect";
import bcrypt from "bcryptjs";
const handler = async (req, res) => {
  await dbConnect();
  const {
    method,
    query: { id },    //query ile id  sini tutuyorum
  } = req;

  if (method === "GET") {
    try {
      const user = await User.findById(id);    //findById(id) ile bul
      res.status(200).json(user);            //bulduğunu geri gönder
    } catch (err) {
      console.log(err);
    }
  }
  if (method === "PUT") {
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.confirmPassword = await bcrypt.hash(
          req.body.confirmPassword,
          10
        );
      }
      const users = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;