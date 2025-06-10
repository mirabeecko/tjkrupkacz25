import fs from 'node:fs'
import path from 'node:path'
import { JSDOM } from 'jsdom'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
)

// Konfigurace: složka se stránkami a globální selectory
const PAGES_DIR = path.resolve(process.cwd(), 'public')
const FILE_EXTENSIONS = ['.html', '.htm']

// Získá všechny soubory se zadanými příponami ve složce
function getAllFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let files: string[] = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) files = files.concat(getAllFiles(fullPath))
    else if (FILE_EXTENSIONS.includes(path.extname(entry.name))) files.push(fullPath)
  }
  return files
}

// Extrahuje texty z jedné stránky
function extractTexts(htmlContent: string): { selector: string; content: string }[] {
  const dom = new JSDOM(htmlContent)
  const doc = dom.window.document

  // Vyber elementy, ze kterých chcete texty (všechny <p>, <h1>-<h6>, apod.)
  const elements = Array.from(
    doc.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span')
  )
  return elements.map((el, idx) => ({
    selector: dom.window.document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span')[idx].tagName.toLowerCase(),
    content: el.textContent?.trim() || ''
  })).filter(item => item.content.length > 0)
}

async function importAll() {
  const files = getAllFiles(PAGES_DIR)
  console.log(`Načítám ${files.length} souborů...`)

  for (const file of files) {
    const html = fs.readFileSync(file, 'utf-8')
    const texts = extractTexts(html)
    const pageSlug = path.relative(PAGES_DIR, file)

    for (let i = 0; i < texts.length; i++) {
      const { selector, content } = texts[i]
      const { error } = await supabase.from('texts').insert({
        page: pageSlug,
        selector,
        content,
        position: i
      })
      if (error) console.error(`Error in ${pageSlug}:`, error)
      else console.log(`Imported [${pageSlug}] ${selector} → ${content.substring(0,20)}...`)
    }
  }
}

importAll().then(() => console.log('Hotovo!'))