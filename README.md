# Lowit's Start Page

## Publish

1. Update version in `src/manifest.json` file
1. Update `target/updates.json` file
1. Commit files `git commit -m "bump version" src/manifest.json target/updates.json`
1. Make a new tag `git tag -a VERSION`
1. Push a new release `git push origin master --follow-tags`
