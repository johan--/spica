package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:defs.bzl", "ts_library")

ts_library(
    name = "bucket",
    srcs = glob(["**/*.ts"]),
    data = glob(["**/*.json"]),
    module_name = "@spica-server/bucket",
    deps = [
        "//packages/core",
        "//packages/core/schema",
        "//packages/database",
        "//stacks/api/passport",
        "//stacks/api/preference",
        "@npm//@nestjs/common",
        "@npm//@nestjs/core",
        "@npm//@types/archiver",
        "@npm//@types/deep-diff",
        "@npm//@types/diff-match-patch",
        "@npm//@types/json-schema",
        "@npm//@types/mongodb",
        "@npm//@types/node",
        "@npm//ajv",
        "@npm//archiver",
        "@npm//deep-diff",
        "@npm//diff-match-patch",
        "@npm//locale",
    ],
)

filegroup(
    name = "sources",
    srcs = glob(["**/*.ts"]),
)
