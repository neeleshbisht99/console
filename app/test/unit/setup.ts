/**
 * This file is ran by vitest before any tests are ran. Configuration
 * in this file does _not_ impact end-to-end tests.
 */
// our node fetch polyfill of choice
import '@testing-library/jest-dom'
import 'whatwg-fetch'

// fancy asserts
import { resetDb } from '@oxide/api-mocks'

import { server } from './server'

beforeAll(() => server.listen())
afterEach(() => {
  resetDb()
  server.resetHandlers()
})
afterAll(() => server.close())