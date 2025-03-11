# Maintenance Guide

## Publish

1. Update version in follow files:
   ```
   src/manifest.json
   target/updates.json
   README.md
   ```
1. Commit files
   ```
   git commit -m "bump version" src/manifest.json target/updates.json README.md
   ```
1. Make a new tag
   ```
   git tag -a VERSION
   ```
1. Push a new release
   ```
   git push origin master --follow-tags
   ```
