import getRandomFate from "../repository/getRandomFate.js";

export const getFate = async (req, res) => {
  try {
    const fate = await getRandomFate();

    return res.status(200).json({
      status: "success",
      data: {
        fate,
      },
    });
  } catch (error) {
    console.error("Random fate error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};
