const CURRENCY_FORMATTER = Intl.NumberFormat(undefined, {
    currency: "USD", style: "currency"
});

export function currency(number: number) {
    return CURRENCY_FORMATTER.format(number);
}