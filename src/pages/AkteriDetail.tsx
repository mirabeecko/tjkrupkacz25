import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AkteriDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [markdown, setMarkdown] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (name) {
      const fetchMarkdown = async () => {
        try {
          const response = await fetch(`/akteri/${name}.md`);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${name}.md: ${response.statusText}`);
          }
          const text = await response.text();
          setMarkdown(text);
        } catch (err) {
          console.error("Error fetching markdown:", err);
          setError("Failed to load actor information.");
          setMarkdown(`# Chyba: ${name} nenalezen.
          
Stránka pro tohoto aktéra neexistuje nebo se nepodařilo načíst její obsah. Prosím, zkontrolujte URL nebo se vraťte na hlavní stránku.
          
Pokud si myslíte, že se jedná o chybu, kontaktujte správce.`);
        }
      };
      fetchMarkdown();
    }
  }, [name]);

  if (error) {
    // Render the error markdown directly to ReactMarkdown
    return (
        <div className="container mx-auto p-4 prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
    );
  }

  return (
    <div className="container mx-auto p-4 prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
};

export default AkteriDetail;
