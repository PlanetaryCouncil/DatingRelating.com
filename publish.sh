#!/bin/sh
# Rebuild personal pages, commit everything, push live.
# Usage: ./publish.sh "what changed"
set -e
cd "$(dirname "$0")"
python3 build.py
git add -A
git commit -m "${1:-Update site}"
git push origin main
