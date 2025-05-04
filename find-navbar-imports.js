import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

// Get the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Function to search for imports in a file
function searchForImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")

    // Look for different import patterns for Navbar
    const defaultImportRegex = /import\s+Navbar\s+from\s+['"]@\/components\/navbar['"];?/
    const namedImportRegex = /import\s+{\s*Navbar\s*}\s+from\s+['"]@\/components\/navbar['"];?/
    const aliasImportRegex = /import\s+{\s*Navbar\s+as\s+\w+\s*}\s+from\s+['"]@\/components\/navbar['"];?/

    const defaultImport = content.match(defaultImportRegex)
    const namedImport = content.match(namedImportRegex)
    const aliasImport = content.match(aliasImportRegex)

    if (defaultImport || namedImport || aliasImport) {
      console.log(`Found in ${filePath}:`)
      if (defaultImport) console.log(`  Default import: ${defaultImport[0]}`)
      if (namedImport) console.log(`  Named import: ${namedImport[0]}`)
      if (aliasImport) console.log(`  Alias import: ${aliasImport[0]}`)
      return true
    }

    return false
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message)
    return false
  }
}

// Function to recursively search directories
function searchDirectory(dir) {
  let found = 0

  try {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        // Skip node_modules and .next directories
        if (file !== "node_modules" && file !== ".next") {
          found += searchDirectory(filePath)
        }
      } else if (
        stat.isFile() &&
        (file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".ts") || file.endsWith(".tsx"))
      ) {
        if (searchForImports(filePath)) {
          found++
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message)
  }

  return found
}

// Start the search from the project root
console.log("Searching for Navbar imports...")
const projectRoot = process.cwd()
const totalFound = searchDirectory(projectRoot)

console.log(`\nFound ${totalFound} files importing the Navbar component.`)
console.log("\nRecommendation:")
console.log("Since Navbar is exported as a default export, all imports should use:")
console.log('import Navbar from "@/components/navbar";')
