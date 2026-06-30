module.exports = {
  extends: ["@commitlint/config-conventional"],
  ignores: [(commit) => /^Merge /i.test(commit)],
};
