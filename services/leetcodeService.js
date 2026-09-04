const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

const GET_LEETCODE_PROFILE_QUERY = `
  query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      username

      userCalendar(year: $year) {
        activeYears
        streak
        totalActiveDays
        submissionCalendar
      }

      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
`;

const getLeetcodeProfile = async (username, year) => {
  const response = await fetch(LEETCODE_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/u/${username}/`,
    },
    body: JSON.stringify({
      query: GET_LEETCODE_PROFILE_QUERY,
      variables: {
        username,
        year,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`LeetCode request failed with status ${response.status}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0]?.message || "LeetCode GraphQL error");
  }

  const user = result.data?.matchedUser;

  if (!user) {
    throw new Error("LeetCode user not found");
  }

  const calendar = user.userCalendar;

  const submissionCalendar = JSON.parse(calendar?.submissionCalendar || "{}");

  const totalSubmissions = Object.values(submissionCalendar).reduce(
    (total, count) => {
      return total + Number(count);
    },
    0,
  );

  const submissions = Object.entries(submissionCalendar).map(
    ([timestamp, count]) => ({
      timestamp: Number(timestamp),
      date: new Date(Number(timestamp) * 1000).toISOString().slice(0, 10),
      count: Number(count),
    }),
  );

  const solved = {};

  for (const item of user.submitStatsGlobal?.acSubmissionNum || []) {
    solved[item.difficulty.toLowerCase()] = item.count;
  }

  return {
    username: user.username,

    stats: {
      totalSolved: solved.all || 0,
      totalSubmissions,
      easySolved: solved.easy || 0,
      mediumSolved: solved.medium || 0,
      hardSolved: solved.hard || 0,
      streak: calendar?.streak || 0,
      totalActiveDays: calendar?.totalActiveDays || 0,
    },

    activeYears: calendar?.activeYears || [],
    submissions,
  };
};

module.exports = {
  getLeetcodeProfile,
};
