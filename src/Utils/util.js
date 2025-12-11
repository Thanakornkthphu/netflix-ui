// Genre mapping (TMDB genre IDs to names)
export const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
}

/**
 * Convert genre IDs to genre names
 * @param {Array<number>} genreIds - Array of genre IDs
 * @returns {Array<string>} - Array of genre names
 */
export const getGenresFromIds = (genreIds) => {
  if (!Array.isArray(genreIds)) return []
  return genreIds.map((id) => GENRE_MAP[id]).filter(Boolean)
}

/**
 * Format date to readable string
 * @param {string} dateString - Date string (e.g., "2024-01-15")
 * @returns {string} - Formatted date (e.g., "January 15, 2024")
 */
export const getFormattedDate = (dateString) => {
  if (!dateString) return ""

  const date = new Date(dateString)

  if (isNaN(date.getTime())) return ""

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

/**
 * Get year from date string
 * @param {string} dateString - Date string
 * @returns {number|null} - Year or null
 */
export const getYear = (dateString) => {
  if (!dateString) return null
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? null : date.getFullYear()
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trim()}...`
}

/**
 * Format rating to one decimal place
 * @param {number} rating - Rating value
 * @returns {string} - Formatted rating
 */
export const formatRating = (rating) => {
  if (typeof rating !== "number") return "N/A"
  return rating.toFixed(1)
}
