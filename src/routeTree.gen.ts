/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthVinculateclientImport } from './routes/_auth.vinculate_client'
import { Route as AuthCreateuserImport } from './routes/_auth.create_user'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const AuthGenerateLazyImport = createFileRoute('/_auth/generate')()
const AuthDashboardLazyImport = createFileRoute('/_auth/dashboard')()

// Create/Update Routes

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AuthGenerateLazyRoute = AuthGenerateLazyImport.update({
  path: '/generate',
  getParentRoute: () => AuthRoute,
} as any).lazy(() => import('./routes/_auth.generate.lazy').then((d) => d.Route))

const AuthDashboardLazyRoute = AuthDashboardLazyImport.update({
  path: '/dashboard',
  getParentRoute: () => AuthRoute,
} as any).lazy(() => import('./routes/_auth.dashboard.lazy').then((d) => d.Route))

const AuthVinculateclientRoute = AuthVinculateclientImport.update({
  path: '/vinculate_client',
  getParentRoute: () => AuthRoute,
} as any)

const AuthCreateuserRoute = AuthCreateuserImport.update({
  path: '/create_user',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_auth/create_user': {
      preLoaderRoute: typeof AuthCreateuserImport
      parentRoute: typeof AuthImport
    }
    '/_auth/vinculate_client': {
      preLoaderRoute: typeof AuthVinculateclientImport
      parentRoute: typeof AuthImport
    }
    '/_auth/dashboard': {
      preLoaderRoute: typeof AuthDashboardLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/generate': {
      preLoaderRoute: typeof AuthGenerateLazyImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  AuthRoute.addChildren([
    AuthCreateuserRoute,
    AuthVinculateclientRoute,
    AuthDashboardLazyRoute,
    AuthGenerateLazyRoute,
  ]),
  LoginRoute,
])

/* prettier-ignore-end */
