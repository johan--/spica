workspace(
    name = "spica",
    managed_directories = {
        "@npm": ["node_modules"],
    },
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

# Setup nodejs workspace
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "e04a82a72146bfbca2d0575947daa60fda1878c8d3a3afe868a8ec39a6b968bb",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/0.31.1/rules_nodejs-0.31.1.tar.gz"],
)

load("@build_bazel_rules_nodejs//:defs.bzl", "check_bazel_version", "node_repositories", "yarn_install")

check_bazel_version("0.27.0")

node_repositories()

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    symlink_node_modules = False,
    yarn_lock = "//:yarn.lock",
)

# Install all Bazel dependencies needed for npm packages
load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")

install_bazel_dependencies()

# Setup typescript workspace
load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")

ts_setup_workspace()

# Setup docker workspace
http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "aed1c249d4ec8f703edddf35cbe9dfaca0b5f5ea6e4cd9e83e99f3b0d1136c3d",
    strip_prefix = "rules_docker-0.7.0",
    urls = ["https://github.com/bazelbuild/rules_docker/archive/v0.7.0.tar.gz"],
)

# Load container repositories
load(
    "@io_bazel_rules_docker//repositories:repositories.bzl",
    container_repositories = "repositories",
)

container_repositories()

# Download base images, etc
load("@io_bazel_rules_docker//container:container.bzl", "container_pull")

container_pull(
    name = "nginx_image",
    digest = "sha256:881169baf03885268b54eb07c673bc27f394b263cb728dfd86ff2b65b3450932",
    registry = "index.docker.io",
    repository = "library/nginx",
    tag = "alpine",
)

load(
    "@io_bazel_rules_docker//nodejs:image.bzl",
    nodejs_image_repos = "repositories",
)

nodejs_image_repos()

# Setup kubernetes workspace
git_repository(
    name = "io_bazel_rules_k8s",
    commit = "cddc0353968df2500f1ab8969a53283e52425a6e",
    remote = "https://github.com/bazelbuild/rules_k8s.git",
    shallow_since = "1560978409 -0700",
)

load("@io_bazel_rules_k8s//k8s:k8s.bzl", "k8s_defaults", "k8s_repositories")

k8s_repositories()

# Create a rule named as k8s_deploy
k8s_defaults(
    name = "k8s_deploy",
    cluster = "_".join([
        "gke",
        "spica-239113",
        "us-central1-a",
        "master",
    ]),
    kind = "deployment",
)
