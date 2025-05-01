import { createClient } from "@supabase/supabase-js"
import type { IntegrationConfig } from "./index"

export class SupabaseService {
  private supabase

  constructor(config: IntegrationConfig) {
    if (!config.supabaseUrl || !config.supabaseKey) {
      throw new Error("Supabase URL and key are required")
    }

    this.supabase = createClient(config.supabaseUrl, config.supabaseKey)
  }

  // Get the Supabase client
  getClient() {
    return this.supabase
  }

  // Authentication methods
  async signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password })
  }

  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password })
  }

  async signOut() {
    return this.supabase.auth.signOut()
  }

  async resetPassword(email: string) {
    return this.supabase.auth.resetPasswordForEmail(email)
  }

  // Database methods
  async query(table: string, query: any) {
    return this.supabase.from(table).select(query)
  }

  async insert(table: string, data: any) {
    return this.supabase.from(table).insert(data)
  }

  async update(table: string, data: any, match: any) {
    return this.supabase.from(table).update(data).match(match)
  }

  async delete(table: string, match: any) {
    return this.supabase.from(table).delete().match(match)
  }

  // Storage methods
  async uploadFile(bucket: string, path: string, file: File) {
    return this.supabase.storage.from(bucket).upload(path, file)
  }

  async downloadFile(bucket: string, path: string) {
    return this.supabase.storage.from(bucket).download(path)
  }

  async listFiles(bucket: string, path?: string) {
    return this.supabase.storage.from(bucket).list(path)
  }

  async deleteFile(bucket: string, paths: string[]) {
    return this.supabase.storage.from(bucket).remove(paths)
  }

  // Get public URL for a file
  getPublicUrl(bucket: string, path: string) {
    return this.supabase.storage.from(bucket).getPublicUrl(path)
  }
}
