
export function saveToFile(text, petName = "Chu") {
    if (!text || text.trim() === "") return;


    const header = `=== НОТАТКИ ВІД ${petName.toUpperCase()} ===\n`;
    const date = `Дата: ${new Date().toLocaleString()}\n`;
    const separator = `---------------------------\n\n`;
    const finalContent = header + date + separator + text;


    const blob = new Blob([finalContent], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.href = url;
    link.download = `notes_${petName}_${new Date().toISOString().split('T')[0]}.txt`;
    
    document.body.appendChild(link);
    link.click();
    

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}


export function formatMarkdown(text) {
    if (!text) return "";

    let formatted = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    formatted = formatted.replace(/^\s*[\*\-]\s+(.*)/gm, '<div style="margin-bottom: 4px; padding-left: 5px;">• $1</div>');

    const urlRegex = /(https?:\/\/[^\s)]+[^.,\s)])/g;
    formatted = formatted.replace(urlRegex, (url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    return formatted.replace(/\n/g, '<br/>');
}