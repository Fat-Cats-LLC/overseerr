# Contributing to Oversneedrr

All help is welcome and greatly appreciated! (we need it) If you would like to contribute to the project, the following instructions should get you started...

## Development

### Tools Required

- HTML/Typescript/Javascript editor
  - VS Code sucks through one of the devs use it
  - the main dev (me) use JetBrains' WebStorm
- [NodeJS](https://nodejs.org/en/download/) (Node 14.x or higher)
- [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/downloads)

### Getting Started

When you're doing **LITERALLY ANYTHING** make sure it's on the **Fat-Cats-LLC/overseerr** repo and not **sct/overseerr**. @internationalcrisis and I will berate you and call you mean things and the upstreams maintainers will probably call you dumb or some shit idfk.  

1. [Fork](https://help.github.com/articles/fork-a-repo/) the repository to your own GitHub account and [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device:

   ```bash
   git clone https://github.com/YOUR_USERNAME/overseerr.git
   cd overseerr/
   ```

2. Add the remote `upstream`:

   ```bash
   git remote add upstream https://github.com/Fat-Cats-LLC/overseerr.git
   ```

3. Create a new branch:

   ```bash
   git checkout -b BRANCH_NAME develop
   ```

   - It is recommended to give your branch a meaningful name, relevant to the feature or fix you are working on.
     - Good examples:
       - `docs-docker`
       - `feature-new-system`
       - `fix-title-cards`
     - Bad examples:
       - `bug`
       - `docs`
       - `feature`
       - `fix`
       - `patch`

4. Run the development environment:

   ```bash
   yarn
   yarn dev
   ```

5. Create your patch and test your changes.

   - Be sure to follow both the [code](#contributing-code) and [UI text](#ui-text-style) guidelines.
   - Should you need to update your fork, you can do so by rebasing from `upstream`:
     ```bash
     git fetch upstream
     git rebase upstream/develop
     git push origin BRANCH_NAME -f
     ```

### Contributing Code

- If you are taking on an existing bug or feature ticket, please comment on the [issue](https://github.com/Fat-Cats-LLC/overseerr/issues) to avoid multiple people working on the same thing.
- All commits **must** follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
  - You suck if you don't follow it but we'll just bitch at you and call you names and then merge your shit anyways
- Please make meaningful commits, or squash them prior to opening a pull request.
  - Do not squash commits once people have begun reviewing your changes.
- Always rebase your commit to the latest `develop` branch. Do **not** merge `develop` into your branch.
- It is your responsibility to keep your branch up-to-date. Your work will **not** be merged unless it is rebased off the latest `develop` branch.
- You can create a "draft" pull request early to get feedback on your work.
- Your code **must** be formatted correctly, or the tests will fail.
  - We use Prettier to format our code base. It should automatically run with a Git hook, but it is recommended to have the Prettier extension installed in your editor and format on save.
- If you have questions or need help, you can reach out via [Discussions](https://github.com/Fat-Cats-LLC/overseerr/discussions).
- Only open pull requests to `develop`, never `master`! Any pull requests opened to `master` will be closed.

### UI Text Style

When adding new UI text, please try to adhere to the following guidelines:

1. Speak English.
2. Use the Oxford comma where appropriate.
3. Use the appropriate Unicode characters for ellipses, arrows, and other special characters/symbols.
   - this may change as some unicode is gay
4. Capitalize proper nouns, such as Plex, Radarr, Sonarr, Telegram, Slack, Pushover, etc. Be sure to also use the official capitalization for any abbreviations; e.g., IMDb has a lowercase 'b', whereas TMDB and TheTVDB have a capital 'B'.
5. Title case headings, button text, and form labels. Note that verbs such as "is" should be capitalized, whereas prepositions like "from" should be lowercase (unless as the first or last word of the string, in which case they are also capitalized).
6. Capitalize the first word in validation error messages, dropdowns, and form "tips." These strings should not end in punctuation.
7. Ensure that toast notification strings are complete sentences ending in punctuation.
8. If an additional description or "tip" is required for a form field, it should be styled using the global CSS class `label-tip`.
9. In full sentences, abbreviations like "info" or "auto" should not be used in place of full words, unless referencing the name/label of a specific setting or option which has an abbreviation in its name.
10. See 1. Atleast try to make your shit make sense.
11. Keep the sneed in Oversneedrr.

## Translation

Translations are merged from upstream Overseerr, with the strings replaced as needed. Contribute fuck ups to sct's shiz but if there is a fuck up that is not in sct's proj but mine then open a PR or issue

## Attribution

This contribution guide was inspired by the [Next.js](https://github.com/vercel/next.js) and [Radarr](https://github.com/Radarr/Radarr) contribution guides.
