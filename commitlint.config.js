// Commitlint Configuration
// Ensures commit messages follow the Conventional Commits specification
// Learn more: https://www.conventionalcommits.org/

/** @type {import('@commitlint/types').UserConfig} */
export default {
  // Extend the conventional commits configuration
  extends: ['@commitlint/config-conventional'],

  // Custom rules (override defaults if needed)
  rules: {
    // Type must be one of these (enforced)
    'type-enum': [
      2, // Level: error
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (formatting, missing semicolons, etc.)
        'refactor', // Code refactoring (neither fixes a bug nor adds a feature)
        'perf', // Performance improvements
        'test', // Adding or updating tests
        'build', // Changes to build system or dependencies
        'ci', // CI/CD configuration changes
        'chore', // Other changes that don't modify src or test files
        'revert', // Reverts a previous commit
      ],
    ],

    // Subject (commit message) must not be empty
    'subject-empty': [2, 'never'],

    // Subject must not end with a period
    'subject-full-stop': [2, 'never', '.'],

    // Subject must be in lowercase (disabled for flexibility)
    'subject-case': [0],

    // Body must have a blank line before it
    'body-leading-blank': [2, 'always'],

    // Footer must have a blank line before it
    'footer-leading-blank': [2, 'always'],

    // Max header length (type + scope + subject)
    'header-max-length': [2, 'always', 100],

    // Scope is optional
    'scope-empty': [0],

    // Scope must be lowercase
    'scope-case': [2, 'always', 'lower-case'],
  },
}
