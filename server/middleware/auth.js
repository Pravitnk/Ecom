import jwt from "jsonwebtoken";

// middleware function to decode jwt token to get clerkId
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Not authorised login again" });

    const token_decode = jwt.decode(token);

    req.body.clerkId = token_decode.clerkId;
    next();
  } catch (error) {
    console.error("err", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default authUser;
