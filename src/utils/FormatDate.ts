import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";


export function FormatDate(created_at: string) {
    const date = format(parseISO(created_at), "d/MM/yyyy", { locale: ptBR })

    return date;
}