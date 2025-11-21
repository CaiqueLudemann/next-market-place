/**
 * Base database utilities for JSON file storage
 * This module provides thread-safe read/write operations for JSON files
 */

import fs from 'fs/promises'
import path from 'path'

const DB_DIR = path.join(process.cwd(), 'mockdb')

/**
 * Ensure database directory exists
 */
async function ensureDbDir(): Promise<void> {
  try {
    await fs.access(DB_DIR)
  } catch {
    await fs.mkdir(DB_DIR, { recursive: true })
  }
}

/**
 * Read data from a JSON file
 * @param filename - Name of the JSON file (without path)
 * @returns Promise<T[]> - Array of records
 */
export async function readDb<T>(filename: string): Promise<T[]> {
  await ensureDbDir()

  const filePath = path.join(DB_DIR, filename)

  try {
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content) as T[]
  } catch (error) {
    // If file doesn't exist, return empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

/**
 * Write data to a JSON file
 * @param filename - Name of the JSON file (without path)
 * @param data - Array of records to write
 */
export async function writeDb<T>(filename: string, data: T[]): Promise<void> {
  await ensureDbDir()

  const filePath = path.join(DB_DIR, filename)
  const content = JSON.stringify(data, null, 2)

  await fs.writeFile(filePath, content, 'utf-8')
}

/**
 * Update a single record in the database
 * @param filename - Name of the JSON file
 * @param predicate - Function to find the record to update
 * @param updates - Partial record with fields to update
 * @returns Promise<T | null> - Updated record or null if not found
 */
export async function updateRecord<T extends { id: string }>(
  filename: string,
  predicate: (record: T) => boolean,
  updates: Partial<T>
): Promise<T | null> {
  const records = await readDb<T>(filename)
  const index = records.findIndex(predicate)

  if (index === -1) {
    return null
  }

  const updated = { ...records[index]!, ...updates, updatedAt: new Date().toISOString() } as T
  records[index] = updated

  await writeDb(filename, records)
  return updated
}

/**
 * Delete a record from the database
 * @param filename - Name of the JSON file
 * @param predicate - Function to find the record to delete
 * @returns Promise<boolean> - True if record was deleted
 */
export async function deleteRecord<T>(
  filename: string,
  predicate: (record: T) => boolean
): Promise<boolean> {
  const records = await readDb<T>(filename)
  const filteredRecords = records.filter((record) => !predicate(record))

  if (filteredRecords.length === records.length) {
    return false // No record was deleted
  }

  await writeDb(filename, filteredRecords)
  return true
}
