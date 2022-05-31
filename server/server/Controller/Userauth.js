const bcrypt = require("bcryptjs");
const patientModel = require("./../Model/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./../Config/Keys");
const { toTitleCase, validateEmail } = require("./../config/Function");

class Auth {
  async allUser(req, res) {
    try {
      let allUser = await patientModel.find({});
      res.json({ users: allUser });
    } catch {
      res.status(404);
    }
  }

  /* User Registration/Signup controller  */
  async postSignup(req, res) {
    let {
      name,
      email,
      password,
      cPassword,
      phoneNumber,
      gender,
      dateofbirth,
      pincode,
      age,
    } = req.body;
    let error = {};
    let file = req.file.filename;
    if (!name || !email || !password || !cPassword || !phoneNumber) {
      return res.status(500).json({ error: "Filed must not be empty" });
    }
    if (name.length < 3 || name.length > 25) {
      error = { error: "Name must be 3-25 charecter" };
      return res.status(500).json({ error });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          return res
            .status(500)
            .json({ error: "Password must be 8 charecter" });
        } else {
          // If Email & Number exists in Database then:
          try {
            password = bcrypt.hashSync(password, 10);
            const data = await patientModel.findOne({ email: email });
            const phone = await patientModel.findOne({
              phoneNumber: phoneNumber,
            });
            if (phone) {
              return res
                .status(500)
                .json({ error: "Phone Number already exists" });
            }
            if (data) {
              return res.status(500).json({ error: "Email already exists" });
            } else {
              let newUser = new patientModel({
                name,
                email,
                password,
                phoneNumber,
                pincode,
                gender,
                dateofbirth,
                profileimage: file,
                age,
                role: 1,
              });

              newUser
                .save()
                .then((data) => {
                  return res.json({
                    success: "Account create successfully. Please login",
                    user: {
                      id: data._id,
                      name: data.name,
                      email: data.email,
                    },
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        return res.status(500).json({ error: "Email is not valid" });
      }
    }
  }

  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await patientModel.findOneAndUpdate(
        { email: email },
        { status: "online" }
      );
      if (!data) {
        return res.status(500).json({
          error: "Invalid Email",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign(
            {
              id: data._id,
              role: data.userRole,
              name: data.name,
              email: data.email,
              phonenumber: data.phoneNumber,
              age: data.age,
              img: data.profileimage,
              dateofbirth: data.dateofbirth,
            },
            JWT_SECRET
          );

          const encode = jwt.verify(token, JWT_SECRET);

          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.status(500).json({
            error: "Invalid Password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getsignout(req, res) {
    let user = req.params.id;
    try {
      const data = await patientModel.findOneAndUpdate(
        { _id: user },
        { status: "offline" }
      );
      if (!data) {
        return res.status(403).json({
          error: "Cannot able to find the user",
        });
      } else {
        return res.json({ success: "Sign Out Successful" });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const authController = new Auth();
module.exports = authController;
