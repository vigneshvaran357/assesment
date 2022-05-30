const bcrypt = require("bcryptjs");
const doctorModel = require("./../Model/Doctor");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./../Config/Keys");
const { toTitleCase, validateEmail } = require("./../config/Function");
class Auth {
  async alldoctor(req, res) {
    try {
      let allUser = await doctorModel.find({});
      res.json({ doctors: allUser });
    } catch {
      res.status(404);
    }
  }

  /* Doctor Registration/Signup controller  */
  async postSignup(req, res) {
    let {
      name,
      email,
      password,
      cPassword,
      phoneNumber,
      profession,
      qualification,
      pincode,
      gender,
      experience,
      clinicdetails,
      fees,
      language,
    } = req.body;
    let file = req.files[0].filename;

    console.log(password);

    if (!name || !email || !password || !cPassword || !phoneNumber) {
      return res.status(500).json({ error: "Filed must not be empty" });
    }
    if (name.length < 3 || name.length > 25) {
      return res.status(500).json({ error: "Name must be 3-25 charecter" });
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
            const data = await doctorModel.findOne({ email: email });
            const phone = await doctorModel.findOne({
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
              let newUser = new doctorModel({
                name,
                email,
                password,
                cPassword,
                phoneNumber,
                profession,
                fees,
                pincode,
                profileimage: file,
                gender,
                qualification,
                experience,
                clinicdetails,
                language,
                userRole: 1,
              });
              newUser
                .save()
                .then((data) => {
                  return res.json({
                    success: "Account create successfully. Please login",
                    doctor: {
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

  /* Doctor Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        error: "Fields must not be empty",
      });
    }

    try {
      const data = await doctorModel.findOneAndUpdate(
        { email: email },
        { status: "online" }
      );

      if (!data) {
        return res.status(500).json({
          error: "Not A Registered  Email",
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
              phoneNumber: data.phoneNumber,

              phoneNumber: data.phoneNumber,
              profession: data.profession,
              fees: data.fees,
              pincode: data.pincode,
              profileimage: data.profileimage,
              gender: data.gender,
              qualification: data.qualification,
              experience: data.experience,
              clinicdetails: data.clinicdetails,
              language: data.language,
            },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);

          return res.json({
            token: token,
            doctor: encode,
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
      const data = await doctorModel.findOneAndUpdate(
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
