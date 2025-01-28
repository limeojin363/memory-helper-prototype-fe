/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as StatusBarImport } from './routes/_status-bar'
import { Route as IndexImport } from './routes/index'
import { Route as WordsNewImport } from './routes/words_.new'
import { Route as WordsWordIdImport } from './routes/words_.$wordId'
import { Route as ProblemsProblemIdImport } from './routes/problems_.$problemId'
import { Route as StatusBarWordsImport } from './routes/_status-bar.words'
import { Route as StatusBarSettingsImport } from './routes/_status-bar.settings'
import { Route as StatusBarProblemsImport } from './routes/_status-bar.problems'

// Create/Update Routes

const StatusBarRoute = StatusBarImport.update({
  id: '/_status-bar',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const WordsNewRoute = WordsNewImport.update({
  id: '/words_/new',
  path: '/words/new',
  getParentRoute: () => rootRoute,
} as any)

const WordsWordIdRoute = WordsWordIdImport.update({
  id: '/words_/$wordId',
  path: '/words/$wordId',
  getParentRoute: () => rootRoute,
} as any)

const ProblemsProblemIdRoute = ProblemsProblemIdImport.update({
  id: '/problems_/$problemId',
  path: '/problems/$problemId',
  getParentRoute: () => rootRoute,
} as any)

const StatusBarWordsRoute = StatusBarWordsImport.update({
  id: '/words',
  path: '/words',
  getParentRoute: () => StatusBarRoute,
} as any)

const StatusBarSettingsRoute = StatusBarSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => StatusBarRoute,
} as any)

const StatusBarProblemsRoute = StatusBarProblemsImport.update({
  id: '/problems',
  path: '/problems',
  getParentRoute: () => StatusBarRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_status-bar': {
      id: '/_status-bar'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof StatusBarImport
      parentRoute: typeof rootRoute
    }
    '/_status-bar/problems': {
      id: '/_status-bar/problems'
      path: '/problems'
      fullPath: '/problems'
      preLoaderRoute: typeof StatusBarProblemsImport
      parentRoute: typeof StatusBarImport
    }
    '/_status-bar/settings': {
      id: '/_status-bar/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof StatusBarSettingsImport
      parentRoute: typeof StatusBarImport
    }
    '/_status-bar/words': {
      id: '/_status-bar/words'
      path: '/words'
      fullPath: '/words'
      preLoaderRoute: typeof StatusBarWordsImport
      parentRoute: typeof StatusBarImport
    }
    '/problems_/$problemId': {
      id: '/problems_/$problemId'
      path: '/problems/$problemId'
      fullPath: '/problems/$problemId'
      preLoaderRoute: typeof ProblemsProblemIdImport
      parentRoute: typeof rootRoute
    }
    '/words_/$wordId': {
      id: '/words_/$wordId'
      path: '/words/$wordId'
      fullPath: '/words/$wordId'
      preLoaderRoute: typeof WordsWordIdImport
      parentRoute: typeof rootRoute
    }
    '/words_/new': {
      id: '/words_/new'
      path: '/words/new'
      fullPath: '/words/new'
      preLoaderRoute: typeof WordsNewImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface StatusBarRouteChildren {
  StatusBarProblemsRoute: typeof StatusBarProblemsRoute
  StatusBarSettingsRoute: typeof StatusBarSettingsRoute
  StatusBarWordsRoute: typeof StatusBarWordsRoute
}

const StatusBarRouteChildren: StatusBarRouteChildren = {
  StatusBarProblemsRoute: StatusBarProblemsRoute,
  StatusBarSettingsRoute: StatusBarSettingsRoute,
  StatusBarWordsRoute: StatusBarWordsRoute,
}

const StatusBarRouteWithChildren = StatusBarRoute._addFileChildren(
  StatusBarRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof StatusBarRouteWithChildren
  '/problems': typeof StatusBarProblemsRoute
  '/settings': typeof StatusBarSettingsRoute
  '/words': typeof StatusBarWordsRoute
  '/problems/$problemId': typeof ProblemsProblemIdRoute
  '/words/$wordId': typeof WordsWordIdRoute
  '/words/new': typeof WordsNewRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof StatusBarRouteWithChildren
  '/problems': typeof StatusBarProblemsRoute
  '/settings': typeof StatusBarSettingsRoute
  '/words': typeof StatusBarWordsRoute
  '/problems/$problemId': typeof ProblemsProblemIdRoute
  '/words/$wordId': typeof WordsWordIdRoute
  '/words/new': typeof WordsNewRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_status-bar': typeof StatusBarRouteWithChildren
  '/_status-bar/problems': typeof StatusBarProblemsRoute
  '/_status-bar/settings': typeof StatusBarSettingsRoute
  '/_status-bar/words': typeof StatusBarWordsRoute
  '/problems_/$problemId': typeof ProblemsProblemIdRoute
  '/words_/$wordId': typeof WordsWordIdRoute
  '/words_/new': typeof WordsNewRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/problems'
    | '/settings'
    | '/words'
    | '/problems/$problemId'
    | '/words/$wordId'
    | '/words/new'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/problems'
    | '/settings'
    | '/words'
    | '/problems/$problemId'
    | '/words/$wordId'
    | '/words/new'
  id:
    | '__root__'
    | '/'
    | '/_status-bar'
    | '/_status-bar/problems'
    | '/_status-bar/settings'
    | '/_status-bar/words'
    | '/problems_/$problemId'
    | '/words_/$wordId'
    | '/words_/new'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  StatusBarRoute: typeof StatusBarRouteWithChildren
  ProblemsProblemIdRoute: typeof ProblemsProblemIdRoute
  WordsWordIdRoute: typeof WordsWordIdRoute
  WordsNewRoute: typeof WordsNewRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  StatusBarRoute: StatusBarRouteWithChildren,
  ProblemsProblemIdRoute: ProblemsProblemIdRoute,
  WordsWordIdRoute: WordsWordIdRoute,
  WordsNewRoute: WordsNewRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_status-bar",
        "/problems_/$problemId",
        "/words_/$wordId",
        "/words_/new"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_status-bar": {
      "filePath": "_status-bar.tsx",
      "children": [
        "/_status-bar/problems",
        "/_status-bar/settings",
        "/_status-bar/words"
      ]
    },
    "/_status-bar/problems": {
      "filePath": "_status-bar.problems.tsx",
      "parent": "/_status-bar"
    },
    "/_status-bar/settings": {
      "filePath": "_status-bar.settings.tsx",
      "parent": "/_status-bar"
    },
    "/_status-bar/words": {
      "filePath": "_status-bar.words.tsx",
      "parent": "/_status-bar"
    },
    "/problems_/$problemId": {
      "filePath": "problems_.$problemId.tsx"
    },
    "/words_/$wordId": {
      "filePath": "words_.$wordId.tsx"
    },
    "/words_/new": {
      "filePath": "words_.new.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
