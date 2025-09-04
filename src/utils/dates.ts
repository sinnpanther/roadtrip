export function formatDate(
    d: string | Date,
    style: 'short' | 'medium' | 'long' | 'full' = 'short',
    locale = 'fr-FR'
) {
    const date = typeof d === 'string' ? new Date(d) : d
    if (isNaN(+date)) return ''
    const fmt = new Intl.DateTimeFormat(locale, { dateStyle: style })
    return fmt.format(date)
}
