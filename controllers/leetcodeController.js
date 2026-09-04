const { getLeetcodeProfile } = require("../services/leetcodeService");

const getLeetcodeStats = async (req, res) => {
  try {
    const username = process.env.LEETCODE_USERNAME;

    const year = Number(req.query.year) || new Date().getFullYear();

    if (!username) {
      return res.status(500).json({
        error: "LEETCODE_USERNAME is not configured",
      });
    }

    const data = await getLeetcodeProfile(username, year);

    return res.json(data);
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);

    return res.status(500).json({
      error: "Unable to fetch LeetCode data",
    });
  }
};

module.exports = {
  getLeetcodeStats,
};
