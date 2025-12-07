export const genreMapEN = {
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

export const getGenresFromIds = (genreIds) => {
  if (!Array.isArray(genreIds)) return []
  return genreIds.map((id) => genreMapEN[id]).filter(Boolean)
}

export const getFormattedDate = (dateTime) => {
  const date = new Date(dateTime)

  if (isNaN(date)) return ""

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}
