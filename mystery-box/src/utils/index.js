import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export const VARIANTS = {
    "XL-Box (19-25 Artikel)": "50524248998152",
    "M-Box (13-18 Artikel)": "50524248965384",
    "S-Box (8-12 Artikel)": "50524248932616",
    "XS-Box (5-8 Artikel)": "51309157024008",
}

export const SNACK_BOX_VARIANTS = {
    "S-Box (6-8 Snacks)": "52182817112328",
    "M-Box (10-14 Snacks)": "52182817145096",
    "L-Box (18-20 Snacks)": "52182817177864"
}

export const SHOP = "brustbizeps.de"

// Constructs checkout URL for Shopify (e.g., /cart/47291837462:1)
// If upsellId is provided, adds it to the cart as well.
export const buildCheckoutUrl = (mainVariantId, qty = 1, upsellVariantId = null) => {
    if (upsellVariantId) {
        return `https://${SHOP}/cart/${mainVariantId}:${qty},${upsellVariantId}:1`
    }
    return `https://${SHOP}/cart/${mainVariantId}:${qty}`
}
