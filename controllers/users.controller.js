const fs = require("fs");
let data = require("../public/data.json");

module.exports.getRandomUser = (req, res) => {
  let result = data[Math.floor(Math.random() * data.length)];
  res.send(result);
};

module.exports.getAllUser = (req, res, next) => {
  let { limit } = req.query;
  let result = data.slice(0, limit);
  res.send(result);
};

module.exports.saveUser = (req, res) => {
  let inputedData = req.body;
  let newData = { id: data.length + 1, ...inputedData };
  let schema = ["id", "gender", "name", "contact", "address", "photoUrl"];
  let inputedSchema = Object.keys(newData);
  if (schema.sort().join(",") === inputedSchema.sort().join(",")) {
    console.log("Your Data is Valid");
    let resultmake = [...data, newData];
    fs.writeFile("./modles/users.modle.json", resultmake, (err) => {
      if (err) throw err;
    });
    res.send("User Saved Successfully");
  } else {
    console.log("Your Data is Wrong!");
    res.send("Something is Wrong");
  }
};

module.exports.updateUser = (req, res) => {
  const { name, gender, address, contact, photoURL, _id } = req.body;

  const userID = typeof id === "string" ? id : false;

  const userGender =
    typeof gender === "string" &&
    gender.trim().length > 0 &&
    (gender.toLocaleLowerCase() === "male" ||
      gender.toLocaleLowerCase() === "female" ||
      gender.toLocaleLowerCase() === "other")
      ? gender
      : false;

  const userName =
    typeof name === "string" && name.trim().length > 0 ? name : false;

  const userContact =
    typeof contact === "number" && contact.toString().trim().length === 11
      ? contact
      : false;

  const userAddress =
    typeof address === "string" && address.trim().length > 0 ? address : false;

  const userPhotoURL =
    typeof photoURL === "string" && photoURL.trim().length > 0
      ? photoURL
      : false;

  data.read("users", "users", (err, users) => {
    if (!err && Array.isArray(users) && users.length > 0) {
      const user = users.find((user) => user.id === id);
      if (user) {
        if (
          userID &&
          (userGender || userName || userContact || userAddress || userPhotoURL)
        ) {
          const updatedUser = {
            id: user.id,
            name: userName ? userName : user.name,
            gender: userGender ? userGender : user.gender,
            contact: userContact ? userContact : user.contact,
            address: userAddress ? userAddress : user.address,
            photoURL: userPhotoURL ? userPhotoURL : user.photoURL,
          };
          data.update("users", "users", updatedUser, (err) => {
            if (!err) {
              res.status(200).json({
                success: true,
                message: "User updated successfully",
                updatedUser,
              });
            } else {
              res.status(500).json({
                success: false,
                message: "Internal server error. User not updated",
              });
            }
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Invalid request body",
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: "This user is not found",
        });
      }
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error. No users found",
      });
    }
  });
};

module.exports.bulkUpdateUser = (req, res) => {
  if (
    Array.isArray(req.body) &&
    req.body.length > 0 &&
    req.body.every(
      (user) =>
        (user && typeof user === "object" && user["id"] && user["name"]) ||
        user["gender"] ||
        user["address"] ||
        user["contact"] ||
        user["photoURL"]
    )
  ) {
    data.read("users", "users", (err, users) => {
      if (!err && Array.isArray(users) && users.length > 0) {
        data.bulkUpdate("users", "users", req.body, (err) => {
          if (!err) {
            res.status(200).json({
              success: true,
              message: "Users updated successfully",
            });
          } else {
            res.status(500).json({
              success: false,
              message: "Internal server error. Users not updated",
              err,
            });
          }
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error. No users found",
        });
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid request body",
    });
  }
};

module.exports.DeleteUser = (req, res) => {
  const { id } = req.body;
  const userID = typeof id === "string" ? id : false;
  if (userID) {
    data.read("users", "users", (err, users) => {
      if (!err && Array.isArray(users) && users.length > 0) {
        const user = users.find((user) => user.id === userID);
        if (user) {
          data.delete("users", "users", userID, (err) => {
            if (!err) {
              res.status(200).json({
                success: true,
                message: "User deleted successfully",
              });
            } else {
              res.status(500).json({
                success: false,
                message: "Internal server error. User not deleted",
              });
            }
          });
        } else {
          res.status(404).json({
            success: false,
            message: "This user is not found",
          });
        }
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error. No users found",
        });
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid request body",
    });
  }
};
