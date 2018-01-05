# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-alpha.8] - 2018-1-5
### Changed
- Primary `fw.initialize()` command now properly honors provided container for limiting
  scope of script execution.
- `Controller.getTargets` allows for limited scope via a second argument which accepts
  a DOM element.

## [1.0.0-alpha.7] - 2017-10-26
### Changed
- Add basic initialization code for `Plugin`.
- `Controller.getTargets` always returns an array now.
- Added a currently-unused utility function to automatically generate a list of targets
  for `Controller.getTargets`.

## [1.0.0-alpha.6] - 2017-10-20
### Changed
- Minor reference fix in `Plugin`.

## [1.0.0-alpha.5] - 2017-10-20
### Changed
- Adjust webpack build to export for library usage.

## [1.0.0-alpha.4] - 2017-10-20
### Changed
- The version number. 😜

## [1.0.0-alpha.3] - 2017-08-11
### Changed
- Fixed the issues link in `package.json`.
- Changed the `main` field to point to the compiled JS.
- Changed Webpack prod config so it doesn't compress the output. (This is likely temporary.)
- Removed a debugger statement from a spec file.

## [1.0.0-alpha.2] - 2017-08-11
### Changed
- Properly named module within definition file.

## [1.0.0-alpha.1] - 2017-08-11
### Changed
- Bumped version number to allow NPM publishing.

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
