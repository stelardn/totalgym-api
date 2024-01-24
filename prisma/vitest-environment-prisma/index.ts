import 'dotenv/config'
import { randomUUID } from 'crypto'
import { type Environment } from 'vitest'
import { execSync } from 'node:child_process'
import { prisma } from '@/lib/prisma'

function generateDatabaseURL (schema: string) {
  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup () {
    const schema = randomUUID()

    process.env.DATABASE_URL = generateDatabaseURL(schema)

    execSync('yarn prisma migrate deploy')

    return {
      async teardown () {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)

        await prisma.$disconnect()
      }
    }
  }
}
