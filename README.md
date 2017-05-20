# Framewerk

**A framework for managing scripting on top of server-rendered pages. (a.k.a. yet another JavaScript framework 😉)**

## What is Framewerk?

Many existing JavaScript frameworks are targeted toward JS-rendered single-page apps. However, there are many, _many_ developers working on apps which are primarily server-rendered, yet have large amounts of scripting to enhance the user experience within those apps. Conventional wisdom is to isolate JavaScript to its own files to maintain separation of concerns — yet how do you then effectively integrate that scripting into your views? Or do you just give up and shove it into _ad hoc_ `<script>` tags within your view files?

Framewerk is an attempt to create a consistent interface for cleanly attaching complex scripting to view files.  It was initially inspired by [AngularJS](https://angularjs.org/). (Yes, the old, bad version.) It borrows a couple of ideas from AngularJS but has happily diverged in a different direction. It does not directly rely on [jQuery](https://jquery.com/), but can certainly coexist with it.

## But what does it DO?

The core functionality of Framewerk operates in two sections.

### Controllers

A `Controller` contains selector string references, logic-heavy methods and view-based DOM operations. The `Controller` is then activated by attaching a `data-controller` attribute to the container element upon which the `Controller` should operate.

### Plugins

The `Plugin` is a way to wrap a third-party plugin within a consistent, repeatable structure, allowing for safe, dynamic activation of plugins on an as-needed basis. This is designed to sidestep the following all-too-typical scenarios:

- manually calling a plugin initialization within a view-level `<script>` tag
- activating the plugin on every page regardless of whether or not it's actually needed

## Usage

More information to come.