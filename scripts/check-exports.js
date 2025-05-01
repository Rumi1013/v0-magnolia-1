const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Define directories to scan
const directories = ["components", "app", "lib"]

// Function to find all .ts and .tsx files
function findTsFiles(dir) {
  let results = []
  const list = fs.readdirSync(dir)

  list.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Recursively scan subdirectories
      results = results.concat(findTsFiles(filePath))
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      // Skip Next.js special files that require default exports
      if (file === "page.tsx" || file === "layout.tsx" || file === "loading.tsx" || file === "error.tsx") {
        return
      }
      results.push(filePath)
    }
  })

  return results
}

// Main function
function main() {
  console.log("Checking for export inconsistencies...")

  let files = []
  directories.forEach((dir) => {
    if (fs.existsSync(dir)) {
      files = files.concat(findTsFiles(dir))
    }
  })

  console.log(`Found ${files.length} TypeScript files to check.`)

  // Run ESLint on the files
  try {
    execSync(`npx eslint ${files.join(" ")} --rule 'import/no-default-export: error'`, { stdio: "inherit" })
    console.log("All files use consistent exports! 🎉")
  } catch (error) {
    console.error("Found export inconsistencies. Please fix the issues above.")
    process.exit(1)
  }
}

main()
