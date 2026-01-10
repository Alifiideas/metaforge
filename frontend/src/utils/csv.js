/* =========================================================
   CSV UTILITIES — META FORGE
   ========================================================= */

/**
 * Convert array of metadata objects into CSV string
 * @param {Array<Object>} rows
 * @returns {string}
 */
export function generateCSV(rows = []) {
  if (!rows.length) return "";

  const headers = Object.keys(rows[0]);

  const escape = (value) =>
    `"${String(value ?? "")
      .replace(/"/g, '""')
      .replace(/\n/g, " ")}"`;

  const csvRows = [
    headers.join(","), // header row
    ...rows.map((row) =>
      headers.map((key) => escape(row[key])).join(",")
    ),
  ];

  return csvRows.join("\n");
}

/**
 * Trigger CSV download in browser
 * @param {string} csvContent
 * @param {string} filename
 */
export function downloadCSV(csvContent, filename = "metadata.csv") {
  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate safe CSV filename
 */
export function getCsvFilename(platform, format = "csv") {
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  return `metadata_${platform}_${ts}.${format}`;
}
