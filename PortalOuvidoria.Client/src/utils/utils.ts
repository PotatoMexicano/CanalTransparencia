export const formatDate = (date: string | null) => {
  if (!date) return "Não informado";

  const parseDate = new Date(fixIsoDate(date));

  return parseDate.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).replace(" de", "");
}

export const fixIsoDate = (isoString: string) => isoString.replace(/\.\d{4,}Z?$/, "Z");