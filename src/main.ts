import { supabase } from "@/supabaseClient"

async function loadAndRender() {
  // 1) Načíst všechna pole z tabulky "texts"
  const { data, error } = await supabase
    .from('texts')
    .select('id, content')   // nebo '*' pro všechna sloupce

  if (error) {
    console.error('Chyba při načítání:', error)
    return
  }

  // 2) Vykreslit každou položku do <div id="app">
  const container = document.getElementById('app')
  if (!container) return

  data.forEach(row => {
    const p = document.createElement('p')
    p.textContent = row.content
    container.appendChild(p)
  })
}

// Spuštění po načtení stránky
window.addEventListener('DOMContentLoaded', () => {
  loadAndRender()
})
