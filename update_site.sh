#!/bin/bash

echo "🚀 Updating your website..."

# Add all changes
git add .

# Commit with a timestamp
git commit -m "Update site: $(date)"

# Push to GitHub
git push -u origin main

echo "✅ Done! Your changes are live on GitHub."
