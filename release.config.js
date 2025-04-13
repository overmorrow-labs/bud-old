export default {
    branches: ["main"],
    plugins: [
        "@semantic-release/commit-analyzer", // Analyzes commits to determine version bump
        "@semantic-release/release-notes-generator", // Generates release notes
        "@semantic-release/github",
        "@semantic-release/npm",
        [
            "@semantic-release/git",
            {
                assets: ["package.json", "package-lock.json"], // Push updated files to Git
                message:
                    "chore(release): 1.51.0-${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
            },
        ],
    ],
};
