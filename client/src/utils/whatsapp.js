export const sendWhatsApp = (property) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price)
  }

  const message = `Hello, I am interested in this property:
🏠 ${property.title}
💰 ${formatPrice(property.price)}
📍 ${property.area}, ${property.county}
Please provide more details.`

  const url = `https://wa.me/254712345678?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}

export const generateWhatsAppLink = (property) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price)
  }

  const message = `Hello, I am interested in this property:
🏠 ${property.title}
💰 ${formatPrice(property.price)}
📍 ${property.area}, ${property.county}
Please provide more details.`

  return `https://wa.me/254712345678?text=${encodeURIComponent(message)}`
}
