#!/bin/bash
set -euo pipefail

function tag() {
  # branch cannot be dirty
  if ! git diff-index --quiet HEAD -- ; then
    echo "tag.sh: branch has uncommitted changes"
    exit 1
  fi

  # switch to main
  if [ "$(git rev-parse --abbrev-ref HEAD)" != 'main' ] ; then
    git switch main
  fi

  # pull changes
  git fetch
  if [ "$(git rev-parse HEAD)" != "$(git rev-parse FETCH_HEAD)" ] ; then
    git merge --ff-only FETCH_HEAD
  fi

  local version=$(jq -rM '.version' package.json)

  # check if the tag exists
  if git tag | grep -q "$version" ; then
    echo "tag.sh: tag '$version' already exists"
    exit 1
  fi

  # check if the tag is valid (ex: 1.2.3)
  if ! echo "$version" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$' ; then
    echo "tag.sh: tag '$version' is invalid"
    exit 1
  fi

  git tag -a "$version" -m "$version"
  git push origin "$version"
} ; tag
