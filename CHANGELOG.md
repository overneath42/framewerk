# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.3] - 2017-08-08
### Added
- Added a check to the main `fw.initialize` method to only initialize a controller if the target `data-controller` container is found.

### Changed
- Bug fix to `dataSelectors` method
- Adjust `Controller.getTargets` to return a single element if only one instance of a target selector is found. Multiple instances are still returned as an array.

## [0.1.2] - 2017-08-08
### Changed
- Bug fix to `Controller.getTargets` method

## [0.1.1] - 2017-08-08
### Changed
- Minor tweak to handling of `targets` within `Controller`.

## [0.1.0] - 2017-08-08
### Added
- Core prototypes for `Controller` and `Plugin`
- Initialization and event handling for `Controller`
- Very rough beginnings of `ControllerApi` and `PluginApi`
