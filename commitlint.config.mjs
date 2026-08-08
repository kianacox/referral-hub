/**
 * Conventional Commits — https://www.conventionalcommits.org/en/v1.0.0/
 *
 * Enforced on every commit by the commit-msg hook in .husky/.
 * Types come from @commitlint/config-conventional: build, chore, ci, docs,
 * feat, fix, perf, refactor, revert, style, test.
 */
const config = {
  extends: ["@commitlint/config-conventional"],
};

export default config;
